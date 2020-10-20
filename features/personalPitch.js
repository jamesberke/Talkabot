const rawData = require('./src/rawData');
const { personalPitch } = rawData;

module.exports = function (controller) {

    controller.hears('tell me about yourself', ['message', 'direct_message'], async (bot, message) => {
            const myName = `${firstName} ${lastName}`


            await bot.reply(message, { type: 'typing' });

            setTimeout(async () => {
                await bot.changeContext(message.reference);
                await bot.reply(message, { text: `${personalPitch.one}` });
                await bot.reply(message, { type: 'typing' });
            }, 1000);

            setTimeout(async () => {
                await bot.changeContext(message.reference);
                await bot.reply(message, { text: `${personalPitch.two}` });
                await bot.reply(message, { type: 'typing' });
            }, 3000);

            setTimeout(async () => {
                await bot.changeContext(message.reference);
                await bot.reply(message, { text: `${personalPitch.three}` });
                await bot.reply(message, { type: 'typing' });
            }, 5000);

            setTimeout(async () => {
                await bot.changeContext(message.reference);
                await bot.reply(message, {
                    text: `${personalPitch.four}`,
                    quick_replies: [{
                        title: "Let's move on",
                        payload: "Let's move on"
                    }]
                });
            }, 8000);

        });

};