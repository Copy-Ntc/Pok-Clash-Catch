// commands/viewpokemon.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, TYPE_COLORS } = require('../constants');
const { getOrCreateUserLocal, getPokemonSpriteUrl, getPokemonXpForNextLevel } = require('../utils/helpers');

module.exports = {
    name: 'viewpokemon',
    description: 'Vê detalhes de um Pokémon específico da sua coleção.',
    async execute(message, args) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        const pokemonIndex = parseInt(args[0]) - 1;

        if (isNaN(pokemonIndex) || pokemonIndex < 0 || pokemonIndex >= user.pokemons_captured.length) {
            return message.reply(`Uso incorreto: \`${PREFIXO}viewpokemon [número]\`. Use \`${PREFIXO}mypokemon\` para ver a lista e os números.`).catch(console.error);
        }

        const pokemon = user.pokemons_captured[pokemonIndex];

        if (!pokemon) {
            return message.reply('Pokémon não encontrado no seu inventário.').catch(console.error);
        }

        const pokemonSpriteUrl = getPokemonSpriteUrl(pokemon.sprite_id, pokemon.is_shiny);
        const abilitiesText = pokemon.abilities ? pokemon.abilities.join(', ') : 'N/A';
        const pokemonColor = TYPE_COLORS[pokemon.type1] || '#808080';
        
        const genderEmoji = pokemon.gender === 'Male' ? '♂️' : pokemon.gender === 'Female' ? '♀️' : ''; // Emoji de gênero

        const viewPokemonEmbed = new EmbedBuilder()
            .setColor(pokemonColor)
            .setTitle(`${pokemon.name}${pokemon.is_shiny ? ' ✨SHINY✨' : ''} (Lv.${pokemon.level}) ${genderEmoji}`) // Adiciona emoji de gênero
            .setDescription(`**Raridade:** ${pokemon.rarity.toUpperCase()}\n**Tipo:** ${pokemon.type1}${pokemon.type2 ? `/${pokemon.type2}` : ''}`)
            .setImage(pokemonSpriteUrl)
            .addFields(
                { name: 'HP', value: `\`${pokemon.current_hp}/${pokemon.max_hp}\``, inline: true },
                { name: 'Ataque', value: `\`${pokemon.attack}\``, inline: true },
                { name: 'XP', value: `\`${pokemon.level_xp || 0}/${getPokemonXpForNextLevel(pokemon.level)}\``, inline: true },
                { name: 'Altura', value: `\`${pokemon.height}m\``, inline: true },
                { name: 'Peso', value: `\`${pokemon.weight}kg\``, inline: true },
                { name: 'Habilidades', value: `\`${abilitiesText}\``, inline: false },
                { name: 'Gênero', value: `\`${pokemon.gender || 'Desconhecido'}\``, inline: true } // Exibe o gênero
            )
            .setFooter({ text: `Pokémon #${pokemonIndex + 1} da sua coleção.` })
            .setTimestamp();

        message.channel.send({ embeds: [viewPokemonEmbed] }).catch(console.error);
    },
};