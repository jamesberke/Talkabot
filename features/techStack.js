const rawData = require('./src/rawData')

module.exports = function (controller) {
  // // use a function to match a condition in the message
  // controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
  //     await bot.reply(message, 'I heard "foo" via a function test');
  // });

  // // use a regular expression to match the text of the message
  // controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
  //     await bot.reply(message,{ text: 'I heard a number using a regular expression.' });
  // }

  // match any one of set of mixed patterns like a string, a regular expression
  controller.hears(['#techStack', new RegExp(/^TechStack/)], ['message', 'direct_message'], async function (bot, message) {
      const {firstName} = rawData.contactInformation
      const { listOfLanguages } = rawData.techStack
      await bot.reply(message,{ text: "Here is the list of Henry's skills" });
      await bot.reply(message, {
        text: `${listOfLanguages.map(lang => `<div>- ${lang.name}: ${lang.yearsCoding} years</div>`).join('')}`
      });
      await bot.reply(message, {
        text: `Would you like to see ${firstName}'s projects related to the specific skill?`,
        quick_replies: [{
            title: 'JavaScript',
            payload: 'JavaScript',
          },
          {
            title: 'Python',
            payload: 'Python',
          },
          {
            title: 'Ruby',
            payload: 'Ruby',
          },
          {
            title: 'React.js',
            payload: 'React.js',
          }, {
            title: 'Node.js',
            payload: 'Node.js',
          }, {
            title: 'Vue.js',
            payload: 'React.js',
          }, {
            title: 'Angular.js',
            payload: 'Angular.js',
          },{
            title: 'SQL',
            payload: 'SQL'
          }
        ]
      })
      // await bot.reply(message,{ text: 'I HEARD YOU TYPED TECHSTACK' });
  });

}
