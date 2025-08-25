// commands/shop.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, SHOP_COLOR, POKEBALL_TYPES, EVOLUTION_STONES, OTHER_ITEMS } = require('../constants');

module.exports = {
    name: 'shop',
    description: 'Vê os itens disponíveis para compra.',
    async execute(message) {
        // Separa as pedras em grupos para caber no limite de campo do embed (1024 caracteres)
        // Dividido em 3 partes agora para maior garantia
        const basicStonesPart1 = [
            'fire_stone', 'water_stone', 'thunder_stone', 'leaf_stone', 'moon_stone'
        ];
        const basicStonesPart2 = [
            'sun_stone', 'dusk_stone', 'shiny_stone', 'dawn_stone', 'oval_stone'
        ];
        // O restante das pedras especiais (dividido por aproximadamente 7-8 itens por campo)
        const specialStonesPart1 = [
            'razor_claw', 'razor_fang', 'reaper_cloth', 'king_s_rock', 'metal_coat', 'upgrade', 'dubious_disc',
        ];
        const specialStonesPart2 = [
            'protector', 'electirizer', 'magmarizer', 'sachet', 'whipped_dream', 'cracked_pot', 'chipped_pot',
        ];
        const specialStonesPart3 = [
            'sweet_apple', 'tart_apple', 'glorious_cloak', 'auspicious_armor', 'leaders_crest'
        ];

        // Constrói a lista de "Outros Itens" (se houver)
        const otherItemsDisplay = Object.keys(OTHER_ITEMS).map(itemKey => {
            const item = OTHER_ITEMS[itemKey];
            return `${item.emoji} \`${item.displayName}\` (${item.cost} Remnants)`; // Mantém emoji para outros itens
        }).join('\n');

        const shopEmbed = new EmbedBuilder()
            .setColor(SHOP_COLOR)
            .setTitle('Bem-vindo à Loja Pokémon! 🛒')
            // Removido o comando !buy repetitivo da descrição para economizar caracteres.
            .setDescription(`Use \`${PREFIXO}buy [item] [quantidade]\` para fazer suas compras.`)
            .addFields(
                {
                    name: `Pokébolas`,
                    value: Object.keys(POKEBALL_TYPES).map(ballKey => {
                        const ball = POKEBALL_TYPES[ballKey];
                        // Formato mais compacto e sem emoji personalizado se a URL for muito longa
                        // Usar emoji padrão Unicode para economizar caracteres
                        return `${ball.emoji} \`${ball.displayName}\` (${ball.cost} Remnants)`;
                    }).join('\n'),
                    inline: false
                },
                {
                    name: `Pedras de Evolução (1/3)`,
                    value: basicStonesPart1.map(stoneKey => {
                        const stone = EVOLUTION_STONES[stoneKey];
                        if (!stone) return `\`${stoneKey}\` (Não configurado)`;
                        // Usar emoji padrão Unicode para economizar caracteres
                        return `${stone.emoji} \`${stone.displayName}\` (${stone.cost} Remnants)`;
                    }).join('\n'),
                    inline: false
                },
                {
                    name: `Pedras de Evolução (2/3)`,
                    value: basicStonesPart2.map(stoneKey => {
                        const stone = EVOLUTION_STONES[stoneKey];
                        if (!stone) return `\`${stoneKey}\` (Não configurado)`;
                        return `${stone.emoji} \`${stone.displayName}\` (${stone.cost} Remnants)`;
                    }).join('\n'),
                    inline: false
                },
                {
                    name: `Pedras de Evolução (3/3)`,
                    value: specialStonesPart1.map(stoneKey => { // Começa com as especiais
                        const stone = EVOLUTION_STONES[stoneKey];
                        if (!stone) return `\`${stoneKey}\` (Não configurado)`;
                        return `${stone.emoji} \`${stone.displayName}\` (${stone.cost} Remnants)`;
                    }).join('\n'),
                    inline: false
                }
            );
        
        // NOVIDADE: Campos adicionais para as pedras especiais restantes
        if (specialStonesPart2.length > 0) {
            shopEmbed.addFields({
                name: `Pedras de Evolução (Especiais - Cont.)`,
                value: specialStonesPart2.map(stoneKey => {
                    const stone = EVOLUTION_STONES[stoneKey];
                    if (!stone) return `\`${stoneKey}\` (Não configurado)`;
                    return `${stone.emoji} \`${stone.displayName}\` (${stone.cost} Remnants)`;
                }).join('\n'),
                inline: false
            });
        }
        if (specialStonesPart3.length > 0) {
            shopEmbed.addFields({
                name: `Pedras de Evolução (Especiais - Fim)`,
                value: specialStonesPart3.map(stoneKey => {
                    const stone = EVOLUTION_STONES[stoneKey];
                    if (!stone) return `\`${stoneKey}\` (Não configurado)`;
                    return `${stone.emoji} \`${stone.displayName}\` (${stone.cost} Remnants)`;
                }).join('\n'),
                inline: false
            });
        }


        if (otherItemsDisplay.trim()) {
            shopEmbed.addFields({ name: `Outros Itens`, value: otherItemsDisplay, inline: false });
        }

        shopEmbed.setFooter({ text: 'Boas compras, treinador!' }).setTimestamp();

        message.channel.send({ embeds: [shopEmbed] }).catch(console.error);
    },
};