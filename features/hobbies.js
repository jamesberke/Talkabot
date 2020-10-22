const rawData = require('./src/rawData');
const { hobbies } = rawData;

module.exports = function (controller) {

    controller.hears(['hobbies', 'hobby'], ['message', 'direct_message'], async (bot, message) => {

        await bot.reply(message, { type: 'typing' });

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: `<strong>${hobbies.one.title}: </strong> ${hobbies.one.description}` });
            await bot.reply(message, { type: 'typing' });
        }, 1000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: `<strong>${hobbies.two.title}: </strong> ${hobbies.two.description}` });
            await bot.reply(message, { type: 'typing' });
        }, 3000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: `<strong>${hobbies.three.title}: </strong> ${hobbies.three.description}` });
            await bot.reply(message, { type: 'typing' });
        }, 5000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, {
                text: `<strong>${hobbies.four.title}: </strong> ${hobbies.four.description}`,
                quick_replies: [{
                    title: "Let's move on",
                    payload: "Let's move on"
                }]
            });
        }, 8000);

    });

};