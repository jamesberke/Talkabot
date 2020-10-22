const rawData = require("./src/rawData")

module.exports = function (controller) {

  const { listOfCompanies } = rawData.jobHistory;
  let jobNames = [...listOfCompanies.map(company => company.companyName)]
  
  controller.hears(['#JobHistory', 'Job History', async(message) => message.text.toLowerCase().includes("job")], ['message','direct_message'], async function(bot, message) {

    if (listOfCompanies.length === 1) {
      
      await bot.reply(message, {type: 'typing'});

      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `${listOfCompanies.map(company => `<div>I worked at ${company.companyName} 
          as a ${company.jobTitle} from ${company.startDate} to ${company.endDate}.</div>`)}`
        });
        await bot.reply(message, {type: 'typing'});
      }, 1000);
  
      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `${listOfCompanies.map(company => `<div>I ${company.jobDescription}.</div>`)}`
        });
        await bot.reply(message, {type: 'typing'});
      }, 3000);
  
      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, { 
          text: `Is there anything else you'd like to learn about me? You can choose between the buttons below or type <strong>#Contact, #Education, or #TechStack</strong>`,
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
              },
              {
                  title: 'Projects',
                  payload: 'Projects',
              },
              {
                  title: 'Hobbies',
                  payload: 'Hobbies',
              }
          ]
        })
      }, 5000);
    } else {

      await bot.reply(message, { type: 'typing' });

      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `I have ${listOfCompanies.length} relavent work experiences. Which would you like to know more about?`,
          quick_replies: listOfCompanies.map(company => {
            return {
              title: company.companyName,
              payload: company.companyName
            }
          })
        })
      }, 1000);
    }

    controller.hears(jobNames, ['message','direct_message'], async function(bot, message) {
      let mainCompany = listOfCompanies.filter(company => company.companyName === message.text);
      await bot.reply(message, { type: 'typing' });

      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `<div>I worked at ${mainCompany[0].companyName} as a 
            ${mainCompany[0].jobTitle} from ${mainCompany[0].startDate.slice(5,7)}/${mainCompany[0].startDate.slice(0,4)}
              to ${mainCompany[0].endDate.slice(5, 7)}/${mainCompany[0].endDate.slice(0,4)}.</div>`
        });
        await bot.reply(message, { type: 'typing' });
      }, 1000);
  
      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `<div>I ${mainCompany[0].jobDescription}.</div>`
        });
        await bot.reply(message, { type: 'typing' });
      }, 3000);

      setTimeout(async() => {
        await bot.changeContext(message.reference);
        await bot.reply(message, { 
          text: `Is there anything else you'd like to learn about me? You can choose between the buttons below or type <strong>#Contact, #Education, #Projects, or #TechStack</strong>`,
          quick_replies: [
              {
                  title: 'Other Jobs',
                  payload: 'other jobs',
              },
              {
                  title: "Let's move on",
                  payload: "Let's move on"
              }
          ]
        })
      }, 5000)
    }); 
  });

}
