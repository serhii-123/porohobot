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

    if(userData == undefined) {
        usersData.push({
            userId,
            milliseconds: Date.now()
        });

        bot.sendMessage(chatId, 'Данные записаны');
    }
    else {
        bot.sendMessage(chatId, 'Ошибка!');
    }
    console.log(usersData);
});

bot.onText(/Антидрочер, сброс/, async (msg) => {
    let userId = msg.from.id;
    let chatId = msg.chat.id;
    let userData = await findUserDataByUserId(userId, usersData);

    if(userData == undefined) {
        bot.sendMessage(chatId, 'Ошибка!');
    } else {
        await resetTime(userId, usersData);
        bot.sendMessage(chatId, 'Готово!');
    }
    console.log(usersData);
});

bot.onText(/Антидрочер, дни/, (msg) => {
    let userId = msg.from.id;
    let chatId = msg.chat.id;

    //ось тут треба доробити
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

async function resetTime(userId, usersData) {
    let userData = await findUserDataByUserId(userId, usersData);
    console.log(userData);

    userData.milliseconds = Date.now();
    console.log(userData.milliseconds);
}