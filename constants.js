// constants.js

// --- ID do Programador ---
const PROGRAMMER_USER_ID = '794270568526249994'; // <--- COLOQUE SEU ID AQUI!

// --- Prefixo do Bot ---
const PREFIXO = '&';

// --- Cooldown para o comando !wild ---
const WILD_COMMAND_LIMIT = 10;
const WILD_COMMAND_COOLDOWN_HOURS = 1;

// --- Limite diário de batalhas NPC ---
const NPC_BATTLE_LIMIT_PER_DAY = 20; // Limite de batalhas NPC por hora

// --- Listas de Pokémon por Geração ---
const KANTO_POKEMONS_RAW = require('./data/kanto').KANTO_POKEMONS;
const KANTO_EVOLUTIONS_RAW = require('./data/kanto').KANTO_EVOLUTIONS;
const JOHTO_POKEMONS_RAW = require('./data/johto').JOHTO_POKEMONS;
const JOHTO_EVOLUTIONS_RAW = require('./data/johto').JOHTO_EVOLUTIONS;
const HOENN_POKEMONS_RAW = require('./data/hoenn').HOENN_POKEMONS;
const HOENN_EVOLUTIONS_RAW = require('./data/hoenn').HOENN_EVOLUTIONS;
const SINNOH_POKEMONS_RAW = require('./data/sinnoh').SINNOH_POKEMONS;
const SINNOH_EVOLUTIONS_RAW = require('./data/sinnoh').SINNOH_EVOLUTIONS;
const UNOVA_POKEMONS_RAW = require('./data/unova').UNOVA_POKEMONS;
const UNOVA_EVOLUTIONS_RAW = require('./data/unova').UNOVA_EVOLUTIONS;
const KALOS_POKEMONS_RAW = require('./data/kalos').KALOS_POKEMONS;
const KALOS_EVOLUTIONS_RAW = require('./data/kalos').KALOS_EVOLUTIONS;
const ALOLA_POKEMONS_RAW = require('./data/alola').ALOLA_POKEMONS;
const ALOLA_EVOLUTIONS_RAW = require('./data/alola').ALOLA_EVOLUTIONS;
const GALAR_POKEMONS_RAW = require('./data/galar').GALAR_POKEMONS;
const GALAR_EVOLUTIONS_RAW = require('./data/galar').GALAR_EVOLUTIONS;
const PALDEA_POKEMONS_RAW = require('./data/paldea').PALDEA_POKEMONS;
const PALDEA_EVOLUTIONS_RAW = require('./data/paldea').PALDEA_EVOLUTIONS;

const { GENERIC_ATTACKS } = require('./data/attacks');


// === Combinando todos os Pokémon de todas as gerações ===
const POKEMONS_CAPTURAVEIS = [
    ...KANTO_POKEMONS_RAW,
    ...JOHTO_POKEMONS_RAW,
    ...HOENN_POKEMONS_RAW,
    ...SINNOH_POKEMONS_RAW,
    ...UNOVA_POKEMONS_RAW,
    ...KALOS_POKEMONS_RAW,
    ...ALOLA_POKEMONS_RAW,
    ...GALAR_POKEMONS_RAW,
    ...PALDEA_POKEMONS_RAW
];

// === Combinando todas as cadeias de evolução ===
const EVOLUTION_CHAIN = {
    ...KANTO_EVOLUTIONS_RAW,
    ...JOHTO_EVOLUTIONS_RAW,
    ...HOENN_EVOLUTIONS_RAW,
    ...SINNOH_EVOLUTIONS_RAW,
    ...UNOVA_EVOLUTIONS_RAW,
    ...KALOS_EVOLUTIONS_RAW,
    ...ALOLA_EVOLUTIONS_RAW,
    ...GALAR_EVOLUTIONS_RAW,
    ...PALDEA_EVOLUTIONS_RAW
};

// Mapeamento de raridade para chance de captura base (em porcentagem)
const CHANCE_DE_CAPTURA_BASE = {
    'comum': 85,
    'incomum': 65,
    'raro': 45,
    'muito raro': 25,
    'paradox': 18,
    'ultra beast': 15,
    'mítico': 8,
    'lendário': 3
};

