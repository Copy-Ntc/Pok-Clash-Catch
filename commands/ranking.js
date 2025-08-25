// commands/ranking.js

const { EmbedBuilder, Collection } = require('discord.js');
const low = require('lowdb'); // Lowdb para acessar database.usersData
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const database = low(adapter);

const { PREFIXO, POKEMONS_CAPTURAVEIS, PROGRESS_COLOR } = require('../constants'); // Removido PROGRAMMER_USER_ID, INFO_COLOR
const { getPokemonXpForNextLevel } = require('../utils/helpers');


module.exports = {
    name: 'ranking',
    description: 'Vê o ranking global ou local de treinadores por capturas, vitórias ou nível.',
    async execute(message, args) { // Removido 'client' dos args, pois não é mais necessário
        let rankingType = args[0] ? args[0].toLowerCase() : 'global';
        let metric = args[1] ? args[1].toLowerCase() : 'capturas';

        const validRankingTypes = ['global', 'local'];
        const validMetrics = ['capturas', 'vitorias', 'nivel'];

        if (!validRankingTypes.includes(rankingType)) {
            return message.reply(`Tipo de ranking inválido. Use \`global\` ou \`local\`. Ex: \`${PREFIXO}ranking global capturas\``).catch(console.error);
        }
        if (!validMetrics.includes(metric)) {
            return message.reply(`Métrica de ranking inválida. Use \`capturas\`, \`vitorias\` ou \`nivel\`.`).catch(console.error);
        }

        // NOVIDADE: Força a recarga do db.json para pegar os dados de usuário mais recentes
        await database.read();
        let allUsersData = Object.values(database.get('usersData').value());

        // REMOVIDO: Filtrar o programador do ranking (PROGRAMMER_USER_ID não está mais ativo)
        // allUsersData = allUsersData.filter(u => u.id !== PROGRAMMER_USER_ID); 

        if (rankingType === 'local') {
            const guildMembers = await message.guild.members.fetch().catch(() => new Collection()); 
            allUsersData = allUsersData.filter(u => guildMembers.has(u.id));
        }

        allUsersData.sort((a, b) => {
            if (metric === 'capturas') {
                return (b.pokemons_captured ? b.pokemons_captured.length : 0) - (a.pokemons_captured ? a.pokemons_captured.length : 0);
            } else if (metric === 'vitorias') {
                return (b.battle_wins || 0) - (a.battle_wins || 0);
            } else if (metric === 'nivel') {
                if ((b.level || 1) !== (a.level || 1)) {
                    return (b.level || 1) - (a.level || 1);
                }
                return (b.xp || 0) - (a.xp || 0);
            }
            return 0;
        });

        const rankingTitle = `🏆 Ranking ${rankingType === 'global' ? 'Global' : `Local em ${message.guild.name}`} por ${metric.charAt(0).toUpperCase() + metric.slice(1)} 🏆`;
        let rankingDescription = '';

        if (allUsersData.length === 0) {
            rankingDescription = 'Nenhum treinador encontrado para este ranking ainda.';
        } else {
            const topUsers = allUsersData.slice(0, 10);

            for (let i = 0; i < topUsers.length; i++) {
                const userRank = topUsers[i];
                let value;
                if (metric === 'capturas') {
                    value = `${userRank.pokemons_captured.length || 0} Pokémon`;
                } else if (metric === 'vitorias') {
                    value = `${userRank.battle_wins || 0} Vitórias`;
                } else if (metric === 'nivel') {
                    value = `Lv.${userRank.level || 1} (XP: ${userRank.xp || 0}/${getPokemonXpForNextLevel(userRank.level)})`;
                }
                // NOVIDADE: Usa o username e discriminator salvos no DB
                const userDisplayName = `${userRank.username || 'Usuário Desconhecido'}#${userRank.discord_tag || '0000'}`;
                rankingDescription += `\`${i + 1}.\` **${userDisplayName}**: ${value}\n`;
            }
        }

        const rankingEmbed = new EmbedBuilder()
            .setColor(PROGRESS_COLOR)
            .setTitle(rankingTitle)
            .setDescription(rankingDescription)
            .setFooter({ text: `Seu bot tem ${POKEMONS_CAPTURAVEIS.length} Pokémon capturáveis!` })
            .setTimestamp();

        message.channel.send({ embeds: [rankingEmbed] }).catch(console.error);
    },
};