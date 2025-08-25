// commands/setchannel.js

// CORREÇÃO AQUI: Importa EmbedBuilder
const { ChannelType, EmbedBuilder } = require('discord.js');
const { PREFIXO, SUCCESS_COLOR } = require('../constants');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const database = low(adapter);

module.exports = {
    name: 'setchannel',
    description: 'Define o canal oficial para o bot responder neste servidor.',
    adminOnly: true, // Marca como comando de admin
    hidden: false,   // Mantém visível no !help padrão (ou defina como true se quiser ocultar)

    async execute(message, args) {
        // A verificação de permissão 'Administrator' já é feita em bot.js para comandos adminOnly.
        // Se este comando for chamado, a permissão já foi validada.
        
        const newChannel = message.mentions.channels.first();
        if (!newChannel || newChannel.type !== ChannelType.GuildText) {
            return message.reply(`Uso correto: \`${PREFIXO}setchannel #nomedocanal\`. Por favor, mencione um canal de texto válido.`).catch(console.error);
        }

        database.set(`guildSettings.${message.guild.id}.allowedChannelId`, newChannel.id).write();
        
        const setChannelEmbed = new EmbedBuilder()
            .setColor(SUCCESS_COLOR)
            .setTitle('✅ Canal Oficial Definido! ✅')
            .setDescription(`A partir de agora, os comandos do PokéClash&Catch serão respondidos apenas em ${newChannel}!`)
            .setFooter({ text: 'Agradecemos a configuração, treinador administrador!' })
            .setTimestamp();

        message.channel.send({ embeds: [setChannelEmbed] }).catch(console.error);
        console.log(`[CONFIG] Canal oficial para Guild ID ${message.guild.id} definido como ${newChannel.id} por ${message.author.tag}.`);
    },
};