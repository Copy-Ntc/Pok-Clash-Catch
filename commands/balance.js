// commands/balance.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, COMMAND_COLOR } = require('../constants'); // Remove POKEBALL_TYPES, EVOLUTION_STONES
const { getOrCreateUserLocal } = require('../utils/helpers');

module.exports = {
    name: 'balance',
    description: 'Vê seu saldo de Remnants.', // Descrição ajustada
    aliases: ['remnants'],
    async execute(message) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        const balanceEmbed = new EmbedBuilder()
            .setColor(COMMAND_COLOR)
            .setTitle('Seu Saldo Atual 💸')
            .setDescription(`Treinador ${message.author.username}, aqui está o seu balanço:`)
            .addFields(
                { name: 'Remnants', value: `\`${user.remnants}\` 💎`, inline: true }
            )
            .setFooter({ text: `Para ver suas Pokébolas e Pedras de Evolução, use ${PREFIXO}items.` }) // Referencia !items
            .setTimestamp();

        message.channel.send({ embeds: [balanceEmbed] }).catch(console.error);
        console.log(`${message.author.tag} verificou seu saldo.`);
    },
};