// commands/battle.js

const { EmbedBuilder, Collection } = require('discord.js');
const {
    PREFIXO, NPC_BATTLE_LIMIT_PER_DAY, POKEMONS_CAPTURAVEIS, SHINY_CHANCE, NPC_BATTLE_COOLDOWN_HOURS, // NOVIDADE: Importa NPC_BATTLE_COOLDOWN_HOURS
    ERROR_COLOR, SUCCESS_COLOR, WARNING_COLOR, INFO_COLOR, BATTLE_COLOR,
    NPC_BATTLE_COLOR
} = require('../constants');
const {
    getOrCreateUserLocal, saveUserToDb, getPokemonSpriteUrl, getPokemonDetailsFromPokeAPI,
    calculatePokemonStats, generateHpBar, calculateDamage, getPokemonXpForNextLevel, getXpForNextLevel, getGenericAttack
} = require('../utils/helpers');


module.exports = {
    name: 'battle',
    description: 'Inicia uma batalha Pokémon contra um NPC ou outro treinador.',
    async execute(message, args, client) { // 'client' é passado para buscar usuários
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        const targetType = args[0] ? args[0].toLowerCase() : null;

        // --- Lógica para Batalhas contra NPCs (Duelos 1x1) ---
        if (targetType === 'npc') {
            const today = new Date().toISOString().slice(0, 10);
            if (user.last_npc_battle_reset !== today) {
                user.npc_battles_today = 0;
                user.last_npc_battle_reset = today;
                saveUserToDb(userId, user);
            }

            if (user.npc_battles_today >= NPC_BATTLE_LIMIT_PER_DAY) {
                return message.reply(`Você atingiu o limite de ${NPC_BATTLE_LIMIT_PER_DAY} batalhas contra NPCs hoje. Volte amanhã!`).catch(console.error);
            }

            // NOVIDADE: Lógica de cooldown por tempo para batalhas NPC
            const now = Date.now();
            if (user.last_npc_battle_time) {
                const timeElapsed = now - user.last_npc_battle_time;
                const cooldownDurationMs = NPC_BATTLE_COOLDOWN_HOURS * 60 * 60 * 1000;

                if (timeElapsed < cooldownDurationMs) {
                    const timeLeft = cooldownDurationMs - timeElapsed;
                    const minutesLeft = Math.floor(timeLeft / (1000 * 60));
                    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    let timeRemaining = '';
                    if (minutesLeft > 0) timeRemaining += `${minutesLeft}m `;
                    timeRemaining += `${secondsLeft}s`;

                    return message.reply(`Você deve esperar ${timeRemaining} antes de iniciar outra batalha NPC.`).catch(console.error);
                }
            }

            const difficulty = args[1] ? args[1].toLowerCase() : 'easy';
            let npcName = '';
            let npcPokemonData = null; // Apenas 1 Pokémon para o NPC
            let xpReward = 0;
            let remnantsReward = 0;

            switch (difficulty) {
                case 'easy':
                    npcName = 'Jovem Treinador';
                    xpReward = 40;
                    remnantsReward = 100;
                    const easyPokemonOptions = POKEMONS_CAPTURAVEIS.filter(p => p.rarity === 'comum');
                    const selectedEasyPokemon = easyPokemonOptions[Math.floor(Math.random() * easyPokemonOptions.length)];
                    if (selectedEasyPokemon) {
                        const npcLevel = 15;
                        const stats = calculatePokemonStats(npcLevel, selectedEasyPokemon.rarity);
                        const details = await getPokemonDetailsFromPokeAPI(selectedEasyPokemon.id);
                        npcPokemonData = { ...selectedEasyPokemon, ...stats, level: npcLevel, is_shiny: Math.random() < (SHINY_CHANCE * 4), type1: details.type1, type2: details.type2, abilities: details.abilities };
                    }
                    break;
                case 'medium':
                    npcName = 'Veterano';
                    xpReward = 100;
                    remnantsReward = 300;
                    const mediumPokemonOptions = POKEMONS_CAPTURAVEIS.filter(p => p.rarity === 'incomum' || p.rarity === 'raro');
                    const selectedMediumPokemon = mediumPokemonOptions[Math.floor(Math.random() * mediumPokemonOptions.length)];
                    if (selectedMediumPokemon) {
                         const npcLevel = 30;
                         const stats = calculatePokemonStats(npcLevel, selectedMediumPokemon.rarity);
                         const details = await getPokemonDetailsFromPokeAPI(selectedMediumPokemon.id);
                         npcPokemonData = { ...selectedMediumPokemon, ...stats, level: npcLevel, is_shiny: Math.random() < (SHINY_CHANCE * 2), type1: details.type1, type2: details.type2, abilities: details.abilities };
                    }
                    break;
                case 'hard':
                    npcName = 'Líder de Ginásio';
                    xpReward = 300;
                    remnantsReward = 1000;
                    const hardPokemonOptions = POKEMONS_CAPTURAVEIS.filter(p => p.rarity === 'raro' || p.rarity === 'muito raro' || p.rarity === 'lendário');
                    const selectedHardPokemon = hardPokemonOptions[Math.floor(Math.random() * hardPokemonOptions.length)];
                    if (selectedHardPokemon) {
                        const npcLevel = 50;
                        const stats = calculatePokemonStats(npcLevel, selectedHardPokemon.rarity);
                        const details = await getPokemonDetailsFromPokeAPI(selectedHardPokemon.id);
                        npcPokemonData = { ...selectedHardPokemon, ...stats, level: npcLevel, is_shiny: Math.random() < (SHINY_CHANCE * 1), type1: details.type1, type2: details.type2, abilities: details.abilities };
                    }
                    break;
                case 'elite': 
                    npcName = 'Elite Four Member';
                    xpReward = 450;
                    remnantsReward = 1500;
                    const elitePokemonOptions = POKEMONS_CAPTURAVEIS.filter(p => p.rarity === 'raro' || p.rarity === 'muito raro' || p.rarity === 'lendário');
                    const selectedElitePokemon = elitePokemonOptions[Math.floor(Math.random() * elitePokemonOptions.length)];
                    if (selectedElitePokemon) {
                        const npcLevel = 70;
                        const stats = calculatePokemonStats(npcLevel, selectedElitePokemon.rarity);
                        const details = await getPokemonDetailsFromPokeAPI(selectedElitePokemon.id);
                        npcPokemonData = { ...selectedElitePokemon, ...stats, level: npcLevel, is_shiny: Math.random() < (SHINY_CHANCE * 0.75), type1: details.type1, type2: details.type2, abilities: details.abilities };
                    }
                    break;
                case 'master':
                    npcName = 'Pokémon Master';
                    xpReward = 800;
                    remnantsReward = 3000;
                    const masterPokemonOptions = POKEMONS_CAPTURAVEIS.filter(p => p.rarity === 'lendário');
                    const selectedMasterPokemon = masterPokemonOptions[Math.floor(Math.random() * masterPokemonOptions.length)];
                    if (selectedMasterPokemon) {
                        const npcLevel = 100;
                        const stats = calculatePokemonStats(npcLevel, selectedMasterPokemon.rarity);
                        const details = await getPokemonDetailsFromPokeAPI(selectedMasterPokemon.id);
                        npcPokemonData = { ...selectedMasterPokemon, ...stats, level: npcLevel, is_shiny: Math.random() < (SHINY_CHANCE * 0.5), type1: details.type1, type2: details.type2, abilities: details.abilities };
                    }
                    break;
                default:
                    return message.reply(`Dificuldade de NPC inválida. Use \`easy\`, \`medium\`, \`hard\`, \`elite\` ou \`master\`. Ex: \`${PREFIXO}battle npc easy\``).catch(console.error);
            }

            if (!npcPokemonData) {
                return message.reply("Não foi possível gerar um oponente NPC neste momento. Tente novamente.").catch(console.error);
            }

            let playerActivePokemon = null;
            if (user.active_pokemon_id) {
                playerActivePokemon = user.pokemons_captured.find(p => p.id === user.active_pokemon_id);
            }

            if (!playerActivePokemon || playerActivePokemon.current_hp <= 0) {
                return message.reply(`Você precisa ter um Pokémon ativo e saudável para batalhar! Use \`${PREFIXO}setpokemon [número]\` para escolher seu Pokémon, e \`${PREFIXO}heal\` para curá-lo.`).catch(console.error);
            }
            
            let npcActivePokemon = npcPokemonData;

            let turn = 1;

            const battleStartEmbed = new EmbedBuilder()
                .setColor(NPC_BATTLE_COLOR)
                .setTitle('💥 Batalha Pokémon Iniciada! 💥')
                .setDescription(`${message.author.username} envia **${playerActivePokemon.name}** (Lv.${playerActivePokemon.level}) ${generateHpBar(playerActivePokemon.current_hp, playerActivePokemon.max_hp)}
${npcName} envia **${npcActivePokemon.name}** (Lv.${npcActivePokemon.level})${npcActivePokemon.is_shiny ? ' ✨' : ''} ${generateHpBar(npcActivePokemon.current_hp, npcActivePokemon.max_hp)}`)
                .setThumbnail(getPokemonSpriteUrl(playerActivePokemon.sprite_id))
                .setImage(getPokemonSpriteUrl(npcActivePokemon.id, npcActivePokemon.is_shiny))
                .setFooter({ text: 'Que vença o melhor treinador!' });

            await message.channel.send({ embeds: [battleStartEmbed] }).catch(console.error);
            await new Promise(resolve => setTimeout(resolve, 3000));

            while (playerActivePokemon.current_hp > 0 && npcActivePokemon.current_hp > 0) {
                let currentTurnLog = `--- Turno ${turn} ---\n`;

                // Ataque do Jogador
                const playerAttackType = (turn % 2 !== 0) ? 'normal' : 'strong';
                const playerAttack = getGenericAttack(playerActivePokemon.type1, playerAttackType);
                const playerDamageResult = calculateDamage(playerActivePokemon, npcActivePokemon, playerAttack);
                const playerDamage = playerDamageResult.finalDamage;
                const playerEffectiveness = playerDamageResult.effectiveness;
                let playerEffectivenessMsg = '';
                if (playerEffectiveness === 0) playerEffectivenessMsg = ' (Imune!)';
                else if (playerEffectiveness >= 2.0) playerEffectivenessMsg = ' (Super Efetivo!)';
                else if (playerEffectiveness <= 0.5 && playerEffectiveness > 0) playerEffectivenessMsg = ' (Não Efetivo...)';

                npcActivePokemon.current_hp = Math.max(0, npcActivePokemon.current_hp - playerDamage);
                currentTurnLog += `**${playerActivePokemon.name}** usou **${playerAttack.name}**! ${npcActivePokemon.name} recebe ${playerDamage} de dano${playerEffectivenessMsg}. (HP: ${npcActivePokemon.current_hp}/${npcActivePokemon.max_hp})\n`;

                if (npcActivePokemon.current_hp <= 0) {
                    currentTurnLog += `**${npcActivePokemon.name}** desmaiou!\n`;
                    await message.channel.send({ embeds: [new EmbedBuilder().setColor(NPC_BATTLE_COLOR).setDescription(currentTurnLog).setImage(getPokemonSpriteUrl(npcActivePokemon.id, npcActivePokemon.is_shiny))] }).catch(console.error);
                    break; 
                }

                // Ataque do NPC
                const npcAttackType = (turn % 2 !== 0) ? 'normal' : 'strong'; 
                const npcAttack = getGenericAttack(npcActivePokemon.type1, npcAttackType);
                const npcDamageResult = calculateDamage(npcActivePokemon, playerActivePokemon, npcAttack);
                const npcDamage = npcDamageResult.finalDamage;
                const npcEffectiveness = npcDamageResult.effectiveness;
                let npcEffectivenessMsg = '';
                if (npcEffectiveness === 0) npcEffectivenessMsg = ' (Imune!)';
                else if (npcEffectiveness >= 2.0) npcEffectivenessMsg = ' (Super Efetivo!)';
                else if (npcEffectiveness <= 0.5 && npcEffectiveness > 0) npcEffectivenessMsg = ' (Não Efetivo...)';

                playerActivePokemon.current_hp = Math.max(0, playerActivePokemon.current_hp - npcDamage);
                currentTurnLog += `**${npcActivePokemon.name}** usou **${npcAttack.name}**! ${playerActivePokemon.name} recebe ${npcDamage} de dano${npcEffectivenessMsg}. (HP: ${playerActivePokemon.current_hp}/${playerActivePokemon.max_hp})\n`;

                if (playerActivePokemon.current_hp <= 0) {
                    currentTurnLog += `**${playerActivePokemon.name}** desmaiou!\n`;
                    await message.channel.send({ embeds: [new EmbedBuilder().setColor(BATTLE_COLOR).setDescription(currentTurnLog).setThumbnail(getPokemonSpriteUrl(playerActivePokemon.sprite_id, playerActivePokemon.is_shiny))] }).catch(console.error);
                    break;
                }
                
                await message.channel.send({ embeds: [new EmbedBuilder().setColor(NPC_BATTLE_COLOR).setDescription(currentTurnLog).setImage(getPokemonSpriteUrl(npcActivePokemon.id, npcActivePokemon.is_shiny))] }).catch(console.error);
                
                turn++;
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            // --- Lógica final da batalha NPC ---
            const battleEndEmbed = new EmbedBuilder()
                .setTitle(`Batalha contra ${npcName} - Fim!`)
                .setDescription('Resultados Finais:')
                .setTimestamp();

            if (playerActivePokemon.current_hp <= 0) { // Jogador perdeu
                battleEndEmbed.setColor(ERROR_COLOR);
                battleEndEmbed.setDescription(`Você foi derrotado por ${npcName}! Seu Pokémon ${playerActivePokemon.name} desmaiou.`);
                user.battle_losses++;
            } else { // Jogador venceu
                battleEndEmbed.setColor(SUCCESS_COLOR);
                battleEndEmbed.setDescription(`Você derrotou ${npcName}! 🎉 Pokémon do NPC desmaiou!`);
                battleEndEmbed.addFields(
                    { name: 'Recompensas', value: `+${xpReward} XP para Treinador e +${remnantsReward} Remnants!` }
                );
                playerActivePokemon.level_xp = (playerActivePokemon.level_xp || 0) + xpReward;
                user.remnants += remnantsReward;

                let pokemonLevelUpMessage = '';
                if (playerActivePokemon.level < 100) {
                    let xpNeededForNextLevelPkm = getPokemonXpForNextLevel(playerActivePokemon.level);
                    while (playerActivePokemon.level_xp >= xpNeededForNextLevelPkm && playerActivePokemon.level < 100) {
                        playerActivePokemon.level++;
                        playerActivePokemon.level_xp -= xpNeededForNextLevelPkm;
                        const newStats = calculatePokemonStats(playerActivePokemon.level, playerActivePokemon.rarity);
                        playerActivePokemon.max_hp = newStats.max_hp;
                        playerActivePokemon.current_hp = newStats.max_hp;
                        playerActivePokemon.attack = newStats.attack;
                        xpNeededForNextLevelPkm = getPokemonXpForNextLevel(playerActivePokemon.level);
                        pokemonLevelUpMessage += `\n⬆️ **${playerActivePokemon.name}** subiu para o **Nível ${playerActivePokemon.level}**!`;
                    }
                }
                if (pokemonLevelUpMessage) {
                    battleEndEmbed.addFields(
                        { name: 'Progressão do Pokémon', value: pokemonLevelUpMessage, inline: false }
                    );
                }
                user.battle_wins++;
            }
            
            user.npc_battles_today++;
            user.last_npc_battle_time = now; // NOVIDADE: Atualiza o tempo da última batalha NPC
            saveUserToDb(userId, user);
            message.channel.send({ embeds: [battleEndEmbed] }).catch(console.error);
            console.log(`[BOT] Batalha NPC contra ${npcName} concluída por ${message.author.tag}.`);

        } else { // Lógica para batalha PvP (jogador vs jogador)
            const challengedUser = message.mentions.users.first();
            const challengedUserId = challengedUser ? challengedUser.id : null;
            const challengedUserLocal = challengedUserId ? getOrCreateUserLocal(challengedUserId) : null;

            if (!challengedUser) {
                return message.reply(`Por favor, mencione o treinador que você quer desafiar! Ex: \`${PREFIXO}battle @OutroTreinador\` ou use \`${PREFIXO}battle npc [easy/medium/hard/elite/master]\` para batalhar contra um NPC.`).catch(console.error);
            }
            if (challengedUser.bot) {
                return message.reply('Você não pode desafiar um bot para uma batalha Pokémon!').catch(console.error);
            }
            if (challengedUser.id === message.author.id) {
                return message.reply('Você não pode desafiar a si mesmo para uma batalha!').catch(console.error);
            }

            let playerActivePokemon = null; // Declarado fora do loop
            if (user.active_pokemon_id) {
                playerActivePokemon = user.pokemons_captured.find(p => p.id === user.active_pokemon_id);
            }
            let challengedActivePokemon = null; // Declarado fora do loop
            if (challengedUserLocal && challengedUserLocal.active_pokemon_id) {
                challengedActivePokemon = challengedUserLocal.pokemons_captured.find(p => p.id === challengedUserLocal.active_pokemon_id);
            }
            
            if (!playerActivePokemon || playerActivePokemon.current_hp <= 0) {
                return message.reply(`Treinador ${message.author.username}, seu Pokémon ativo está desmaiado ou não definido! Use \`${PREFIXO}setpokemon [número]\` para escolher seu Pokémon, e \`${PREFIXO}heal\` para curá-lo.`).catch(console.error);
            }
            if (!challengedActivePokemon || challengedActivePokemon.current_hp <= 0) {
                return message.reply(`Treinador ${challengedUser.username} não tem um Pokémon ativo e saudável para lutar. Avise-o(a) para usar \`${PREFIXO}setpokemon\` e \`${PREFIXO}heal\`!`).catch(console.error);
            }

            const calculatePower = (profile) => {
                return (profile.active_pokemon_id ? profile.pokemons_captured.find(p => p.id === profile.active_pokemon_id).level : 0) * 10;
            };

            const challengerPower = calculatePower(user);
            const challengedPower = calculatePower(challengedUserLocal);

            let winnerUserId;
            let loserUserId;
            let battleColor = BATTLE_COLOR;

            const battleStartEmbed = new EmbedBuilder()
                .setColor(battleColor)
                .setTitle('💥 Batalha Pokémon Iniciada! 💥')
                .setDescription(`Treinadores **${message.author.username}** (Poder: ${challengerPower}) vs **${challengedUser.username}** (Poder: ${challengedPower})!`)
                .setThumbnail(getPokemonSpriteUrl(playerActivePokemon.sprite_id))
                .setImage(getPokemonSpriteUrl(challengedActivePokemon.sprite_id, challengedActivePokemon.is_shiny))
                .setFooter({ text: 'Que vença o melhor treinador!' });

            await message.channel.send({ embeds: [battleStartEmbed] }).catch(console.error);
            await new Promise(resolve => setTimeout(resolve, 3000));

            let battleLogChunks = []; 
            let currentTurnLog = '';
            let turn = 1;

            // Variáveis temporárias para manter o estado dos Pokémon durante o loop
            let currentPlayerPkmInBattle = { ...playerActivePokemon };
            let challengedPlayerPkmInBattle = { ...challengedActivePokemon };

            while (currentPlayerPkmInBattle.current_hp > 0 && challengedPlayerPkmInBattle.current_hp > 0) {
                currentTurnLog = `--- Turno ${turn} ---\n`;

                // Ataque do Jogador 1
                const playerAttackType = (turn % 2 !== 0) ? 'normal' : 'strong';
                const playerAttack = getGenericAttack(currentPlayerPkmInBattle.type1, playerAttackType);
                const playerDamageResult = calculateDamage(currentPlayerPkmInBattle, challengedPlayerPkmInBattle, playerAttack);
                const playerDamage = playerDamageResult.finalDamage;
                const playerEffectiveness = playerDamageResult.effectiveness;
                let playerEffectivenessMsg = '';
                if (playerEffectiveness === 0) playerEffectivenessMsg = ' (Imune!)';
                else if (playerEffectiveness >= 2.0) playerEffectivenessMsg = ' (Super Efetivo!)';
                else if (playerEffectiveness <= 0.5 && playerEffectiveness > 0) playerEffectivenessMsg = ' (Não Efetivo...)';

                challengedPlayerPkmInBattle.current_hp = Math.max(0, challengedPlayerPkmInBattle.current_hp - playerDamage);
                currentTurnLog += `**${currentPlayerPkmInBattle.name}** (${playerAttack.name}) ataca! ${challengedPlayerPkmInBattle.name} recebe ${playerDamage} de dano${playerEffectivenessMsg}. (HP: ${challengedPlayerPkmInBattle.current_hp}/${challengedPlayerPkmInBattle.max_hp})\n`;

                if (challengedPlayerPkmInBattle.current_hp <= 0) {
                    currentTurnLog += `**${challengedPlayerPkmInBattle.name}** desmaiou!\n`;
                    battleLogChunks.push(currentTurnLog);
                    break;
                }

                // Ataque do Jogador 2
                const challengedAttackType = (turn % 2 !== 0) ? 'normal' : 'strong';
                const challengedAttack = getGenericAttack(challengedPlayerPkmInBattle.type1, challengedAttackType);
                const challengedDamageResult = calculateDamage(challengedPlayerPkmInBattle, currentPlayerPkmInBattle, challengedAttack);
                const challengedDamage = challengedDamageResult.finalDamage;
                const challengedEffectiveness = challengedDamageResult.effectiveness;
                let challengedEffectivenessMsg = '';
                if (challengedEffectiveness === 0) challengedEffectivenessMsg = ' (Imune!)';
                else if (challengedEffectiveness >= 2.0) challengedEffectivenessMsg = ' (Super Efetivo!)';
                else if (challengedEffectiveness <= 0.5 && challengedEffectiveness > 0) challengedEffectivenessMsg = ' (Não Efetivo...)';

                currentPlayerPkmInBattle.current_hp = Math.max(0, currentPlayerPkmInBattle.current_hp - challengedDamage);
                currentTurnLog += `**${challengedPlayerPkmInBattle.name}** (${challengedAttack.name}) ataca! ${currentPlayerPkmInBattle.name} recebe ${challengedDamage} de dano${challengedEffectivenessMsg}. (HP: ${currentPlayerPkmInBattle.current_hp}/${currentPlayerPkmInBattle.max_hp})\n`;

                if (currentPlayerPkmInBattle.current_hp <= 0) {
                    currentTurnLog += `**${currentPlayerPkmInBattle.name}** desmaiou!\n`;
                    battleLogChunks.push(currentTurnLog);
                    break;
                }
                
                battleLogChunks.push(currentTurnLog);
                await new Promise(resolve => setTimeout(resolve, 1500));

                turn++;
            }
            
            for (const chunk of battleLogChunks) {
                if (chunk.trim()) {
                    await message.channel.send({ embeds: [new EmbedBuilder().setColor(BATTLE_COLOR).setDescription(chunk)] }).catch(console.error);
                }
            }

            // ATUALIZA OS OBJETOS ORIGINAIS COM OS ESTADOS FINAIS
            playerActivePokemon.current_hp = currentPlayerPkmInBattle.current_hp;
            challengedActivePokemon.current_hp = challengedPlayerPkmInBattle.current_hp;


            user.pokemons_captured = user.pokemons_captured.map(pkm => {
                if (playerActivePokemon && pkm.id === playerActivePokemon.id) {
                    return playerActivePokemon;
                }
                return pkm;
            });
            saveUserToDb(userId, user);

            if (challengedUserLocal) {
                challengedUserLocal.pokemons_captured = challengedUserLocal.pokemons_captured.map(pkm => {
                    if (challengedActivePokemon && pkm.id === challengedActivePokemon.id) { 
                        return challengedActivePokemon;
                    }
                    return pkm;
                });
                saveUserToDb(challengedUserId, challengedUserLocal);
            }


            const battleEndEmbed = new EmbedBuilder()
                .setTitle('Batalha PvP - Fim!')
                .setDescription('Resultados Finais:')
                .setTimestamp();

            if (playerActivePokemon.current_hp <= 0 && challengedActivePokemon.current_hp <= 0) {
                battleEndEmbed.setColor(WARNING_COLOR);
                battleEndEmbed.setDescription(`A batalha terminou em empate! Ambos os Pokémon desmaiaram.`);
            }
            else if (playerActivePokemon.current_hp <= 0) {
                battleEndEmbed.setColor(ERROR_COLOR);
                battleEndEmbed.setDescription(`**${challengedUser.username}** derrotou **${message.author.username}**!`);
                const winnerUser = getOrCreateUserLocal(challengedUserId);
                winnerUser.battle_wins++;
                saveUserToDb(winnerUserId, winnerUser);
                const loserUser = getOrCreateUserLocal(userId);
                loserUser.battle_losses++;
                saveUserToDb(loserUserId, loserUser);
            } else {
                battleEndEmbed.setColor(SUCCESS_COLOR);
                battleEndEmbed.setDescription(`**${message.author.username}** derrotou **${challengedUser.username}**! 🎉`);
                const winnerUser = getOrCreateUserLocal(userId);
                winnerUser.battle_wins++;
                saveUserToDb(winnerUserId, winnerUser);
                const loserUser = getOrCreateUserLocal(challengedUserId);
                loserUser.battle_losses++;
                saveUserToDb(loserUserId, loserUser);
            }
            message.channel.send({ embeds: [battleEndEmbed] }).catch(console.error);
            console.log(`[BOT] Batalha PvP entre ${message.author.tag} e ${challengedUser.tag} concluída.`);

            const playersToGiveXp = [];
            // Adiciona o jogador que participou e não desmaiou.
            if (playerActivePokemon && playerActivePokemon.current_hp > 0) { 
                playersToGiveXp.push({ userObj: user, pokemonObj: playerActivePokemon, discordUser: message.author });
            }
            // Adiciona o oponente que participou e não desmaiou.
            if (challengedActivePokemon && challengedActivePokemon.current_hp > 0) { 
                playersToGiveXp.push({ userObj: challengedUserLocal, pokemonObj: challengedActivePokemon, discordUser: challengedUser });
            }

            for (const entry of playersToGiveXp) {
                const pUser = entry.userObj;
                const pokemon = entry.pokemonObj;
                const discordUser = entry.discordUser;

                let pokemonXpGained = Math.floor(Math.random() * 20) + 10;
                pUser.xp += pokemonXpGained;
                pokemon.level_xp = (pokemon.level_xp || 0) + pokemonXpGained;

                let pokemonLevelUpMessage = '';
                let pokemonXpNeededForNextLevel = getPokemonXpForNextLevel(pokemon.level);
                while (pokemon.level_xp >= pokemonXpNeededForNextLevel && pokemon.level < 100) {
                    pokemon.level++;
                    pokemon.level_xp -= pokemonXpNeededForNextLevel;
                    const newStats = calculatePokemonStats(pokemon.level, pokemon.rarity);
                    pokemon.max_hp = newStats.max_hp;
                    pokemon.current_hp = newStats.max_hp;
                    pokemon.attack = newStats.attack;
                    pokemonXpNeededForNextLevel = getPokemonXpForNextLevel(pokemon.level);
                    pokemonLevelUpMessage += `\n⬆️ **${pokemon.name}** de ${discordUser.username} subiu para o **Nível ${pokemon.level}**!`;
                }
                if (pokemonLevelUpMessage) {
                     message.channel.send({ embeds: [new EmbedBuilder().setColor(INFO_COLOR).setDescription(pokemonLevelUpMessage)] }).catch(console.error);
                }
            }
        }
    }
};