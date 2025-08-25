// utils/helpers.js

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fetch = require('node-fetch');

// Importa todas as constantes de constants.js
const constants = require('../constants');
const {
    POKEMONS_CAPTURAVEIS, EVOLUTION_CHAIN, CHANCE_DE_CAPTURA_BASE, SHINY_CHANCE,
    TYPE_COLORS, TYPE_EFFECTIVENESS, POKEBALL_TYPES, EVOLUTION_STONES, OTHER_ITEMS, GENERIC_ATTACKS
} = constants;


// Instância do banco de dados (também acessível aqui)
const adapter = new FileSync('db.json');
const database = low(adapter);


// --- FÓRMULAS DE PROGRESSÃO ---
const XP_TO_NEXT_LEVEL_BASE = 100;
const XP_RATE_INCREASE = 1.2;

function getXpForNextLevel(currentLevel) {
    if (currentLevel < 1) currentLevel = 1;
    return Math.floor(XP_TO_NEXT_LEVEL_BASE * Math.pow(XP_RATE_INCREASE, currentLevel - 1));
}

function getPokemonXpForNextLevel(currentLevel) {
    if (currentLevel < 1) currentLevel = 1;
    return Math.floor(50 + (currentLevel * 10)); // Fórmula para XP do Pokémon
}

function calculatePokemonStats(level, rarity) {
    // Aumentando o HP base e o ataque base para tornar as batalhas mais longas
    let baseHp = (level * 4) + 60;
    let baseAttack = level + 12;

    switch (rarity) {
        case 'incomum':
            baseHp *= 1.1;
            baseAttack *= 1.1;
            break;
        case 'raro':
            baseHp *= 1.25;
            baseAttack *= 1.25;
            break;
        case 'muito raro':
            baseHp *= 1.4;
            baseAttack *= 1.4;
            break;
        case 'paradox':
            baseHp *= 1.45;
            baseAttack *= 1.45;
            break;
        case 'ultra beast':
            baseHp *= 1.5;
            baseAttack *= 1.5;
            break;
        case 'mítico':
            baseHp *= 1.55;
            baseAttack *= 1.55;
            break;
        case 'lendário':
            baseHp *= 1.6;
            baseAttack *= 1.6;
            break;
    }

    return {
        max_hp: Math.floor(baseHp),
        current_hp: Math.floor(baseHp),
        attack: Math.floor(baseAttack)
    };
}

function generateHpBar(currentHp, maxHp, barLength = 10) {
    const percentage = currentHp / maxHp;
    const filledBlocks = Math.round(barLength * percentage);
    const emptyBlocks = barLength - filledBlocks;
    const filledBar = '█'.repeat(filledBlocks);
    const emptyBar = '—'.repeat(emptyBlocks);
    let color = '🟢';
    if (percentage < 0.5) color = '🟡';
    if (percentage < 0.2) color = '🔴';
    return `${color} \`${filledBar}${emptyBar}\` ${currentHp}/${maxHp}`;
}


// --- FUNÇÃO DE CÁLCULO DE DANO COM EFETIVIDADE DE TIPO E STAB ---
function calculateDamage(attackerPokemon, defenderPokemon, attackObject) {
    let damage = attackObject.power * (attackerPokemon.attack / 100);

    let stabMultiplier = 1.0;
    const attackerPrimaryType = attackerPokemon.type1;
    const attackerSecondaryType = attackerPokemon.type2;
    
    if (attackerPrimaryType === attackObject.type || attackerSecondaryType === attackObject.type) {
         stabMultiplier = 1.5;
    }
    damage *= stabMultiplier;

    // Efetividade de Tipo
    let effectivenessMultiplier = 1.0;
    const attackerAttackType = attackObject.type;
    const defenderTypes = [defenderPokemon.type1, defenderPokemon.type2].filter(Boolean);

    if (TYPE_EFFECTIVENESS[attackerAttackType]) {
        for (const defType of defenderTypes) {
            const typeInfo = TYPE_EFFECTIVENESS[attackerAttackType];
            if (typeInfo.weak.includes(defType)) {
                effectivenessMultiplier *= 2.0;
            } else if (typeInfo.resistant.includes(defType)) {
                effectivenessMultiplier *= 0.5;
            } else if (typeInfo.immune.includes(defType)) {
                effectivenessMultiplier *= 0.0;
            }
        }
    }

    damage = Math.floor(damage * effectivenessMultiplier);
    return {
        finalDamage: Math.max(1, damage),
        effectiveness: effectivenessMultiplier
    };
}

// Função para obter o nome e poder de um ataque genérico baseado no tipo do Pokémon
function getGenericAttack(pokemonType, attackStrength = 'normal') {
    const attacksOfType = GENERIC_ATTACKS[pokemonType] || GENERIC_ATTACKS['Normal'];
    
    const filteredAttacks = attacksOfType.filter(attack => attack.strength === attackStrength);

    if (filteredAttacks.length > 0) {
        return filteredAttacks[Math.floor(Math.random() * filteredAttacks.length)];
    } else {
        if (attackStrength === 'normal') {
            return { name: 'Ataque Rápido', type: pokemonType || 'Normal', power: 30 };
        } else {
            return { name: 'Ataque Forte', type: pokemonType || 'Normal', power: 80 };
        }
    }
}

