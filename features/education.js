const rawData = require('./src/rawData')
const { listOfInsitutions } = rawData.education;

module.exports = function (controller) {

  const education = rawData.education.listOfInsitutions;

// initial interaction with education branch of resume chatbot
// uses listEducation() function to parse schools like a human would write
// use quick reply as "guide" for user to know what to do next

  controller.hears(['education', 'school'], ['message','direct_message'], async (bot, message) => {

    await bot.reply(message, { type: 'typing' });
    
    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, `Here is the list of <Strong>My Education History</Strong>`);
      await bot.reply(message, { type: 'typing' });
    }, 1000)

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: `${listOfInsitutions.map(school =>
          `<div>- <strong>${school.institutionName}:
        </strong>${school.degree} (${school.startDate.slice(0,4)} - ${school.endDate.slice(0,4)})</div>`)
          .join('')}`
      });
      await bot.reply(message, { type: 'typing' });
    }, 3000)

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: 'Would you like to learn more about one of these schools?',
        quick_replies: [{
          title: 'App Academy',
          payload: 'App Academy'
        },
        {
          title: 'City College of San Francisco',
          payload: 'City College of San Francisco'
        },
        {
          title: "Let's move on",
          payload: "Let's move on"
        }]
      });
    }, 5000);
    
  });

// dialogue branch for app academy initial info and main description
// uses 'no' quick reply as bootleg transition to a menu sequence
  controller.hears('App Academy', ['message', 'direct_message'], async (bot, message) => {
    const appAcademy = education.find(school => school.institutionName === 'App Academy');
    const aAreply = appAcademy.description;

    await bot.reply(message, { type: 'typing' });

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, aAreply);
      await bot.reply(message, { type: 'typing' });
    }, 2000);

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: 'Would you like to learn more?',
        quick_replies: [{
          title: 'City College of San Francisco',
          payload: 'City College of San Francisco'
        },
        {
          title: "Let's move on",
          payload: "Let's move on"
        }]
      }) 
    }, 3000);
    
   });

// dialogue branch foro City College initial info and main description
// uses 'no' quick reply as bootleg transition to a menu sequence
  controller.hears(['City College of San Francisco', 'CCSF', 'City College'], ['message', 'direct_message'], async (bot, message) => {
    const cityCollege = education.find(school => school.institutionName === 'City College of San Francisco');
    const cCreply = cityCollege.description

    await bot.reply(message, { type: 'typing' });

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, cCreply);
      await bot.reply(message, { type: 'typing' });
    }, 2000);

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: 'Would you like to learn more?',
        quick_replies: [{
          title: 'App Academy',
          payload: 'App Academy'
        },
        {
          title: "Let's move on",
          payload: "Let's move on"
        }]
      })
    }, 3000);
    
  });

// bootleg transition until we figure out how to use conversations
// allows for an easy route back to new information
  controller.hears(["Let's move on", 'lets move on', 'help', 'stop'], ['message', 'direct_message'], async (bot, message) => {

    await bot.reply(message, { type: 'typing' });

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: 'What else can I help you with?',
        quick_replies: [{
          title: 'Job History',
          payload: 'Job History'
        },
        {
          title: 'TechStack',
          payload: 'TechStack'
        },
        {
          title: 'Education',
          payload: 'Education'
        },
        {
          title: 'Projects',
          payload: 'Projects'
        },
        {
          title: 'Contact Info',
          payload: 'Contact'
        },
        {
          title: 'Hobbies',
          payload: 'Hobbies'
        },
        {
          title: 'Tell Me About Yourself',
          payload: 'Tell Me About Yourself'
        }]
      });
    }, 1000);

    
  });

// returns main description followed by timeline
  // const parseDescription = function (school) {
  //   return `${school.description} I attended for 
  //           ${getLengthAtSchool(school.startDate, school.endDate)} 
  //           and graduated in ${school.endDate[1]}`
  // };

// helper function to make timeline more dynamic
  // const getLengthAtSchool = function (startDate, endDate) {
  //   const monthsWorking = 12 - (startDate[0] - endDate[0]);
  //   let yearsWorking = endDate[1] - startDate[1];

  //   if (endDate[0] < startDate[0]) yearsWorking -= 1;

  //   if (yearsWorking === 1) {
  //     return `${yearsWorking} year and ${monthsWorking} months`;
  //   } else if (yearsWorking > 1) {
  //     return `${yearsWorking} years and ${monthsWorking} months`;
  //   } else {
  //     return `${monthsWorking} months`;
  //   };
  // }

  // const ed_dialog = new BotkitConversation('ed_dialog', controller);

  // const initialReply = listEducation(education);

  // ed_dialog.say(`${initialReply}`);
  // ed_dialog.ask('Would you like to learn more about one of these schools?', [
  //   {
  //     pattern: 'Yes',
  //     handler: async function (answer, convo, bot) {
  //       await bot.reply(message, {
  //         text: 'Please pick a school',
  //         quick_replies:[{
  //           title: 'App Academy',
  //           payload: 'App Academy'
  //         },
  //         {
  //           title: 'City College of San Francisco',
  //           payload: 'City College of San Francisco'
  //         }]
  //       })
  //     }
  //   },
  //   {
  //     pattern: 'no',
  //     handler: async function (answer, convo, bot) {
  //       await convo.gotoThread('hates_life');
  //     }
  //   }
  // ], { key: 'tacos' });

  // // Add the dialog to the Botkit controller
  // controller.addDialog(ed_dialog);

  // // Later on, trigger the dialog into action!
  // controller.on('message', async (bot, message) => {
  //   if (message === 'education') await bot.beginDialog('ed_dialog');
  // });
}


