const TelegramBot = require('node-telegram-bot-api');
const token = '';
const answerArr = require('./answerArr.json');
const phrases = require('./phrases.json');
const getRandomElement = require('./getRandomElement');
const bot = new TelegramBot(token, {
    polling: true
});



bot.onText(/\/start/, async (msg) => {
    let chatId = msg.chat.id;
    let message = 'Привіт, я порохобот\nЯ реагую на деякі слова та надсилаю смішні пасти';
    
    bot.sendMessage(chatId, message);
});

bot.onText(/зеля|зеленський|зеленського|зеленському|зеленським|зеленский|зеленского|зеленскому|зеленским/i, async (msg) => {
    let chatId = msg.chat.id;
    let randomPhrase = getRandomElement(phrases);

    bot.sendMessage(chatId, randomPhrase);
});

bot.on('inline_query', async (query) => {
    bot.answerInlineQuery(query.id, answerArr, {
        cache_time: 0
    });
});

bot.on('polling_error', console.log);