module.exports = function(controller) {

    controller.on('welcome_back', async(bot, message) => {
        await bot.reply(message, "hi")
    })
    
}
