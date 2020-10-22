
module.exports = function (controller) {

    controller.hears(['hey', 'hello', 'hi', 'hey'], ['message', 'direct_message'], async (bot, message) => {

        await bot.reply(message, { type: 'typing' });

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: 'Hello' });
        }, 1000);

    });

    controller.hears('how are you', ['message', 'direct_message'], async (bot, message) => {

        await bot.reply(message, { type: 'typing' });

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: "I'm doing great! Thanks for asking" });
        }, 1000);

    });

};