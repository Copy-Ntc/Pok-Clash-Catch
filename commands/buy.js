// commands/buy.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, ERROR_COLOR, SUCCESS_COLOR, POKEBALL_TYPES, EVOLUTION_STONES, OTHER_ITEMS } = require('../constants');
const { getOrCreateUserLocal, saveUserToDb } = require('../utils/helpers');

// NOVIDADE: Mapeamento de aliases otimizado e expandido para maior flexibilidade na digitação.
// As chaves são a forma "normalizada" (minúsculas, sem espaços/hífens) da entrada do usuário,
// e os valores são as chaves internas (com underscore) usadas no código.
const ITEM_ALIASES = {
    // Pokébolas
    'pokeball': 'pokeball', 'pokebola': 'pokeball', 'poke ball': 'pokeball',
    'greatball': 'greatball', 'greatbola': 'greatball', 'great ball': 'greatball',
    'ultraball': 'ultraball', 'ultrabola': 'ultraball', 'ultra ball': 'ultraball',
    'masterball': 'master_ball', 'masterbola': 'master_ball', 'master ball': 'master_ball',
    'beastball': 'beast_ball', 'beastbola': 'beast_ball', 'beast ball': 'beast_ball',
    'fastball': 'fast_ball', 'fastbola': 'fast_ball', 'fast ball': 'fast_ball',
    'duskball': 'dusk_ball', 'duskbola': 'dusk_ball', 'dusk ball': 'dusk_ball',
    'healball': 'heal_ball', 'healbola': 'heal_ball', 'heal ball': 'heal_ball',
    'luxuryball': 'luxury_ball', 'luxurybola': 'luxury_ball', 'luxury ball': 'luxury_ball',

    // Pedras de Evolução (adicionado variações sem underscore e com espaços)
    'firestone': 'fire_stone', 'fire stone': 'fire_stone', 'pedrafogo': 'fire_stone', 'pedra fogo': 'fire_stone',
    'waterstone': 'water_stone', 'water stone': 'water_stone', 'pedraagua': 'water_stone', 'pedra agua': 'water_stone',
    'thunderstone': 'thunder_stone', 'thunder stone': 'thunder_stone', 'pedratrovao': 'thunder_stone', 'pedra trovao': 'thunder_stone',
    'leafstone': 'leaf_stone', 'leaf stone': 'leaf_stone', 'pedrafolha': 'leaf_stone', 'pedra folha': 'leaf_stone',
    'moonstone': 'moon_stone', 'moon stone': 'moon_stone', 'pedralua': 'moon_stone', 'pedra lua': 'moon_stone',
    'sunstone': 'sun_stone', 'sun stone': 'sun_stone', 'pedrasol': 'sun_stone', 'pedra sol': 'sun_stone',
    'duskstone': 'dusk_stone', 'dusk stone': 'dusk_stone', 'pedracrepusculo': 'dusk_stone', 'pedra crepusculo': 'dusk_stone',
    'shinystone': 'shiny_stone', 'shiny stone': 'shiny_stone', 'pedrabrilho': 'shiny_stone', 'pedra brilho': 'shiny_stone',
    'dawnstone': 'dawn_stone', 'dawn stone': 'dawn_stone', 'pedraaurora': 'dawn_stone', 'pedra aurora': 'dawn_stone',
    'ovalstone': 'oval_stone', 'oval stone': 'oval_stone', 'pedraoval': 'oval_stone', 'pedra oval': 'oval_stone',
    'razorclaw': 'razor_claw', 'razor claw': 'razor_claw', 'garra navalha': 'razor_claw', 'garranavalha': 'razor_claw',
    'razorfang': 'razor_fang', 'razor fang': 'razor_fang', 'presas navalha': 'razor_fang', 'presasnavalha': 'razor_fang',
    'reapercloth': 'reaper_cloth', 'reaper cloth': 'reaper_cloth', 'pano sinistro': 'reaper_cloth', 'panosinistro': 'reaper_cloth',
    'kingsrock': 'king_s_rock', 'king rock': 'king_s_rock', 'pedra rei': 'king_s_rock', 'pedrarei': 'king_s_rock',
    'metalcoat': 'metal_coat', 'metal coat': 'metal_coat', 'revestimento metalico': 'metal_coat', 'revestimentometalico': 'metal_coat',
    'upgrade': 'upgrade', 'melhoria': 'upgrade',
    'dubiousdisc': 'dubious_disc', 'dubious disc': 'dubious_disc', 'disco duvidoso': 'dubious_disc', 'discoduvidoso': 'dubious_disc',
    'protector': 'protector', 'protetor': 'protector',
    'electirizer': 'electirizer', 'eletrizador': 'electirizer',
    'magmarizer': 'magmarizer', 'magmatizador': 'magmarizer',
    'sachet': 'sachet', 'sache': 'sachet',
    'whippeddream': 'whipped_dream', 'whipped dream': 'whipped_dream', 'doce de nata': 'whipped_dream', 'docedenata': 'whipped_dream',
    'crackedpot': 'cracked_pot', 'cracked pot': 'cracked_pot', 'vaso rachado': 'cracked_pot', 'vasorachado': 'cracked_pot',
    'chippedpot': 'chipped_pot', 'chipped pot': 'chipped_pot', 'vaso lascado': 'chipped_pot', 'vasolascado': 'chipped_pot',
    'sweetapple': 'sweet_apple', 'sweet apple': 'sweet_apple', 'maca doce': 'sweet_apple', 'macadoce': 'sweet_apple',
    'tartapple': 'tart_apple', 'tart apple': 'tart_apple', 'maca acida': 'tart_apple', 'macaacida': 'tart_apple',
    'gloriouscloak': 'glorious_cloak', 'glorious cloak': 'glorious_cloak', 'manto glorioso': 'glorious_cloak', 'mantoglorioso': 'glorious_cloak',
    'auspiciousarmor': 'auspicious_armor', 'auspicious armor': 'auspicious_armor', 'armadura auspiciosa': 'auspicious_armor', 'armaduraauspiciosa': 'auspicious_armor',
    'leaderscrest': 'leaders_crest', 'leaders crest': 'leaders_crest', 'brasao lider': 'leaders_crest', 'brasaolider': 'leaders_crest'
    
};


