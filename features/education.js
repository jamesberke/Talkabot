const { Botkit, BotkitConversation } = require('botkit');
const rawData = require('./src/rawData')


module.exports = function (controller) {

  // const education = rawData.education.listOfInsitutions;

  // controller.hears('education', 'message,direct_message', async (bot, message) => {
  //   const initialReply = `I most recently attended ${education[0].institutionName}`;
  //   await bot.reply(message, initialReply);
  // });

  // controller.on('message,direct_message', async (bot, message) => {
  //   await bot.reply(message, `Echo: ${message.text}`);
  // });

  const MY_DIALOG_ID = 'educationConvo';
  let edConvo = new BotkitConversation(MY_DIALOG_ID, controller);
}
