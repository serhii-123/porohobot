const TelegramBot = require('node-telegram-bot-api');
const token = '5829327319:AAHp6mSLE4A3Y7ZJMm1ogp5YvlBCG9LzY4M';
const phrases = require('./phrases.json');
const getRandomElement = require('./getRandomElement');
const bot = new TelegramBot(token, {
    polling: true
});


bot.onText(/зеля|зеленський|зеля|зелі|зеленский|зеле|зели|зелю/i, async (msg) => {
    let chatId = msg.chat.id;
    let randomPhrase = getRandomElement(phrases);

    bot.sendMessage(chatId, randomPhrase);
});

bot.onText(/\/start/, async (msg) => {
    let chatId = msg.chat.id;
    let message = 'Привіт, я порохобот\nЯ реагую на деякі слова та надсилаю смішні пасти\nДля відправки паст у чатах використовуйте наступну команду: @poroh0_bot паста'
    bot.sendMessage(chatId, message);
});

bot.on('inline_query', async (query) => {
    let queryText = query.query;
    let phrase = getRandomElement(phrases);
    let arrForAnswer = [{
        id: '0',
        type: 'article',
        title: 'Порохоботська паста',
        description: '',
        message_text: phrase
    }];

    if(queryText == 'паста') {
        bot.answerInlineQuery(query.id, arrForAnswer, {
            cache_time: 0
        });
    }
});

bot.on('polling_error', console.log);