// app.js

// Carrega as variáveis de ambiente do .env ANTES de qualquer outra coisa
// Esta linha deve ser a PRIMEIRA a ser executada em todo o seu projeto.
require('dotenv').config();

// Agora, carrega o arquivo principal do bot e o executa
const startBot = require('./bot');

// Obtém o token do BOT_TOKEN do .env (process.env estará preenchido agora)
const BOT_TOKEN = process.env.BOT_TOKEN;

// Verifica se o token foi carregado
if (!BOT_TOKEN) {
    console.error("ERRO CRÍTICO: BOT_TOKEN não encontrado no arquivo .env!");
    console.error("Certifique-se de que seu arquivo .env está na raiz do projeto e contém BOT_TOKEN=SEU_TOKEN");
    process.exit(1); // Encerra o processo se o token não for encontrado
}

// Inicia o bot passando o token explicitamente.
// A função exportada por bot.js é chamada aqui.
startBot(BOT_TOKEN);

console.log("Aplicação iniciada. Aguardando login do bot...");