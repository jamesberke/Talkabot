const { Botkit, BotkitConversation } = require('botkit');
const rawData = require('./src/rawData')


module.exports = function (controller) {

  let convo = new BotkitConversation('educationDialogue', controller);
  const education = rawData.education.listOfInsitutions;

  controller.hears(['education', 'school'], 'message,direct_message', async (bot, message) => {
    // let convo = new BotkitConversation('educationDialogue', controller);
    const initialReply = listEducation(education);
    await bot.reply(message, initialReply);

    await bot.ask('Would you like to learn more about my time at one of these schools?', [
      {
        pattern: 'yes',
        type: 'string',
        handler: async (response_text, convo, bot, full_message) => {
          return await convo.gotoThread('yes_taco');
        }
      },
      {
        pattern: 'no',
        type: 'string',
        handler: async (response_text, convo, bot, full_message) => {
          return await convo.gotoThread('no_taco');
        }
      },
      {
        default: true,
        handler: async (response_text, convo, bot, full_message) => {
          await bot.say('I do not understand your response!');
          // start over!
          return await convo.repeat();
        }
      }
    ], { key: 'tacos' });
  });

  controller.on('message,direct_message', async (bot, message) => {
    await bot.reply(message, `Echo: ${message.text}`);
  });

  
}




const listEducation = function (schools) {
  const schoolNames = schools.map(school => school.institutionName)

  if (schools.length <= 1) {
    return `I most recently attended ${schoolNames[0]}`
  } else {
    const lastSchool = schoolNames.pop();
    return `I have attended ${schoolNames.join(" ,")} and ${lastSchool}`
  }
}