// Funções para carregar e salvar dados do usuário no lowdb
function getOrCreateUserLocal(userId, discordUser) { 
    let userData = database.get(`usersData.${userId}`).value();
    let updated = false;

    if (!userData) {
        userData = {
            username: discordUser ? discordUser.username : 'Unknown User', 
            discord_tag: discordUser ? discordUser.discriminator : '0000', 
            pokemons_captured: [],
            remnants: 0,
            // CORREÇÃO CRÍTICA AQUI: Usar POKEBALL_TYPES
            ...Object.fromEntries(Object.keys(POKEBALL_TYPES).map(key => [key, 0])), 
            // Inicializa todas as Pedras de Evolução
            ...Object.fromEntries(Object.keys(EVOLUTION_STONES).map(key => [key, 0])),
            // Inicializa outros itens
            ...Object.fromEntries(Object.keys(OTHER_ITEMS).map(key => [key, 0])),
            
            last_daily_reward: '',
            battle_wins: 0,
            battle_losses: 0,
            xp: 0,
            level: 1,
            npc_battles_today: 0,
            last_npc_battle_reset: '',
            last_npc_battle_time: null, 
            active_pokemon_id: null 
        };
        database.set(`usersData.${userId}`, userData).write();
        return userData;
    }

    if (!userData.hasOwnProperty('active_pokemon_id')) { userData.active_pokemon_id = null; updated = true; }
    if (!userData.hasOwnProperty('last_npc_battle_time')) { userData.last_npc_battle_time = null; updated = true; }

    for (const key in POKEBALL_TYPES) { 
        if (!userData.hasOwnProperty(key)) { userData[key] = 0; updated = true; } 
    }
    for (const key in EVOLUTION_STONES) { 
        if (!userData.hasOwnProperty(key)) { userData[key] = 0; updated = true; } 
    }
    for (const key in OTHER_ITEMS) { 
        if (!userData.hasOwnProperty(key)) { userData[key] = 0; updated = true; } 
    }

    if (discordUser) {
        if (userData.username !== discordUser.username || !userData.hasOwnProperty('username')) {
            userData.username = discordUser.username;
            updated = true;
        }
        if (userData.discord_tag !== discordUser.discriminator || !userData.hasOwnProperty('discord_tag')) {
            userData.discord_tag = discordUser.discriminator;
            updated = true;
        }
    } else {
        if (!userData.hasOwnProperty('username')) { userData.username = 'Unknown User'; updated = true; }
        if (!userData.hasOwnProperty('discord_tag')) { userData.discord_tag = '0000'; updated = true; }
    }


    if (updated) {
        database.set(`usersData.${userId}`, userData).write();
    }
    return userData;
}

function saveUserToDb(userId, userData) {
    database.set(`usersData.${userId}`, userData).write();
}

function getPokemonSpriteUrl(pokemonId, isShiny = false) {
    let baseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;
    let animatedBaseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/`;

    const gifPokemonIds = new Set([6, 25, 150, 151, 658]);
    if (gifPokemonIds.has(pokemonId)) {
        return `${animatedBaseUrl}${pokemonId}.gif`;
    }
    return `${baseUrl}${pokemonId}.png`;
}

function getSpawnablePokemons(pokemonsCapturaveis, evolutionChain) {
    const evolvedPokemonIds = new Set();
    for (const preEvoId in evolutionChain) {
        evolvedPokemonIds.add(evolutionChain[preEvoId].to_id);
    }
    
    return pokemonsCapturaveis.filter(pkm => {
        const isSpecialRarity = pkm.rarity === 'lendário' || pkm.rarity === 'mítico' || pkm.rarity === 'ultra beast' || pkm.rarity === 'paradox';
        
        if (isSpecialRarity && !evolvedPokemonIds.has(pkm.id)) {
            return true;
        }
        
        return !evolvedPokemonIds.has(pkm.id) && !isSpecialRarity;
    });
}


async function getPokemonDetailsFromPokeAPI(pokemonIdOrName) {
    const pokemonIdOrNameStr = String(pokemonIdOrName);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrNameStr.toLowerCase()}/`);
        if (!response.ok) {
            throw new Error(`Pokémon não encontrado na PokeAPI: ${pokemonIdOrName}`);
        }
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) {
            console.warn(`[API] Não foi possível obter detalhes da espécie para ${pokemonIdOrName}.`);
        }
        const speciesData = await speciesResponse.json();
        const gender_rate = speciesData.gender_rate;

        const gender = determinePokemonGender(gender_rate);


        const types = data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
        const abilities = data.abilities.map(a => a.ability.name.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
        const height = data.height / 10;
        const weight = data.weight / 10;

        return {
            type1: types[0] || 'Desconhecido',
            type2: types[1] || null,
            height: height,
            weight: weight,
            abilities: abilities,
            gender: gender
        };

    } catch (error) {
        console.error(`[BOT] Erro ao buscar detalhes de Pokémon na PokeAPI para ${pokemonIdOrName}:`, error.message);
        throw new Error("Não foi possível obter detalhes do Pokémon.");
    }
}

function determinePokemonGender(gender_rate) {
    if (gender_rate === -1) return 'Genderless';
    if (gender_rate === 8) return 'Female';
    if (gender_rate === 0) return 'Male';

    const maleRatio = (8 - gender_rate) / 8;
    if (Math.random() < maleRatio) {
        return 'Male';
    } else {
        return 'Female';
    }
}


module.exports = {
    getXpForNextLevel,
    getPokemonXpForNextLevel,
    calculatePokemonStats,
    generateHpBar,
    calculateDamage,
    getGenericAttack,
    getOrCreateUserLocal,
    saveUserToDb,
    getPokemonSpriteUrl,
    getPokemonDetailsFromPokeAPI,
    getSpawnablePokemons
};