// commands/evolve.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, EVOLUTION_COLOR, POKEMONS_CAPTURAVEIS, EVOLUTION_CHAIN, EVOLUTION_STONES, TYPE_COLORS, ERROR_COLOR } = require('../constants');
const { getOrCreateUserLocal, saveUserToDb, getPokemonSpriteUrl, getPokemonDetailsFromPokeAPI, calculatePokemonStats } = require('../utils/helpers');

module.exports = {
    name: 'evolve',
    description: 'Tenta evoluir um Pokémon da sua coleção.',
    async execute(message, args) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        const pokemonIndex = parseInt(args[0]) - 1;

        if (isNaN(pokemonIndex) || pokemonIndex < 0 || pokemonIndex >= user.pokemons_captured.length) {
            return message.reply(`Uso incorreto: \`${PREFIXO}evolve [número]\`. Use \`${PREFIXO}mypokemon\` para ver a lista e os números.`).catch(console.error);
        }

        const pokemonToEvolve = user.pokemons_captured[pokemonIndex];

        const evolutionInfo = EVOLUTION_CHAIN[pokemonToEvolve.sprite_id];

        if (!evolutionInfo) {
            return message.reply(`**${pokemonToEvolve.name}** não tem uma evolução conhecida ou não pode evoluir.`).catch(console.error);
        }

        // --- Verificação de Gênero para Evolução ---
        if (evolutionInfo.gender) {
            if (pokemonToEvolve.gender !== evolutionInfo.gender) {
                return message.reply(`Seu **${pokemonToEvolve.name}** é ${pokemonToEvolve.gender}, mas para evoluir para ${evolutionInfo.to_name}, ele precisa ser ${evolutionInfo.gender}.`).catch(console.error);
            }
        }
        
        // --- Lógica para Evolução por Nível ---
        if (evolutionInfo.level) {
            if (pokemonToEvolve.level < evolutionInfo.level) {
                return message.reply(`**${pokemonToEvolve.name}** precisa ser no mínimo **Nível ${evolutionInfo.level}** para evoluir para ${evolutionInfo.to_name}. (Seu Pokémon está no Nível ${pokemonToEvolve.level}).`).catch(console.error);
            }
        }

        // --- Lógica para Evolução por Item ---
        if (evolutionInfo.item) {
            const itemName = evolutionInfo.item.toLowerCase().replace(' ', '_');
            if (!EVOLUTION_STONES[itemName]) {
                console.error(`[ERRO EVOLVE] Item de evolução "${evolutionInfo.item}" não configurado em EVOLUTION_STONES para Pokémon ID ${pokemonToEvolve.sprite_id}.`);
                return message.reply(`Erro interno: O item de evolução necessário para ${pokemonToEvolve.name} não foi encontrado. Contate o administrador.`).catch(console.error);
            }
            if (user[itemName] && user[itemName] > 0) {
                user[itemName]--;
            } else {
                return message.reply(`Você precisa de uma **${EVOLUTION_STONES[itemName].displayName}** para evoluir seu ${pokemonToEvolve.name}. Você não tem uma.`).catch(console.error);
            }
        }

        // Se todas as condições passarem, prossegue com a evolução
        
        // Remove o Pokémon antigo pelo seu ID único
        user.pokemons_captured = user.pokemons_captured.filter(p => p.id !== pokemonToEvolve.id);

        const evolvedPokemonData = POKEMONS_CAPTURAVEIS.find(p => p.id === evolutionInfo.to_id);
        if (!evolvedPokemonData) {
            console.error(`[ERRO EVOLVE] Dados do Pokémon evoluído (ID: ${evolutionInfo.to_id}, Nome: ${evolutionInfo.to_name}) não encontrados em POKEMONS_CAPTURAVEIS.`);
            return message.reply(`Erro interno: Não foi possível encontrar os dados para a evolução de ${pokemonToEvolve.name}. Contate o administrador.`).catch(console.error);
        }

        const newLevel = pokemonToEvolve.level; 
        const newStats = calculatePokemonStats(newLevel, evolvedPokemonData.rarity);

        const evolvedPokemon = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            name: evolvedPokemonData.name,
            sprite_id: evolvedPokemonData.id,
            level: newLevel,
            rarity: evolvedPokemonData.rarity,
            is_shiny: pokemonToEvolve.is_shiny,
            type1: null, type2: null, height: null, weight: null, abilities: [],
            gender: null, // NOVIDADE: Inicializa o gênero para o evoluído
            max_hp: newStats.max_hp,
            current_hp: newStats.max_hp,
            attack: newStats.attack,
            level_xp: pokemonToEvolve.level_xp
        };
        
        try {
            const evoDetails = await getPokemonDetailsFromPokeAPI(evolvedPokemon.sprite_id);
            evolvedPokemon.type1 = evoDetails.type1;
            evolvedPokemon.type2 = evoDetails.type2;
            evolvedPokemon.height = evoDetails.height;
            evolvedPokemon.weight = evoDetails.weight;
            evolvedPokemon.abilities = evoDetails.abilities;
            evolvedPokemon.gender = evoDetails.gender; // Atribui o gênero real do evoluído
        } catch (error) {
            console.error(`[ERRO EVOLVE API] Erro ao buscar detalhes da PokeAPI para evolução de ${evolvedPokemon.name} (ID: ${evolvedPokemon.sprite_id}):`, error.message);
        }

        user.pokemons_captured.push(evolvedPokemon);
        saveUserToDb(userId, user);

        const evolveEmbed = new EmbedBuilder()
            .setColor(EVOLUTION_COLOR)
            .setTitle(`🎉 Parabéns, Treinador ${message.author.username}! 🎉`)
            .setDescription(`Seu **${pokemonToEvolve.name}** evoluiu para **${evolvedPokemon.name}**!`)
            .setImage(getPokemonSpriteUrl(evolvedPokemon.sprite_id, evolvedPokemon.is_shiny))
            .addFields(
                { name: 'Nível', value: `\`${evolvedPokemon.level}\``, inline: true },
                { name: 'HP Máximo', value: `\`${evolvedPokemon.max_hp}\``, inline: true },
                { name: 'Ataque', value: `\`${evolvedPokemon.attack}\``, inline: true },
                { name: 'Tipo', value: `${evolvedPokemon.type1}${evolvedPokemon.type2 ? `/${evolvedPokemon.type2}` : ''}`, inline: true },
                { name: 'Gênero', value: `\`${evolvedPokemon.gender || 'Desconhecido'}\``, inline: true } // Exibe gênero do evoluído
            )
            .setFooter({ text: 'Seu Pokémon ficou muito mais forte!' })
            .setTimestamp();

        message.channel.send({ embeds: [evolveEmbed] }).catch(console.error);
        console.log(`${message.author.username} evoluiu ${pokemonToEvolve.name} para ${evolvedPokemon.name}.`);
    },
};