module.exports = {
    name: 'buy',
    description: 'Compra itens na loja (ex: !buy pokeball 5).',
    async execute(message, args) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        // NOVIDADE: Lógica de normalização da entrada do item
        // Junta todos os argumentos, exceto o último (que é a quantidade)
        let itemInputParts = args.slice(0, args.length - 1);
        let itemInputRaw = itemInputParts.join(' ').toLowerCase(); 
        
        // Se a quantidade é o único argumento, então o nome do item é o primeiro argumento
        if (args.length === 1 && !isNaN(parseInt(args[0]))) { // ex: "!buy 5" sem nome do item
            itemInputRaw = null; 
        } else if (args.length === 1) { // ex: "!buy pokeball" sem quantidade
            itemInputRaw = args[0].toLowerCase();
        } else if (args.length === 2 && !isNaN(parseInt(args[1]))) { // ex: "!buy pokeball 5"
            itemInputRaw = args[0].toLowerCase();
        } else { // ex: "!buy master ball 1"
            itemInputRaw = args.slice(0, args.length - 1).join(' ').toLowerCase();
        }

        // Remove todos os espaços e hífens da entrada para buscar nos aliases
        const itemInputNormalizedForAlias = itemInputRaw ? itemInputRaw.replace(/[-\s]/g, '') : null;
        const normalizedItemType = ITEM_ALIASES[itemInputNormalizedForAlias];

        // A quantidade é sempre o último argumento válido
        const quantity = parseInt(args[args.length - 1]); 

        if (!normalizedItemType || isNaN(quantity) || quantity <= 0) {
            const invalidBuyEmbed = new EmbedBuilder()
                .setColor(ERROR_COLOR)
                .setTitle('Erro de Compra! ❌')
                .setDescription(`Uso incorreto. Ex: \`${PREFIXO}buy pokeball 5\` ou \`${PREFIXO}buy razor claw 1\`.`)
                .addFields(
                    { name: 'Veja a loja', value: `Use \`${PREFIXO}shop\` para ver os itens disponíveis.` }
                )
                .setFooter({ text: 'Tente novamente!' });
            return message.channel.send({ embeds: [invalidBuyEmbed] }).catch(console.error);
        }

        const itemInfo = POKEBALL_TYPES[normalizedItemType] || EVOLUTION_STONES[normalizedItemType] || OTHER_ITEMS[normalizedItemType];

        if (!itemInfo) {
            const invalidItemEmbed = new EmbedBuilder()
                .setColor(ERROR_COLOR)
                .setTitle('Item Inválido! 🚫')
                .setDescription(`Não consegui encontrar o item \`${itemInputRaw}\` na loja.`) // Usa a entrada original para a mensagem de erro
                .addFields(
                    { name: 'Veja a loja', value: `Use \`${PREFIXO}shop\` para ver os itens disponíveis.` }
                )
                .setFooter({ text: 'Escolha um item válido!' });
            return message.channel.send({ embeds: [invalidItemEmbed] }).catch(console.error);
        }

        const totalCost = itemInfo.cost * quantity;

        if (user.remnants < totalCost) {
            const insufficientFundsEmbed = new EmbedBuilder()
                .setColor(ERROR_COLOR)
                .setTitle('Remnants Insuficientes! 💸')
                .setDescription(`Você precisa de \`${totalCost}\` Remnants para comprar ${quantity} ${itemInfo.displayName}(s), mas tem apenas \`${user.remnants}\`.`)
                .addFields(
                    { name: 'Como conseguir Remnants?', value: `Use \`${PREFIXO}daily\` para recompensas diárias ou \`${PREFIXO}battle\` para desafiar outros treinadores!` }
                )
                .setFooter({ text: 'Junte mais Remnants e tente novamente!' });
            return message.channel.send({ embeds: [insufficientFundsEmbed] }).catch(console.error);
        }

        user.remnants -= totalCost;
        user[normalizedItemType] = (user[normalizedItemType] || 0) + quantity;

        saveUserToDb(userId, user);

        const buyEmbed = new EmbedBuilder()
            .setColor(SUCCESS_COLOR)
            .setTitle('Compra Realizada com Sucesso! ✅')
            .setDescription(`🎉 ${message.author.username}, você comprou **${quantity} ${itemInfo.displayName}(s)** por \`${totalCost}\` Remnants!`)
            .addFields(
                { name: 'Novo Saldo de Remnants', value: `\`${user.remnants}\` 💎`, inline: true },
                {
                    name: 'Seu Inventário',
                    value: `Pokébolas & Pedras: Use \`${PREFIXO}items\`` // Apenas referencia !items agora
                    , inline: false
                }
            )
            .setFooter({ text: 'Pronto para novas aventuras!' })
            .setTimestamp();

        message.channel.send({ embeds: [buyEmbed] }).catch(console.error);
        console.log(`[BOT] ${message.author.tag} comprou ${quantity} ${normalizedItemType}.`);
    },
};