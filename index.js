const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = '5829327319:AAHp6mSLE4A3Y7ZJMm1ogp5YvlBCG9LzY4M';
const answerArrWithPasts = require('./answerArrWithPasts.json');
const answerArrWithStickers = require('./answerArrWithStickers.json');
const getRandomElement = require('./getRandomElement');
const bot = new TelegramBot(token, {
    polling: true
});



bot.onText(/\/start/, async (msg) => {
    let chatId = msg.chat.id;
    let message = 'Привіт, я порохобот\nЯ реагую на деякі слова та надсилаю смішні пасти'
                + '\nДля відправки паст у чатах використовуйте наступну команду: @poroh0_bot пасти'
                + '\nДля відправки стікерів у чатах використовуйте наступну команду: @poroh0_bot стікери';
    
    bot.sendMessage(chatId, message);
});

bot.onText(/зеля|зеленський|зеля|зелі|зеленский|зеле|зели|зелю/i, async (msg) => {
    let chatId = msg.chat.id;
    let randomPhrase = getRandomElement(phrases);

    bot.sendMessage(chatId, randomPhrase);
});

bot.on('inline_query', async (query) => {
    let queryText = query.query;

    switch(queryText) {
        case 'пасти':
            bot.answerInlineQuery(query.id, answerArrWithPasts, {
                cache_time: 0
            });
            break;
        case 'стікери':
            bot.answerInlineQuery(query.id, answerArrWithStickers, {
                cache_time: 0
            });
            break;
    }
});

bot.on('polling_error', console.log);