const rawData = require('./src/rawData')

module.exports = function(controller) {
    controller.on('welcome_back', async(bot, message) => {
        const { firstName, openToJob } = rawData.contactInformation
        const jobOpportunity = openToJob ? `<strong>${firstName}</strong> is currently <strong>open</strong> to a new opportunity` : `${firstName} is not curently looking for an opportunity`
        await bot.reply(message, `Hi there, my name is <strong>${firstName}</strong>`)
        await bot.reply(message, `${jobOpportunity}`)
        await bot.reply(message, { 
            text: `To learn more about me, click one of the buttons below or type <strong>#Contact, #JobHistory, #Experience, #TechStack, etc.</strong>`,
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
    })
}

