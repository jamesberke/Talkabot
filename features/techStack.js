const rawData = require('./src/rawData')
const { listOfProjects } = require('./src/projects')
const { firstName } = rawData.contactInformation
const { listOfLanguages, listOfTechnologies } = rawData.techStack
const listTechStacks = [...listOfLanguages.map(el => el.name), ...listOfTechnologies.map(el => el.name)]

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
      await bot.reply(message,{ text: `Here is the list of <Strong>Henry's Tech Stack</Strong>` });
      await bot.reply(message, {
        text: `<div><Strong>Languages</Strong></div>${listOfLanguages.map(lang => `<div>- ${lang.name}: ${lang.yearsCoding} years</div>`).join('')}`
      });
      await bot.reply(message, {
        text: `<div><Strong>Technologies</Strong></div>${listOfTechnologies.map(lang => `<div>- ${lang.name}: ${lang.yearsCoding} years</div>`).join('')}`
      });
      await bot.reply(message, {
        text: `Would you like to see ${firstName}'s projects related to the specific technology?`,
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
            title: 'HTML',
            payload: 'HTML',
          }, {
            title: 'CSS',
            payload: 'CSS',
          }, {
            title: 'SQL',
            payload: 'SQL'
          }
        ]
      })
  });

  controller.hears(listTechStacks, ['message'], async function (bot, message) {
    const selectedProjects = listOfProjects.filter(project => project.technologies.includes(message.text))
    await bot.reply(message, {
      text: `Here is the list of the related projects`,
    })
    await bot.reply(message, {
      text: `<div>${selectedProjects.map(project=>`<div>- <a href="${project.url}" target="_blank">${project.name}</a></div>`).join('')}</div>`
    });

  });

}
