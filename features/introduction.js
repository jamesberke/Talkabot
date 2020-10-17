const rawData = require('./src/rawData')

module.exports = function(controller) {
    controller.on('welcome_back', async(bot, message) => {
        const { firstName, openToJob } = rawData.contactInformation
        const jobOpportunity = openToJob ? `<strong>${firstName}</strong> is currently <strong>open</strong> to a new opportunity` : `${firstName} is not curently looking for an opportunity`
        await bot.reply(message, `Hi there, welcome to <strong>${firstName}</strong>'s ChatBot`)
        await bot.reply(message, `${jobOpportunity}`)
        await bot.reply(message, { 
            text: `Get more information about ${firstName} by typing <strong>#Contact, #Job History, #Experience, #TechStack, etc.</strong>`,
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
                    title: 'Job History',
                    payload: 'Job History',
                },
                {
                    title: 'TechStack',
                    payload: 'TechStack',
                }
            ]
        })
    })

}