const TelegramBot = require('node-telegram-bot-api');
const token = '5505120300:AAEELFnC4KpXvhFe--4eIwSy6b5Am74a6PA';
const bot = new TelegramBot(token, {
    polling: true
});
const usersData = [];

bot.onText(/Антидрочер, старт/, async (msg) => {
    let userId = msg.from.id;
    let chatId = msg.chat.id;
    let userData = await findUserDataByUserId(userId, usersData);

    console.log(userData);
    if(userData == undefined) {
        usersData.push({
            userId,
            milliseconds: Date.now()
        });

        bot.sendMessage(msg.chat.id, 'Ок');
    }
    else {
        bot.sendMessage(chatId, 'Ошибка!');
    }
});

async function findUserDataByUserId(userId, usersData) {
    let userData;

    usersData.forEach(el => {
        if(el.userId == userId) {
            userData = el;
        };
    });

    return userData;
}