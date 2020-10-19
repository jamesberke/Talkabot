const { BotkitConversation } = require("botkit");
const rawData = require('./src/rawData')
const { email, phone, portfolioURL, linkedInURL, firstName, lastName } = rawData.contactInformation;


module.exports = function (controller) {

    controller.hears(['contact', 
                        'email', 
                        'phone', 
                        'name', 
                        'portfolio'], ['message', 'direct_message'], async (bot, message) => {
        const myName = `${firstName} ${lastName}`
        

        await bot.reply(message, { type: 'typing' });

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: `Phone: <Strong>${phone}</Strong>` });
            await bot.reply(message, { type: 'typing' });
        }, 1000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: `Email: <Strong>${email}</Strong>` });
            await bot.reply(message, { type: 'typing' });
        }, 2000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: `Portfolio: <a href="${portfolioURL}" target="_blank">${portfolioURL}</a>` });
            await bot.reply(message, { type: 'typing' });
        }, 4000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, {
                text: `LinkedIn: <a href="${linkedInURL}" target="_blank">${linkedInURL}</a>`,
                quick_replies: [{
                    title: "Let's move on",
                    payload: "Let's move on"
                }]
            });
        }, 6000);

    });
    
};