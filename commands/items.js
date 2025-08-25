// commands/items.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, INVENTORY_COLOR, POKEBALL_TYPES, EVOLUTION_STONES, OTHER_ITEMS } = require('../constants'); // Importa todos os tipos de itens
const { getOrCreateUserLocal } = require('../utils/helpers');

module.exports = {
    name: 'items',
    description: 'Vê todos os itens que você possui (Pokébolas, Pedras de Evolução e outros).', // Descrição atualizada
    aliases: ['inventory', 'mochila'],
    async execute(message) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        let itemsDescription = '';

        // NOVIDADE: Adiciona Pokébolas
        const pokeballItems = Object.keys(POKEBALL_TYPES).filter(ballKey => user[ballKey] && user[ballKey] > 0);
        if (pokeballItems.length > 0) {
            itemsDescription += '**Pokébolas:**\n';
            itemsDescription += pokeballItems.map(ballKey => {
                const ball = POKEBALL_TYPES[ballKey];
                return `${ball.emoji} \`${ball.displayName}\`: \`${user[ballKey]}\``;
            }).join(' | ') + '\n\n';
        }

        // NOVIDADE: Adiciona Pedras de Evolução
        const evolutionStoneItems = Object.keys(EVOLUTION_STONES).filter(stoneKey => user[stoneKey] && user[stoneKey] > 0);
        if (evolutionStoneItems.length > 0) {
            itemsDescription += '**Pedras de Evolução:**\n';
            itemsDescription += evolutionStoneItems.map(stoneKey => {
                const stone = EVOLUTION_STONES[stoneKey];
                return `${stone.emoji} \`${stone.displayName}\`: \`${user[stoneKey]}\``;
            }).join(' | ') + '\n\n';
        }

        // Adiciona Outros Itens (já estava lá, mas agora combinado)
        const otherExistingItems = Object.keys(OTHER_ITEMS).filter(itemKey => user[itemKey] && user[itemKey] > 0);
        if (otherExistingItems.length > 0) {
            itemsDescription += '**Outros Itens:**\n';
            itemsDescription += otherExistingItems.map(itemKey => {
                const item = OTHER_ITEMS[itemKey];
                return `${item.emoji} \`${item.displayName}\`: \`${user[itemKey]}\``;
            }).join(' | ') + '\n\n';
        }

        // Se nenhum tipo de item foi encontrado
        if (itemsDescription === '') {
            itemsDescription = 'Você não possui nenhum item no momento (Pokébolas, Pedras de Evolução ou outros).';
        }

        const itemsEmbed = new EmbedBuilder()
            .setColor(INVENTORY_COLOR)
            .setTitle(`🎒 Inventário de Itens de ${message.author.username} 🎒`)
            .setDescription(itemsDescription.trim()) // .trim() para remover quebras de linha extras no final
            .setFooter({ text: `Para ver seu dinheiro, use ${PREFIXO}balance.` }) // Referencia !balance
            .setTimestamp();

        message.channel.send({ embeds: [itemsEmbed] }).catch(console.error);
        console.log(`${message.author.tag} verificou seu inventário de itens.`);
    },
};