// commands/setpokemon.js

const { EmbedBuilder } = require('discord.js');
const { PREFIXO, SUCCESS_COLOR, ERROR_COLOR } = require('../constants');
const { getOrCreateUserLocal, saveUserToDb } = require('../utils/helpers');

module.exports = {
    name: 'setpokemon',
    description: 'Define o seu Pokémon principal para as batalhas 1x1.',
    async execute(message, args) {
        const userId = message.author.id;
        const user = getOrCreateUserLocal(userId);

        if (!args.length || isNaN(parseInt(args[0]))) {
            // Se nenhum argumento for fornecido ou não for um número
            const currentActivePokemonId = user.active_pokemon_id; // Novo campo
            let currentActivePokemonName = 'Nenhum';

            if (currentActivePokemonId) {
                const activePokemon = user.pokemons_captured.find(p => p.id === currentActivePokemonId);
                if (activePokemon) {
                    currentActivePokemonName = `**${activePokemon.name}** (Lv.${activePokemon.level})`;
                }
            }
            return message.reply(`Uso correto: \`${PREFIXO}setpokemon [número_do_seu_Pokémon]\`.\nSeu Pokémon ativo atual: ${currentActivePokemonName}\nUse \`${PREFIXO}mypokemon\` para ver os números dos seus Pokémon.`);
        }

        const pokemonIndex = parseInt(args[0]) - 1; // -1 porque a lista é 0-indexed

        if (isNaN(pokemonIndex) || pokemonIndex < 0 || pokemonIndex >= user.pokemons_captured.length) {
            return message.reply(`Você não possui um Pokémon com o número #${args[0]}. Use \`${PREFIXO}mypokemon\` para ver os números válidos.`);
        }

        const selectedPokemon = user.pokemons_captured[pokemonIndex];

        if (selectedPokemon.current_hp <= 0) {
            return message.reply(`**${selectedPokemon.name}** está desmaiado e não pode ser definido como seu Pokémon ativo. Use \`${PREFIXO}heal\` para curá-lo.`);
        }

        // Atualiza o novo campo para o Pokémon ativo
        user.active_pokemon_id = selectedPokemon.id;
        saveUserToDb(userId, user);

        const setPokemonEmbed = new EmbedBuilder()
            .setColor(SUCCESS_COLOR)
            .setTitle('✅ Pokémon Ativo Definido! ✅')
            .setDescription(`Seu Pokémon ativo para as batalhas agora é: **${selectedPokemon.name}${selectedPokemon.is_shiny ? ' ✨' : ''}** (Lv.${selectedPokemon.level})`)
            .setFooter({ text: 'Prepare-se para o combate 1x1!' })
            .setTimestamp();

        message.channel.send({ embeds: [setPokemonEmbed] }).catch(console.error);
        console.log(`${message.author.tag} definiu ${selectedPokemon.name} como seu Pokémon ativo.`);
    },
};