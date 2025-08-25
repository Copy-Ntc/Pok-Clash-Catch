// commands/ping.js
const { PREFIXO } = require('../constants');

module.exports = {
    name: 'ping',
    description: 'Testa a conexão do bot.',
    async execute(message) {
        message.reply('Pong!');
        console.log(`Comando ${PREFIXO}ping recebido de ${message.author.tag}`);
    },
};