// --- Chance de Pokémon Shiny ---
const SHINY_CHANCE = 1 / 4096;

// --- Cores para os tipos de Pokémon ---
const TYPE_COLORS = {
    'Normal': '#A8A77A', 'Fire': '#EE812F', 'Water': '#6390F0', 'Grass': '#7AC74C', 'Electric': '#F7D02C',
    'Ice': '#96D9D6', 'Fighting': '#C22E28', 'Poison': '#A33EA1', 'Ground': '#E2BF65', 'Flying': '#A98FF3',
    'Psychic': '#F95587', 'Bug': '#A6B91A', 'Rock': '#B6A136', 'Ghost': '#735797', 'Dragon': '#6F35FC',
    'Steel': '#B7B7CE', 'Dark': '#705746', 'Fairy': '#D685AD', 'Unknown': '#68A090', 'Shadow': '#493963'
};

// --- Cores de Embeds para padronização ---
const ERROR_COLOR = '#FF0000';
const SUCCESS_COLOR = '#00FF00';
const WARNING_COLOR = '#FFA500';
const INFO_COLOR = '#00BFFF';
const BATTLE_COLOR = '#0000FF';
const CAPTURE_COLOR = '#FFD700';
const EVOLUTION_COLOR = '#FF69B4';
const PROFILE_COLOR = '#8A2BE2';
const SHOP_COLOR = '#32CD32';
const NPC_BATTLE_COLOR = '#FF8C00';
const EVENT_COLOR = '#FF1493';
const COMMAND_COLOR = '#00CED1';
const PROGRESS_COLOR = '#FFD700';
const INVENTORY_COLOR = '#FF4500';


