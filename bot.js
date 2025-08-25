// bot.js

// Carrega as variáveis de ambiente do file .env
require('dotenv').config();

// Importa as classes necessárias da biblioteca discord.js
const { Client, GatewayIntentBits, Collection, ChannelType, EmbedBuilder } = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// --- Importa todas as constantes do arquivo centralizado ---
const constants = require('./constants');
const { PREFIXO, SUCCESS_COLOR } = constants;

// --- Importa Funções Auxiliares (Helpers) ---
const { 
    getOrCreateUserLocal
} = require('./utils/helpers');


// === CONFIGURAÇÃO DO LOWDB PARA PERSISTÊNCIA ===
const adapter = new FileSync('db.json');
const database = low(adapter);

// Inicializa o banco de dados com valores padrão se estiver vazio
database.defaults({
    usersData: {},
    guildSettings: {} 
}).write();

// Cria uma nova instância do cliente Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// Coleção para armazenar os comandos carregados
client.commands = new Collection();

// --- Carrega os Comandos da Pasta 'commands/' ---
const commandFiles = [
    'ping.js', 'hello.js', 'setchannel.js', 'wild.js', 'mypokemon.js', 'viewpokemon.js',
    'evolve.js', 'heal.js', 'battle.js', 'setpokemon.js',
    'daily.js', 'balance.js', 'shop.js', 'buy.js', 'ranking.js', 'items.js', 
    'help.js' , 'profile.js'
];

for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        if (command.aliases) {
            command.aliases.forEach(alias => client.commands.set(alias, command));
        }
    } catch (error) {
        console.error(`[ERRO DE CARREGAMENTO] Não foi possível carregar o comando ${file}:`, error);
    }
}


// Evento que é disparado quando o bot está pronto e online
client.once('ready', () => {
    console.log(`Pronto! Logado como ${client.user.tag}`);
    console.log(`Bot PokéClash&Catch autônomo está pronto! Prefixo: ${PREFIXO}`);
});

// Evento quando o bot é adicionado a um servidor
client.on('guildCreate', async guild => {
    console.log(`[GUILD] O bot foi adicionado ao servidor: ${guild.name} (ID: ${guild.id})`);
    
    const defaultChannel = guild.channels.cache.find(
        channel => channel.type === ChannelType.GuildText && 
                   channel.permissionsFor(guild.members.me).has('SendMessages')
    );

    if (defaultChannel) {
        const welcomeEmbed = new EmbedBuilder()
            .setColor(SUCCESS_COLOR)
            .setTitle('👋 Olá, Treinadores! Eu sou o PokéClash&Catch Bot! 👋')
            .setDescription('Para começar, um administrador precisa definir o canal onde os comandos do bot serão usados.')
            .addFields(
                {
                    name: 'Passo 1: Definir Canal Oficial',
                    value: `Um administrador (com a permissão "Administrador") deve usar:\n\`${PREFIXO}setchannel #nomedocanal-aqui\``,
                    inline: false
                },
                {
                    name: 'Passo 2: Ver Comandos',
                    value: `Após definir o canal, digitem \`${PREFIXO}help\` para ver a lista de comandos para os jogadores.`,
                    inline: false
                }
            )
            .setFooter({ text: 'Aproveitem a aventura Pokémon!' })
            .setTimestamp();
        
        defaultChannel.send({ embeds: [welcomeEmbed] }).catch(console.error);
    }
});


// Evento que é disparado quando o bot recebe uma mensagem
client.on('messageCreate', async message => {
    if (!message.guild || message.author.bot || !message.content.startsWith(PREFIXO)) {
        return;
    }

    const args = message.content.slice(PREFIXO.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const userId = message.author.id;
    // CORREÇÃO AQUI: Passa message.author para getOrCreateUserLocal
    const user = getOrCreateUserLocal(userId, message.author); 

    await database.read();
    const guildSettings = database.get(`guildSettings.${message.guild.id}`).value();
    const allowedChannelId = guildSettings ? guildSettings.allowedChannelId : null;

    if (commandName === 'setchannel') {
        const setChannelCommand = client.commands.get('setchannel');
        if (setChannelCommand) {
            try {
                await setChannelCommand.execute(message, args, client);
            } catch (error) {
                console.error(`[ERRO] Comando ${commandName}:`, error);
                message.reply('Houve um erro ao tentar executar este comando! Contate o administrador.').catch(console.error);
            }
        }
        return;
    }

    if (allowedChannelId && message.channel.id !== allowedChannelId) {
        return; 
    }

    const command = client.commands.get(commandName);

    if (!command) return;

    if (command.adminOnly) {
        if (!message.member || !message.member.permissions.has('Administrator')) {
            return message.reply('Você não tem permissão para usar este comando de administração.').catch(console.error);
        }
    }

    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(`[ERRO] Comando ${commandName}:`, error);
        message.reply('Houve um erro ao tentar executar este comando! Contate o administrador.').catch(console.error);
    }
});

module.exports = (botToken) => {
    client.login(botToken).catch(err => {
        console.error("ERRO FATAL: Falha ao fazer login no Discord com o token fornecido.", err);
        process.exit(1);
    });
};