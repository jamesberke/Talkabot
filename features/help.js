
module.exports = function (controller) {
  controller.hears(['#help', new RegExp(/^#help/)], ['message'], async (bot, message) => {
    await bot.reply(message, {
      text: `Here are the following commands that you can use. `,
    })
  })
}
