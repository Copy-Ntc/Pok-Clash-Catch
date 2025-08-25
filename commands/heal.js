// commands/heal.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, ERROR_COLOR, SUCCESS_COLOR, EVENT_COLOR } = require('../constants');
const { getOrCreateUserLocal, saveUserToDb } = require('../utils/helpers');

module.exports = {
    name: 'heal',
    description: 'Cura todos os seus Pokémon desmaiados ou feridos.',
    async execute(message) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        const pokemonsToHeal = user.pokemons_captured.filter(p => p.current_hp < p.max_hp);

        if (pokemonsToHeal.length === 0) {
            return message.reply(`Treinador ${message.author.username}, todos os seus Pokémon já estão com HP máximo!`);
        }

        let totalCost = 0;
        pokemonsToHeal.forEach(p => {
            const missingHp = p.max_hp - p.current_hp;
            totalCost += Math.ceil(missingHp / 5) * 10; // 10 Remnants a cada 5 HP perdido
        });

        if (user.remnants < totalCost) {
            const insufficientFundsEmbed = new EmbedBuilder()
                .setColor(ERROR_COLOR)
                .setTitle('Remnants Insuficientes! 💸')
                .setDescription(`Você precisa de \`${totalCost}\` Remnants para curar todos os seus Pokémon, mas tem apenas \`${user.remnants}\`.`)
                .addFields(
                    { name: 'Como conseguir Remnants?', value: `Use \`${PREFIXO}daily\` para recompensas diárias ou \`${PREFIXO}battle\` para desafiar outros treinadores!` }
                )
                .setFooter({ text: 'Junte mais Remnants e tente novamente!' });
            return message.channel.send({ embeds: [insufficientFundsEmbed] });
        }

        user.remnants -= totalCost;
        pokemonsToHeal.forEach(p => {
            p.current_hp = p.max_hp; // Restaura HP para o máximo
        });
        saveUserToDb(userId, user);

        const healEmbed = new EmbedBuilder()
            .setColor(SUCCESS_COLOR)
            .setTitle('Poké Center: Cura Completa! ❤️‍🩹')
            .setDescription(`Seus Pokémon foram curados por \`${totalCost}\` Remnants!`)
            .addFields(
                { name: 'Pokémon Curados', value: pokemonsToHeal.map(p => p.name).join(', ') || 'Nenhum', inline: false },
                { name: 'Novo Saldo de Remnants', value: `\`${user.remnants}\` 💎`, inline: true }
            )
            .setFooter({ text: 'Pronto para a próxima aventura!' })
            .setTimestamp();

        message.channel.send({ embeds: [healEmbed] });
        console.log(`${message.author.tag} curou seus Pokémon por ${totalCost} Remnants.`);
    },
};