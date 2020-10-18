const { BotkitConversation } = require("botkit");
const rawData = require('./src/rawData')
const { contactInformation } = rawData.contactInformation;


module.exports = function (controller) {

    controller.hears('conact', ['message', 'direct_message'], async (bot, message) => {

        await bot.reply(message, { type: 'typing' });

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, {
                text: 'Would you like to learn more about one of these schools?',
                quick_replies: [{
                    title: 'App Academy',
                    payload: 'App Academy'
                },
                {
                    title: 'City College of San Francisco',
                    payload: 'City College of San Francisco'
                },
                {
                    title: "Let's move on",
                    payload: "Let's move on"
                }]
            });
        }, 1000);

    });
    
};