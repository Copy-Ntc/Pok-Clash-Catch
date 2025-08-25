// commands/daily.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, WARNING_COLOR, EVENT_COLOR } = require('../constants');
const { getOrCreateUserLocal, saveUserToDb } = require('../utils/helpers');

module.exports = {
    name: 'daily',
    description: 'Coleta sua recompensa diária de Remnants.',
    async execute(message) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        const today = new Date().toISOString().slice(0, 10);
        if (user.last_daily_reward === today) {
            const alreadyCollectedEmbed = new EmbedBuilder()
                .setColor(WARNING_COLOR)
                .setTitle('Recompensa Diária Já Coletada! ⏰')
                .setDescription(`Você já coletou sua recompensa diária hoje. Volte amanhã!`)
                .addFields(
                    { name: 'Seu Saldo Atual', value: `\`${user.remnants}\` Remnants` }
                )
                .setFooter({ text: 'Paciência, treinador!' });
            return message.channel.send({ embeds: [alreadyCollectedEmbed] });
        }

        const dailyAmount = 100000000; // Valor da recompensa diária
        user.remnants += dailyAmount;
        user.last_daily_reward = today;
        saveUserToDb(userId, user);

        const dailyEmbed = new EmbedBuilder()
            .setColor(EVENT_COLOR)
            .setTitle('Recompensa Diária Coletada! 💰')
            .setDescription(`🎉 ${message.author.username}, você coletou \`${dailyAmount}\` Remnants!`)
            .addFields(
                { name: 'Novo Saldo', value: `\`${user.remnants}\` Remnants`, inline: true }
            )
            .setFooter({ text: 'Volte amanhã para mais!' })
            .setTimestamp();

        message.channel.send({ embeds: [dailyEmbed] });
        console.log(`[BOT] ${message.author.tag} coletou recompensa diária. Novo saldo: ${user.remnants}`);
    },
};