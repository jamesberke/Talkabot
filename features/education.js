const { Botkit, BotkitConversation } = require('botkit');
const rawData = require('./src/rawData')


module.exports = function (controller) {

  let convo = new BotkitConversation('educationDialogue', controller);
  const education = rawData.education.listOfInsitutions;

  controller.hears(['education', 'school'], ['message','direct_message'], async (bot, message) => {
    const initialReply = listEducation(education);
    await bot.reply(message, initialReply);
    await bot.reply(message, {
            text: 'Would you like to learn more about one of these schools?',
            quick_replies:[{title: 'App Academy',
                            payload: 'App Academy'},
                          {title: 'City College of San Francisco',
                            payload: 'City College of San Francisco'}]
    })
  });

  controller.hears('App Academy', ['message', 'direct_message'], async (bot, message) => {
    const appAcademy = education.find(school => school.institutionName === 'App Academy');
    const aAreply = parseDescription(appAcademy)
    await bot.reply(message, aAreply);
  
  });

  const listEducation = function (schools) {
    const schoolNames = schools.map(school => school.institutionName)

    if (schools.length <= 1) {
      return `I most recently attended ${schoolNames[0]}`
    } else {
      const lastSchool = schoolNames.pop();
      return `I have attended ${schoolNames.join(" ,")} and ${lastSchool}`
    }
  };

  const parseDescription = function (school) {
    return `${school.description} I attended for ${getLengthAtSchool(school.startDate, school.endDate)} and graduated in ${school.endDate[1]}`
  };

  const getLengthAtSchool = function (startDate, endDate) {
    const monthsWorking = 12 - (startDate[0] - endDate[0]);
    let yearsWorking = endDate[1] - startDate[1];

    if (endDate[0] < startDate[0]) yearsWorking -= 1;

    if (yearsWorking) {
      return `${yearsWorking} years and ${monthsWorking} months`;
    } else {
      return `${monthsWorking} months`;
    };
  }


}


