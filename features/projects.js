const rawData = require('./src/rawData')
const { listOfProjects } = require('./src/projects')

module.exports = function (controller) {

    controller.hears(['projects', 'applications'], ['message', 'direct_message'], async (bot, message) => {

        await bot.reply(message, { type: 'typing' });

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, { text: `Here is a list of <Strong>My Projects</Strong>` });
            await bot.reply(message, { type: 'typing' });
        }, 1000);

        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, {
                text: `<div>${listOfProjects.map(project => `<div>- <a href="${project.url}" target="_blank">${project.name}</a></div>`).join('')}</div>`,
                quick_replies: [{
                    title: "Let's move on",
                    payload: "Let's move on"
                }]
            });
        }, 4000);


        });

}