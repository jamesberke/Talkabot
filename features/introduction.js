const rawData = require('./src/rawData')

module.exports = function(controller) {
    controller.on('welcome_back', async(bot, message) => {
        const { firstName, openToJob } = rawData.contactInformation
        const jobOpportunity = openToJob ? `I am currently <strong>open</strong> to new career opportunities` : `I am not curently looking for new career opportunities`
        
        await bot.reply(message, { type: 'typing' });

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, `Hi there, my name is <strong>${firstName}</strong>`)
            await bot.reply(message, { type: 'typing' });
        }, 1000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, `${jobOpportunity}`)
            await bot.reply(message, { type: 'typing' });
        }, 3000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, {
                text: `You can learn more about me by clicking one of the buttons below or type <strong>#Contact, #JobHistory, #Education, #TechStack, etc.</strong>`,
                quick_replies: [
                    {
                        title: 'Contact',
                        payload: 'Contact',
                    },
                    {
                        title: 'Education',
                        payload: 'Education',
                    },
                    {
                        title: 'JobHistory',
                        payload: 'JobHistory',
                    },
                    {
                        title: 'TechStack',
                        payload: 'TechStack',
                    }
                ]
            })
        }, 5000);    
    })
}

