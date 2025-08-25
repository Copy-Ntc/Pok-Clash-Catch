// commands/help.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, INFO_COLOR, WILD_COMMAND_LIMIT, NPC_BATTLE_LIMIT_PER_DAY } = require('../constants');

module.exports = {
    name: 'help',
    description: 'Mostra a lista de todos os comandos do bot.',
    async execute(message, args, client) { // 'client' é passado para acessar os comandos
        // Filtra comandos para não incluir os marcados como 'adminOnly' ou 'hidden'
        const userCommands = client.commands.filter(cmd => !cmd.adminOnly && !cmd.hidden);

        const helpEmbed = new EmbedBuilder()
            .setColor(INFO_COLOR)
            .setTitle('Guia de Comandos do PokéClash&Catch 📖')
            .setDescription(`Use \`${PREFIXO}[comando]\` para interagir com o bot.`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: '⚙️ Configuração (Para Administradores do Servidor)',
                    value: `\`${PREFIXO}setchannel #canal\` - Define o canal oficial do bot neste servidor.`,
                    inline: false
                },
                {
                    name: '🌟 Aventura e Captura',
                    value: `\`${PREFIXO}wild\` ou \`${PREFIXO}w\` - Tenta capturar um Pokémon selvagem. (Limite: ${WILD_COMMAND_LIMIT}/hora)\n\`${PREFIXO}mypokemon\` - Mostra sua coleção de Pokémon (com paginação).\n\`${PREFIXO}viewpokemon [número]\` - Vê detalhes de um Pokémon específico da sua coleção.`,
                    inline: false
                },
                {
                    name: '⚔️ Batalhas',
                    value: `\`${PREFIXO}setpokemon [número]\` - Define o seu Pokémon principal para as batalhas 1x1.\n\`${PREFIXO}battle @usuario\` - Desafia outro treinador para uma batalha 1x1.\n\`${PREFIXO}battle npc [easy/medium/hard/elite/master]\` - Batalha contra um NPC 1x1 para treinar Pokémon e ganhar recompensas. (Limite: ${NPC_BATTLE_LIMIT_PER_DAY}/dia)`,
                    inline: false
                },
                {
                    name: '📊 Perfil e Economia',
                    value: `\`${PREFIXO}profile [@usuario]\` - Vê seu perfil de treinador (ou de outro).\n\`${PREFIXO}daily\` - Coleta sua recompensa diária de Remnants.\n\`${PREFIXO}balance\` ou \`${PREFIXO}remnants\` - Vê seu saldo de Remnants.\n\`${PREFIXO}items\` - Vê todos os seus outros itens (Pokébolas, Pedras, etc.).\n\`${PREFIXO}shop\` - Vê os itens disponíveis para compra.`,
                    inline: false
                },
                {
                    name: '💊 Cura',
                    value: `\`${PREFIXO}heal\` - Cura todos os seus Pokémon desmaiados ou feridos (custo em Remnants).`,
                    inline: false
                },
                {
                    name: '✨ Evolução',
                    value: `\`${PREFIXO}evolve [número]\` - Tenta evoluir um Pokémon da sua coleção.`,
                    inline: false
                },
                {
                    name: '❓ Outros',
                    value: `\`${PREFIXO}ping\` - Testa a conexão do bot.\n\`${PREFIXO}hello\` - O bot te cumprimenta.`,
                    inline: false
                }
            )
            .setFooter({ text: `Prefixo atual: ${PREFIXO}` })
            .setTimestamp();

        message.channel.send({ embeds: [helpEmbed] }).catch(console.error);
    },
};