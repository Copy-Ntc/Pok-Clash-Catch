// commands/wild.js

const { Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const {
    PREFIXO, WILD_COMMAND_LIMIT, WILD_COMMAND_COOLDOWN_HOURS,
    POKEMONS_CAPTURAVEIS, CHANCE_DE_CAPTURA_BASE, SHINY_CHANCE, TYPE_COLORS,
    ERROR_COLOR, SUCCESS_COLOR, INFO_COLOR, CAPTURE_COLOR, POKEBALL_TYPES, EVOLUTION_CHAIN
} = require('../constants');
const {
    getOrCreateUserLocal, saveUserToDb, getPokemonSpriteUrl, getPokemonDetailsFromPokeAPI,
    calculatePokemonStats, getXpForNextLevel, getSpawnablePokemons
} = require('../utils/helpers');

const wildCommandUsage = new Collection(); // Cooldown específico para o comando wild

module.exports = {
    name: 'wild',
    description: 'Tenta encontrar e capturar um Pokémon selvagem.',
    aliases: ['w'],
    async execute(message) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId, message.author); // Passa message.author

        const now = Date.now();
        const userCooldown = wildCommandUsage.get(userId);

        if (userCooldown) {
            const timeElapsed = now - userCooldown.lastReset;
            const cooldownDurationMs = WILD_COMMAND_COOLDOWN_HOURS * 60 * 60 * 1000;

            if (timeElapsed < cooldownDurationMs) {
                const timeLeft = cooldownDurationMs - timeElapsed;
                const minutesLeft = Math.floor(timeLeft / (1000 * 60));
                const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
                let timeRemaining = '';
                if (minutesLeft > 0) timeRemaining += `${minutesLeft}m `;
                timeRemaining += `${secondsLeft}s`;
                return message.reply(`Você atingiu o limite de ${WILD_COMMAND_LIMIT} usos de \`${PREFIXO}wild\` por hora. Tente novamente em ${timeRemaining}.`).catch(console.error);
            } else {
                wildCommandUsage.set(userId, { count: 0, lastReset: now });
            }
        } else {
            wildCommandUsage.set(userId, { count: 0, lastReset: now });
        }

        wildCommandUsage.get(userId).count++;
        
        // Obtenha todos os Pokémon spawnáveis (apenas formas base e Lendários/Míticos/UBs/Paradox não evoluídos)
        const spawnablePokemons = getSpawnablePokemons(POKEMONS_CAPTURAVEIS, EVOLUTION_CHAIN);
        
        if (spawnablePokemons.length === 0) {
            return message.reply('Não há Pokémon disponíveis para aparecer no momento. Informe ao administrador do bot.').catch(console.error);
        }

        // NOVIDADE: Lógica de Sorteio Ponderado de Raridade (PESOS AJUSTADOS)
        const rarityChances = [
            { rarity: 'comum', weight: 700 },      // Ex: 70%
            { rarity: 'incomum', weight: 500 },    // Ex: 50%
            { rarity: 'raro', weight: 300 },       // Ex: 30%
            { rarity: 'muito raro', weight: 200 },  // Ex: 20%
            { rarity: 'paradox', weight: 100 },      // Ex: 10%
            { rarity: 'ultra beast', weight: 50 },  // Ex: 5%
            { rarity: 'mítico', weight: 5 },       // Ex: 0.5%
            { rarity: 'lendário', weight: 10 }      // Ex: 1%
        ];
        
        let totalWeight = rarityChances.reduce((sum, r) => sum + r.weight, 0); // Soma total dos pesos (Ex: 996)
        let randomRoll = Math.random() * totalWeight; // Rola um número entre 0 e totalWeight

        let chosenRarity = null;
        for (const r of rarityChances) {
            if (randomRoll < r.weight) {
                chosenRarity = r.rarity;
                break;
            }
            randomRoll -= r.weight;
        }

        // Fallback robusto: Se por algum motivo não escolheu uma raridade, ou se a escolhida não tem Pokémon disponíveis,
        // tenta encontrar o Pokémon mais comum ou o primeiro disponível como último recurso.
        if (!chosenRarity) {
            chosenRarity = 'comum'; // Garante uma raridade inicial
        }

        let pokemonsOfChosenRarity = spawnablePokemons.filter(p => p.rarity === chosenRarity);

        // Se a raridade sorteada não tiver nenhum Pokémon disponível para spawn, tenta raridades mais comuns/genéricas.
        if (pokemonsOfChosenRarity.length === 0) {
            console.warn(`[WILD] Nenhuma Pokémon da raridade '${chosenRarity}' disponível para spawn. Tentando raridade fallback.`);
            // Tenta achar qualquer um na ordem inversa de raridadeChances (do mais comum para o mais raro)
            const fallbackRarities = [...rarityChances].reverse(); // Cria uma cópia e inverte
            for (const r of fallbackRarities) {
                pokemonsOfChosenRarity = spawnablePokemons.filter(p => p.rarity === r.rarity);
                if (pokemonsOfChosenRarity.length > 0) {
                    chosenRarity = r.rarity; // Atualiza para a raridade que de fato encontrou
                    break;
                }
            }
            // Se ainda assim não encontrou (improvável com a lista completa), pega qualquer spawnable
            if (pokemonsOfChosenRarity.length === 0 && spawnablePokemons.length > 0) {
                 pokemonsOfChosenRarity = spawnablePokemons;
                 chosenRarity = 'comum'; // Força para comum se não tiver mais opções
            } else if (spawnablePokemons.length === 0) {
                return message.reply('Nenhum Pokémon disponível para aparecer no momento, mesmo após fallback. Informe ao administrador do bot.').catch(console.error);
            }
        }


        // Finalmente, escolhe um Pokémon aleatório da raridade sorteada/fallback
        const pokemonSelvagem = pokemonsOfChosenRarity[Math.floor(Math.random() * pokemonsOfChosenRarity.length)];
        const baseChance = CHANCE_DE_CAPTURA_BASE[pokemonSelvagem.rarity]; // Usa a chance base da raridade REAL do Pokémon


        const isShiny = Math.random() < SHINY_CHANCE;
        const pokemonSpriteUrl = getPokemonSpriteUrl(pokemonSelvagem.id, isShiny);
        const wildPokemonLevel = Math.floor(Math.random() * 99) + 1;

        let pokemonDetails;
        try {
            pokemonDetails = await getPokemonDetailsFromPokeAPI(pokemonSelvagem.id);
        } catch (error) {
            console.error('[BOT] Erro ao obter detalhes da PokeAPI para WILD:', error);
            pokemonDetails = { type1: 'Desconhecido', type2: null, height: 'N/A', weight: 'N/A', abilities: ['Desconhecidas'], gender: 'Unknown' };
        }
        const pokemonTypes = pokemonDetails.type2 ? `${pokemonDetails.type1}/${pokemonDetails.type2}` : pokemonDetails.type1;
        
        const embedColor = TYPE_COLORS[pokemonDetails.type1] || '#808080';
        if (isShiny) {
            embedColor = '#FFD700'; 
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('capture_yes')
                    .setLabel('Sim')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('✅'),
                new ButtonBuilder()
                    .setCustomId('capture_no')
                    .setLabel('Não')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('❌'),
            );

        const wildEmbed = new EmbedBuilder()
            .setColor(CAPTURE_COLOR)
            .setTitle(`Um ${pokemonSelvagem.name}${isShiny ? ' ✨SHINY✨' : ''} selvagem apareceu!`)
            .setDescription(`**Nível:** ${wildPokemonLevel}\n**Tipo:** ${pokemonTypes}\n**Raridade:** ${pokemonSelvagem.rarity.toUpperCase()}${isShiny ? ' (Lendário Shiny!)' : ''}\n**Chance de Captura Base:** ${baseChance}%`)
            .setImage(pokemonSpriteUrl) 
            .setThumbnail('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png') 
            .setFooter({ text: `Treinador ${message.author.username}, quer tentar capturá-lo? Clique em 'Sim' ou 'Não'.` });

        const replyMsg = await message.channel.send({ embeds: [wildEmbed], components: [row] }).catch(console.error);

        const COLLECTOR_TIME = 50000;

        const collector = replyMsg.createMessageComponentCollector({ 
            filter: i => i.user.id === message.author.id, 
            time: COLLECTOR_TIME,
            max: 1 
        });

        collector.on('collect', async i => {
            if (i.customId === 'capture_no') {
                collector.stop('declined');
                const fleeEmbed = new EmbedBuilder()
                    .setColor(INFO_COLOR) 
                    .setTitle(`O ${pokemonSelvagem.name} fugiu!`)
                    .setDescription(`Você decidiu não tentar capturar o ${pokemonSelvagem.name}. Ele escapou para a floresta...`)
                    .setThumbnail(pokemonSpriteUrl)
                    .setFooter({ text: 'Talvez na próxima vez!' });
                return await i.update({ embeds: [fleeEmbed], components: [] }).catch(console.error); 
            }

            collector.stop('accepted'); 

            const availableBalls = Object.keys(POKEBALL_TYPES).filter(ballType => user[ballType] > 0);
            if (availableBalls.length === 0) {
                const noBallsEmbed = new EmbedBuilder()
                    .setColor(ERROR_COLOR) 
                    .setTitle('Sem Pokébolas!')
                    .setDescription(`Treinador ${message.author.username}, você não tem nenhuma Pokébola!`)
                    .addFields(
                        { name: 'Onde conseguir?', value: `Compre mais na loja com \`${PREFIXO}shop\` ou colete sua recompensa diária com \`${PREFIXO}daily}\`.` }
                    )
                    .setFooter({ text: 'O Pokémon selvagem fugiu.' });
                return await i.update({ embeds: [noBallsEmbed], components: [] }).catch(console.error);
            }

            const ballOptions = availableBalls.map(ballType => 
                `${POKEBALL_TYPES[ballType].emoji} \`${ballType}\` (${POKEBALL_TYPES[ballType].displayName}: ${user[ballType]})`
            ).join('\n'); 

            const chooseBallEmbed = new EmbedBuilder()
                .setColor(embedColor) 
                .setTitle(`Escolha sua Pokébola para ${pokemonSelvagem.name}${isShiny ? ' ✨SHINY✨' : ''}!`)
                .setDescription(`Você tem:\n${ballOptions}\n\nClique no botão da Pokébola que você quer usar:`)
                .setThumbnail(pokemonSpriteUrl)
                .setFooter({ text: 'Decida rápido, o Pokémon não vai esperar para sempre!' });

            const ballButtonsRow = new ActionRowBuilder();
            availableBalls.forEach(ballType => {
                ballButtonsRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`choose_ball_${ballType}`)
                        .setLabel(`${POKEBALL_TYPES[ballType].displayName} (${user[ballType]})`) 
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(POKEBALL_TYPES[ballType].emoji)
                );
            });

            await i.update({ embeds: [chooseBallEmbed], components: [ballButtonsRow] }).catch(console.error); 

            const ballCollector = replyMsg.createMessageComponentCollector({ 
                filter: res => res.user.id === message.author.id && res.customId.startsWith('choose_ball_'), 
                time: COLLECTOR_TIME, 
                max: 1 
            });

            ballCollector.on('collect', async ballInteraction => {
                const chosenBallType = ballInteraction.customId.replace('choose_ball_', '');
                const chosenBall = POKEBALL_TYPES[chosenBallType];

                if (!chosenBall) { 
                    return await ballInteraction.update({ content: `Erro interno: Tipo de Pokébola inválido no botão.`, embeds: [], components: [] }).catch(console.error);
                }

                user[chosenBallType]--; 
                saveUserToDb(userId, user); 

                let captureMultiplierBonus = chosenBall.captureMultiplier;
                let specialBallMessage = '';

                if (chosenBall.specialMultiplier) {
                    if (chosenBall.specialMultiplier['ultra beast'] && pokemonSelvagem.rarity === 'ultra beast') {
                        captureMultiplierBonus *= chosenBall.specialMultiplier['ultra beast'];
                        specialBallMessage += ` (Bônus de Beast Ball contra Ultra Beast!)`;
                    }
                    if (chosenBall.specialMultiplier['comum'] && pokemonSelvagem.rarity === 'comum' && chosenBall.condition && chosenBall.condition(pokemonSelvagem)) {
                         captureMultiplierBonus *= chosenBall.specialMultiplier['comum'];
                         specialBallMessage += ` (Bônus de Fast Ball contra Comum!)`;
                    }
                    if (chosenBall.specialMultiplier['incomum'] && pokemonSelvagem.rarity === 'incomum' && chosenBall.condition && chosenBall.condition(pokemonSelvagem)) {
                         captureMultiplierBonus *= chosenBall.specialMultiplier['incomum'];
                         specialBallMessage += ` (Bônus de Fast Ball contra Incomum!)`;
                    }
                    if (chosenBall.specialMultiplier['night_time'] && chosenBall.condition && chosenBall.condition()) {
                         captureMultiplierBonus *= chosenBall.specialMultiplier['night_time'];
                         specialBallMessage += ` (Bônus de Dusk Ball durante a noite!)`;
                    }
                }

                if (isShiny) {
                    captureMultiplierBonus *= 1.5; 
                    specialBallMessage += ` (Bônus Shiny!)`;
                }

                const finalChance = Math.min(100, baseChance * captureMultiplierBonus); 
                let capturado = Math.random() * 100 < finalChance;

                if (chosenBallType === 'master_ball') {
                    capturado = true;
                    specialBallMessage = ` (Captura garantida pela Master Ball!)`;
                }

                const captureResultEmbed = new EmbedBuilder()
                    .setTitle(`Tentando Capturar ${pokemonSelvagem.name}${isShiny ? ' ✨SHINY✨' : ''}...`)
                    .setDescription(`Você usou uma **${chosenBall.displayName}** ${chosenBall.emoji}! Sua chance de captura é de **${finalChance.toFixed(0)}%**.`)
                    .setThumbnail(pokemonSpriteUrl);

                if (capturado) {
                    const remnantsGained = Math.floor(Math.random() * 100) + 100;
                    if (isShiny) { 
                        const shinyBonus = Math.floor(remnantsGained * 3);
                        user.remnants += shinyBonus;
                    }
                    user.remnants += remnantsGained; 
                    
                    const pokemonStats = calculatePokemonStats(wildPokemonLevel, pokemonSelvagem.rarity);

                    const newPokemon = { 
                        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
                        name: pokemonSelvagem.name,
                        sprite_id: pokemonSelvagem.id,
                        level: wildPokemonLevel, 
                        rarity: pokemonSelvagem.rarity,
                        is_shiny: isShiny, 
                        type1: pokemonDetails.type1, 
                        type2: pokemonDetails.type2,
                        height: pokemonDetails.height,
                        weight: pokemonDetails.weight,
                        abilities: pokemonDetails.abilities,
                        gender: pokemonDetails.gender,
                        max_hp: pokemonStats.max_hp,    
                        current_hp: pokemonStats.current_hp, 
                        attack: pokemonStats.attack,
                        level_xp: 0 
                    };

                    // Efeitos Pós-Captura
                    if (chosenBall.effect === 'heal_on_capture') {
                        newPokemon.current_hp = newPokemon.max_hp;
                        specialBallMessage += `\n(Seu Pokémon foi curado completamente pela Heal Ball!)`;
                    }
                    let xpBonusMessage = '';
                    if (chosenBall.effect === 'xp_bonus_on_capture') {
                        const luxuryXpBonus = Math.floor(xpGained * 0.5);
                        newPokemon.level_xp += luxuryXpBonus;
                        xpBonusMessage = `\n(Recebeu +${luxuryXpBonus} XP bônus da Luxury Ball!)`;
                    }


                    user.pokemons_captured.push(newPokemon);

                    const xpGained = Math.floor(pokemonSelvagem.rarity === 'lendário' ? 200 : (pokemonSelvagem.rarity === 'muito raro' ? 100 : (pokemonSelvagem.rarity === 'raro' ? 50 : 25)));
                    user.xp += xpGained;

                    let levelUpMessage = '';
                    let xpNeededForNextLevel = getXpForNextLevel(user.level);
                    while (user.xp >= xpNeededForNextLevel) {
                        user.level++;
                        user.xp -= xpNeededForNextLevel; 
                        xpNeededForNextLevel = getXpForNextLevel(user.level); 
                        levelUpMessage += `\n⬆️ ${message.author.username} subiu para o **Nível ${user.level}**! 🎉`;
                    }
                    if (levelUpMessage || xpBonusMessage) {
                        captureResultEmbed.addFields(
                            { name: 'Progressão do Treinador', value: `\`+${xpGained}\` XP!${levelUpMessage}${xpBonusMessage}`, inline: false }
                        );
                    } else {
                        captureResultEmbed.addFields(
                            { name: 'Progressão do Treinador', value: `\`+${xpGained}\` XP! (${user.xp}/${xpNeededForNextLevel})`, inline: false }
                        );
                    }

                    saveUserToDb(userId, user); 

                    captureResultEmbed
                        .setColor(SUCCESS_COLOR) 
                        .setDescription(`🎉 Parabéns, Treinador ${message.author.username}! Você capturou um **${pokemonSelvagem.name}${isShiny ? ' ✨SHINY✨' : ''}**!${specialBallMessage}`)
                        .addFields(
                            { name: 'Remnants Ganhos', value: `\`${remnantsGained}\` 💎`, inline: true }, 
                            { 
                                name: 'Pokébolas Restantes', 
                                value: Object.keys(POKEBALL_TYPES).map(ballKey => {
                                    const ball = POKEBALL_TYPES[ballKey];
                                    return `${ball.emoji} \`${ball.displayName}\`: \`${user[ballKey]}\``;
                                }).join(' | ')
                            }
                        )
                        .setImage(pokemonSpriteUrl)
                        .setFooter({ text: 'Adicionado à sua coleção!' });

                    await ballInteraction.update({ embeds: [captureResultEmbed], components: [] }).catch(console.error); 
                    console.log(`${ballInteraction.user.tag} capturou um ${pokemonSelvagem.name} com uma ${chosenBall.displayName}. Ganhou ${remnantsGained} Remnants e ${xpGained} XP.`);

                } else {
                    saveUserToDb(userId, user); 
                    captureResultEmbed
                        .setColor(ERROR_COLOR) 
                        .setDescription(`💔 Que pena, Treinador ${ballInteraction.user.username}! O **${pokemonSelvagem.name}${isShiny ? ' ✨SHINY✨' : ''}** fugiu!${specialBallMessage}`)
                        .addFields(
                            { 
                                name: 'Pokébolas Restantes', 
                                value: Object.keys(POKEBALL_TYPES).map(ballKey => {
                                    const ball = POKEBALL_TYPES[ballKey];
                                    return `${ball.emoji} \`${ball.displayName}\`: \`${user[ballKey]}\``;
                                }).join(' | ')
                            }
                        )
                        .setFooter({ text: 'Mais sorte na próxima vez!' });

                    await ballInteraction.update({ embeds: [captureResultEmbed], components: [] }).catch(console.error); 
                    console.log(`${ballInteraction.user.tag} falhou ao capturar um ${pokemonSelvagem.name} com uma ${chosenBall.displayName}.`);
                }
                ballCollector.stop(); 
            });

            ballCollector.on('end', async (collected, reason) => {
                if (reason === 'time' || reason === 'declined_ball' || reason === 'channelDelete' || reason === 'guildDelete') {
                    const currentMessage = await message.channel.messages.fetch(replyMsg.id);
                    if (currentMessage.components.length > 0) {
                        const finalEmbed = new EmbedBuilder(currentMessage.embeds[0].toJSON());
                        finalEmbed.setFooter({ text: 'Interação encerrada.' });
                        await replyMsg.edit({ embeds: [finalEmbed], components: [] }).catch(console.error); 
                    }
                }
            });
        });

        collector.on('end', async (collected, reason) => {
            if (reason === 'time' || reason === 'channelDelete' || reason === 'guildDelete') {
                const currentMessage = await message.channel.messages.fetch(replyMsg.id);
                if (currentMessage.components.length > 0) {
                    const timeoutEmbed = new EmbedBuilder(currentMessage.embeds[0].toJSON());
                    timeoutEmbed.setTitle('Tempo Esgotado! ⏰');
                    timeoutEmbed.setDescription(`Você demorou demais para responder. O ${pokemonSelvagem.name} fugiu!`); 
                    timeoutEmbed.setFooter({ text: 'Seja mais rápido na próxima!' });
                    await replyMsg.edit({ embeds: [timeoutEmbed], components: [] }).catch(console.error); 
                }
            }
        });
    }
};