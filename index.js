const TelegramBot = require('node-telegram-bot-api');
const token = '5505120300:AAEELFnC4KpXvhFe--4eIwSy6b5Am74a6PA';
const bot = new TelegramBot(token, {
    polling: true
});
const usersData = [
    
];

bot.onText(/help/, async (msg) => {
    let chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Amogus');
});

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
});

bot.onText(/Антидрочер, сутки/, async (msg) => {
    console.log('sus');
    let userId = msg.from.id;
    let chatId = msg.chat.id;
    let userData = await findUserDataByUserId(userId, usersData);

    if(userData == undefined) {
        bot.sendMessage(chatId, 'Ошибка!');
    } else {
        let {milliseconds: userMilliseconds} = userData;
        console.log(userMilliseconds);
        let difference = Date.now() - userMilliseconds;
        let days = Math.trunc(difference / 1000 / 60 / 60 / 24);
        bot.sendMessage(chatId, `Кол-во прошедших суток: ${days}`);
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

async function resetTime(userId, usersData) {
    let userData = await findUserDataByUserId(userId, usersData);

    userData.milliseconds = Date.now();
}

bot.on('polling_error', console.log);