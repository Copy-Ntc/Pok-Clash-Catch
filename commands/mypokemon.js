// commands/mypokemon.js

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { PREFIXO, WARNING_COLOR, INVENTORY_COLOR } = require('../constants');
const { getOrCreateUserLocal } = require('../utils/helpers');

module.exports = {
    name: 'mypokemon',
    description: 'Mostra sua coleção de Pokémon com paginação.',
    async execute(message) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        if (!user.pokemons_captured || user.pokemons_captured.length === 0) {
            const noPokemonEmbed = new EmbedBuilder()
                .setColor(WARNING_COLOR)
                .setTitle('Sua Coleção Está Vazia! 😔')
                .setDescription(`Treinador ${message.author.username}, você ainda não capturou nenhum Pokémon.`)
                .addFields(
                    { name: 'Como começar?', value: `Use \`${PREFIXO}wild\` para encontrar seu primeiro Pokémon!` }
                )
                .setFooter({ text: 'Aventura espera por você!' });
            return message.channel.send({ embeds: [noPokemonEmbed] });
        }

        const ITEMS_PER_PAGE = 10;
        const totalPages = Math.ceil(user.pokemons_captured.length / ITEMS_PER_PAGE);
        let currentPage = 0;

        const generatePokemonListEmbed = (page) => {
            const startIndex = page * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const pokemonsOnPage = user.pokemons_captured.slice(startIndex, endIndex);

            let pokemonListText = '';
            if (pokemonsOnPage.length === 0) {
                pokemonListText = 'Nenhum Pokémon nesta página.';
            } else {
                pokemonsOnPage.forEach((p, index) => {
                    const pokemonTypesDisplay = p.type2 ? `${p.type1}/${p.type2}` : p.type1;
                    pokemonListText += `\`${startIndex + index + 1}.\` **${p.name}${p.is_shiny ? ' ✨' : ''}** (Lv.${p.level}, ${p.rarity}) | Tipo: ${pokemonTypesDisplay}\n`;
                });
            }

            const myPokemonEmbed = new EmbedBuilder()
                .setColor(INVENTORY_COLOR)
                .setTitle(`Seus Pokémon, Treinador ${message.author.username}: 🐾 (Página ${page + 1}/${totalPages})`)
                .setDescription(pokemonListText)
                .addFields(
                    { name: 'Total de Pokémon', value: `\`${user.pokemons_captured.length}\``, inline: true }
                )
                .setFooter({ text: `Use ${PREFIXO}viewpokemon [número] para mais detalhes.` })
                .setTimestamp();

            return myPokemonEmbed;
        };

        const generatePaginationButtons = (page) => {
            const row = new ActionRowBuilder();
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId('prev_page')
                    .setLabel('Anterior')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(page === 0),
                new ButtonBuilder()
                    .setCustomId('next_page')
                    .setLabel('Próximo')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(page === totalPages - 1)
            );
            return row;
        };

        const initialEmbed = generatePokemonListEmbed(currentPage);
        const initialButtons = generatePaginationButtons(currentPage);

        const replyMsg = await message.channel.send({ embeds: [initialEmbed], components: [initialButtons] });

        const collector = replyMsg.createMessageComponentCollector({
            filter: i => i.user.id === message.author.id && (i.customId === 'prev_page' || i.customId === 'next_page'),
            time: 60000 // 60 segundos para interagir com a paginação
        });

        collector.on('collect', async i => {
            if (i.customId === 'prev_page') {
                currentPage--;
            } else if (i.customId === 'next_page') {
                currentPage++;
            }

            const updatedEmbed = generatePokemonListEmbed(currentPage);
            const updatedButtons = generatePaginationButtons(currentPage);

            await i.update({ embeds: [updatedEmbed], components: [updatedButtons] }).catch(console.error);
        });

        collector.on('end', async () => {
            const disabledButtons = generatePaginationButtons(currentPage);
            disabledButtons.components.forEach(button => button.setDisabled(true));
            await replyMsg.edit({ components: [disabledButtons] }).catch(console.error);
        });
    },
};