// Tabela de efetividade de tipos
const TYPE_EFFECTIVENESS = {
    'Normal': { weak: ['Fighting'], resistant: [], immune: ['Ghost'] },
    'Fire': { weak: ['Water', 'Rock', 'Ground'], resistant: ['Bug', 'Steel', 'Fire', 'Grass', 'Ice', 'Fairy'], immune: [] },
    'Water': { weak: ['Electric', 'Grass'], resistant: ['Fire', 'Water', 'Ice', 'Steel'], immune: [] },
    'Grass': { weak: ['Fire', 'Bug', 'Flying', 'Poison'], resistant: ['Water', 'Electric', 'Grass', 'Ground'], immune: [] },
    'Electric': { weak: ['Ground'], resistant: ['Electric', 'Flying', 'Steel'], immune: [] },
    'Ice': { weak: ['Fire', 'Fighting', 'Rock', 'Steel'], resistant: ['Ice'], immune: [] },
    'Fighting': { weak: ['Flying', 'Psychic', 'Fairy'], resistant: ['Bug', 'Rock', 'Dark'], immune: [] },
    'Poison': { weak: ['Ground', 'Psychic'], resistant: ['Grass', 'Fighting', 'Poison', 'Bug'], immune: [] },
    'Ground': { weak: ['Water', 'Ice', 'Grass'], resistant: ['Poison', 'Rock'], immune: ['Electric'] },
    'Flying': { weak: ['Electric', 'Ice', 'Rock'], resistant: ['Grass', 'Fighting', 'Bug'], immune: ['Ground'] },
    'Psychic': { weak: ['Bug', 'Ghost', 'Dark'], resistant: ['Fighting', 'Psychic'], immune: [] },
    'Bug': { weak: ['Fire', 'Flying', 'Rock', 'Ice', 'Poison'], resistant: ['Grass', 'Fighting', 'Ground'], immune: [] },
    'Rock': { weak: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'], resistant: ['Normal', 'Flying', 'Poison', 'Fire'], immune: [] },
    'Ghost': { weak: ['Dark'], resistant: ['Poison', 'Bug'], immune: ['Normal', 'Fighting'] },
    'Dragon': { weak: ['Ice', 'Dragon', 'Fairy'], resistant: ['Fire', 'Water', 'Grass', 'Electric'], immune: [] },
    'Steel': { weak: ['Fire', 'Fighting', 'Ground'], resistant: ['Normal', 'Flying', 'Rock', 'Bug', 'Grass', 'Psychic', 'Ice', 'Dragon', 'Fairy'], immune: [] },
    'Dark': { weak: ['Fighting', 'Bug', 'Fairy'], resistant: ['Ghost', 'Dark'], immune: ['Psychic'] },
    'Fairy': { weak: ['Poison', 'Steel'], resistant: ['Fighting', 'Bug', 'Dark'], immune: [] },
    'Unknown': { weak: [], resistant: [], immune: [] },
    'Shadow': { weak: [], resistant: [], immune: [] }
};


// Tipos de Pokébolas e seus custos
const POKEBALL_TYPES = {
    'pokeball': { displayName: 'Pokébola', cost: 50, captureMultiplier: 1.0, emoji: '<:PokeBall3:1388918393184321587>' },
    'greatball': { displayName: 'Great Ball', cost: 100, captureMultiplier: 1.5, emoji: '<:GreatBall1:1388918372745347122>' },
    'ultraball': { displayName: 'Ultra Ball', cost: 200, captureMultiplier: 2.0, emoji: '<:UltraBall1:1388918356437893283>' },
    'master_ball': { displayName: 'Master Ball', cost: 50000, captureMultiplier: 999.0, emoji: '<:Master_Ball:1390790175902404710>' },
    'beast_ball': { 
        displayName: 'Beast Ball', 
        cost: 1000, 
        captureMultiplier: 1.0, 
        specialMultiplier: { 'ultra beast': 5.0 },
        emoji: '<:BeastBall:1390790192658387114>' 
    },
    'fast_ball': {
        displayName: 'Fast Ball',
        cost: 150,
        captureMultiplier: 1.0,
        specialMultiplier: { 'comum': 2.0, 'incomum': 1.5 },
        condition: (pokemon) => pokemon.rarity === 'comum' || pokemon.rarity === 'incomum',
        emoji: '<:FastBall:1390790265018781817>'
    },
    'dusk_ball': {
        displayName: 'Dusk Ball',
        cost: 120,
        captureMultiplier: 1.0,
        specialMultiplier: { 'night_time': 2.5 },
        condition: () => {
            const hour = new Date().getHours();
            return hour >= 18 || hour < 6;
        },
        emoji: '<:DuskBall:1390790208106270901>'
    },
    'heal_ball': {
        displayName: 'Heal Ball',
        cost: 80,
        captureMultiplier: 1.0,
        effect: 'heal_on_capture',
        emoji: '<:HealBall:1390790224942207006>'
    },
    'luxury_ball': {
        displayName: 'Luxury Ball',
        cost: 400,
        captureMultiplier: 1.0,
        effect: 'xp_bonus_on_capture',
        emoji: '<:LuxuryBall:1390790244345057350>'
    }
};

// Tipos de Pedras de Evolução e seus custos
const EVOLUTION_STONES = {
    'fire_stone': { displayName: 'Fire Stone', cost: 5000, emoji: '<:FireStone:1388918448540614736>' },
    'water_stone': { displayName: 'Water Stone', cost: 5000, emoji: '<:WaterStone:1388918290402906215>' },
    'thunder_stone': { displayName: 'Thunder Stone', cost: 5000, emoji: '<:ThunderStone:1388918306257502348>' },
    'leaf_stone': { displayName: 'Leaf Stone', cost: 5000, emoji: '<:LeafStone:1388918323676184698>' },
    'moon_stone': { displayName: 'Moon Stone', cost: 7500, emoji: '<:MoonStone:1388918339761602740>' },
    'sun_stone': { displayName: 'Sun Stone', cost: 5000, emoji: '<:7290sunstone:1390790925294501978>' },
    'dusk_stone': { displayName: 'Dusk Stone', cost: 5000, emoji: '<:9472duskstone:1390791239456129116>' },
    'shiny_stone': { displayName: 'Shiny Stone', cost: 7500, emoji: '<:3192shinystone:1390790655906807950>' },
    'dawn_stone': { displayName: 'Dawn Stone', cost: 7500, emoji: '<:8082dawnstone:1390791043154448606>' },
    'oval_stone': { displayName: 'Oval Stone', cost: 2000, emoji: '<:5583ovalstone:1390790839197896834>' },
    'razor_claw': { displayName: 'Razor Claw', cost: 4000, emoji: '<:5583razorclaw:1390790892063035433>' },
    'razor_fang': { displayName: 'Razor Fang', cost: 4000, emoji: '<:Dream_Razor_Fang_Sprite:1390793205112504560>' },
    'reaper_cloth': { displayName: 'Reaper Cloth', cost: 4000, emoji: '<:dodsdwnload2:1390806292452475070>' },
    'king_s_rock': { displayName: 'King\'s Rock', cost: 4000, emoji: '<:5742kingsrock:1390790867257786469>' },
    'metal_coat': { displayName: 'Metal Coat', cost: 4000, emoji: '<:2555metalcoat:1390790620418801714>' },
    'upgrade': { displayName: 'Up-Grade', cost: 4000, emoji: '<:Mejora_29:1390806541845794836>' },
    'dubious_disc': { displayName: 'Dubious Disc', cost: 4000, emoji: '<:download2:1390806335100289074>' },
    'protector': { displayName: 'Protector', cost: 4000, emoji: '<:download:1390806515463753798>' },
    'electirizer': { displayName: 'Electirizer', cost: 4000, emoji: '<:download3:1390806364477194240>' },
    'magmarizer': { displayName: 'Magmarizer', cost: 4000, emoji: '<:download4:1390806397733830737>' },
    'sachet': { displayName: 'Sachet', cost: 4000, emoji: '<:download5:1390806574221623356>' },
    'whipped_dream': { displayName: 'Whipped Dream', cost: 4000, emoji: '<:whipped_dream_by_jormxdos_diel34:1390806436707176578>' },
    'cracked_pot': { displayName: 'Cracked Pot', cost: 2000, emoji: '<:download6:1390806623156703364>' },
    'chipped_pot': { displayName: 'Chipped Pot', cost: 2000, emoji: '<:download7:1390806638390280254>' },
    'sweet_apple': { displayName: 'Sweet Apple', cost: 2000, emoji: '<:download8:1390806657977811145>' },
    'tart_apple': { displayName: 'Tart Apple', cost: 2000, emoji: '<:download9:1390806676743131207>' },
    'glorious_cloak': { displayName: 'Glorious Cloak', cost: 4000, emoji: '✨' },
    'auspicious_armor': { displayName: 'Auspicious Armor', cost: 4000, emoji: '<:9628auspiciousarmor:1390791261681619114>' },
    'leaders_crest': { displayName: 'Leader\'s Crest', cost: 3000, emoji: '<:9407leaderscrest:1390791200436650085>' }
};

// Outros itens (Vazio por enquanto, mas pronto para expansão)
const OTHER_ITEMS = {
    // Exemplo de itens que você pode adicionar:
    // 'rare_candy': { displayName: 'Rare Candy', cost: 2000, emoji: '🍬', effect: 'gain_level_xp' },
    // 'poke_flute': { displayName: 'Poke Flute', cost: 1000, emoji: '🎶', effect: 'wake_up_pokemon' }
};


module.exports = {
    PROGRAMMER_USER_ID,
    PREFIXO,
    WILD_COMMAND_LIMIT,
    WILD_COMMAND_COOLDOWN_HOURS,
    NPC_BATTLE_LIMIT_PER_DAY,
    POKEMONS_CAPTURAVEIS,
    EVOLUTION_CHAIN,
    CHANCE_DE_CAPTURA_BASE,
    SHINY_CHANCE,
    TYPE_COLORS,
    ERROR_COLOR, SUCCESS_COLOR, WARNING_COLOR, INFO_COLOR, BATTLE_COLOR,
    CAPTURE_COLOR, EVOLUTION_COLOR, PROFILE_COLOR, SHOP_COLOR, // REMOVIDO: TRADE_COLOR
    NPC_BATTLE_COLOR, EVENT_COLOR, COMMAND_COLOR, PROGRESS_COLOR, INVENTORY_COLOR,
    POKEBALL_TYPES,
    EVOLUTION_STONES,
    OTHER_ITEMS, // <-- CORREÇÃO: OTHER_ITEMS agora está definido antes de ser exportado!
    TYPE_EFFECTIVENESS,
    GENERIC_ATTACKS
};