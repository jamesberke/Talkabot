const { BotkitConversation } = require("botkit");
const rawData = require("./src/rawData")

module.exports = function (controller) {
  
  controller.hears(['#JobHistory', async(message) => message.text.toLowerCase().includes("job")], ['message','direct_message'], async function(bot, message) {
    const { listOfCompanies } = rawData.jobHistory;

    if (listOfCompanies.length === 1) {
      
      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `${listOfCompanies.map(company => `<div>I have worked at ${company.companyName} 
          as a ${company.jobTitle} from ${company.startDate} to ${company.endDate}.</div>`)}`
        });
      }, 1000);
  
      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `${listOfCompanies.map(company => `<div>I ${company.jobDescription}.</div>`)}`
        });
      }, 2000)
  
      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, { 
          text: `Is there anything else you'd like to learn about me? You can choose between the buttons below or type <strong>#Contact, #Experience, or #TechStack</strong>`,
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
                  title: 'TechStack',
                  payload: 'TechStack',
              }
          ]
        })
      }, 3000)
    } else {
      let jobNames = [...listOfCompanies.map(company => company.companyName)]

      controller.hears(jobNames, ['message','direct_message'], async function(bot, message) {
        let mainCompany = listOfCompanies.filter(company => company.companyName === message.text);

        setTimeout(async() => {
          await bot.changeContext(message.reference);
          await bot.reply(message, {
            text: `<div>I have worked at ${mainCompany[0].companyName} 
            as a ${mainCompany[0].jobTitle} from ${mainCompany[0].startDate} to ${mainCompany[0].endDate}.</div>`
          });
        }, 1000);
    
        setTimeout(async() => {
          await bot.changeContext(message.reference);
          await bot.reply(message, {
            text: `<div>I ${mainCompany[0].jobDescription}.</div>`
          });
        }, 2000)
      });

      await bot.reply(message, {
        text: `I have ${listOfCompanies.length} relavent work experiences. Which would you like to know more about?`,
        quick_replies: listOfCompanies.map(company => {
          return {
            title: company.companyName,
            payload: company.companyName
          }
        })
      })
    }
  });

}
