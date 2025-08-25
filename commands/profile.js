// commands/profile.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, PROFILE_COLOR, POKEBALL_TYPES, EVOLUTION_STONES, OTHER_ITEMS } = require('../constants');
const { getOrCreateUserLocal, getXpForNextLevel } = require('../utils/helpers');

module.exports = {
    name: 'profile',
    description: 'Vê seu perfil de treinador ou o de outro.',
    aliases: ['p'],
    async execute(message, args, client) { // Client é passado para buscar menções de usuário
        try { // NOVIDADE: Adicionado bloco try-catch para depuração

            const targetUser = message.mentions.users.first() || message.author;
            const targetUserId = targetUser.id;
            // Passa targetUser para getOrCreateUserLocal para garantir username/tag atualizados.
            const targetUserLocal = getOrCreateUserLocal(targetUserId, targetUser); 

            // NOVIDADE: Acessa username e discord_tag de forma segura, com fallback
            const displayedUsername = targetUserLocal.username || 'Treinador Desconhecido';
            // Para Discord.js v13+, discriminator é frequentemente '0'. Se mudar para sistema de username sem #, isso precisará de ajuste.
            const displayedDiscriminator = targetUserLocal.discord_tag === '0' ? '' : `#${targetUserLocal.discord_tag || '0000'}`;
            const fullDisplayName = `${displayedUsername}${displayedDiscriminator}`;


            const profileEmbed = new EmbedBuilder()
                .setTitle(`Perfil de Treinador - ${fullDisplayName}`)
                .setColor(PROFILE_COLOR)
                .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Nível Treinador', value: `\`${targetUserLocal.level ?? 1}\` (XP: \`${targetUserLocal.xp ?? 0}/${getXpForNextLevel(targetUserLocal.level ?? 1)}\`)`, inline: true }, // Adicionado ?? para valores padrão
                    { name: 'Pokémon Capturados', value: `\`${targetUserLocal.pokemons_captured?.length ?? 0}\``, inline: true }, // Adicionado ?? para valores padrão
                    { name: 'Vitórias em Batalha', value: `\`${targetUserLocal.battle_wins ?? 0}\``, inline: true },
                    { name: 'Derrotas em Batalha', value: `\`${targetUserLocal.battle_losses ?? 0}\``, inline: true },
                    { name: 'Remnants', value: `\`${targetUserLocal.remnants ?? 0}\` 💎`, inline: true },
                    {
                        name: 'Inventário Detalhado',
                        value: `Pokébolas, Pedras e Outros Itens: Use \`${PREFIXO}items\``,
                        inline: false
                    },
                    {
                        name: 'Pokémon Ativo',
                        value: targetUserLocal.active_pokemon_id ? 
                               `\`${targetUserLocal.pokemons_captured.find(p => p.id === targetUserLocal.active_pokemon_id)?.name || 'Inválido'}\` (Lv.${targetUserLocal.pokemons_captured.find(p => p.id === targetUserLocal.active_pokemon_id)?.level || 'N/A'})` : 
                               'Nenhum',
                        inline: false
                    }
                )
                .setFooter({ text: 'Dados do treinador PokéClash&Catch.' })
                .setTimestamp();

            await message.channel.send({ embeds: [profileEmbed] }).catch(console.error);
            console.log(`${message.author.tag} verificou o perfil de ${fullDisplayName} (dados locais).`);

        } catch (error) { // NOVIDADE: Captura e loga o erro
            console.error(`[ERRO] Comando profile:`, error);
            await message.reply('Houve um erro ao tentar exibir o perfil. Contate o administrador.').catch(console.error);
        }
    },
};