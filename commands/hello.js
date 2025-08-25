// commands/hello.js
const { PREFIXO } = require('../constants');

module.exports = {
    name: 'hello',
    description: 'O bot te cumprimenta.',
    async execute(message) {
        message.channel.send(`Olá, ${message.author.username}! Eu sou o PokéClash&Catch.`);
        console.log(`Comando ${PREFIXO}hello recebido de ${message.author.tag}`);
    },
};