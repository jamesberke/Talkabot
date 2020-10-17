const rawData = require('./src/rawData')

module.exports = function (controller) {

  controller.on('education', async (bot, message) => {
    await bot.reply(message, "hi")
  })

}
