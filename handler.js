'use strict';

module.exports.sendReminderDaily = (event, context, callback) => {
  var AWS = require('aws-sdk');
  AWS.config.update({region:'eu-west-2'});
  var ses = new AWS.SES();
  var fs = require('fs');

  var emailHtml = fs.readFileSync('./dailyReminder.html', 'utf-8');

  var toAndFromAdress = 'ronnie.nyaga@andela.com'
  var params = {
      Destination: {
          ToAddresses: [toAndFromAdress]
      },
      Message: {
          Body: {
              Html: {
                  Charset: "UTF-8",
                  Data: emailHtml
              },
              Text: {
                  Charset: "UTF-8",
                  Data: "Remember to continue helping the Woof Garden!"
              }
          },
          Subject: {
              Charset: "UTF-8",
              Data: "Woof Garden Reminder"
          }
      },
      ReplyToAddresses: [toAndFromAdress],
      Source: toAndFromAdress,
  };

  ses.sendEmail(params, function(err, data) {
      // an error occurred
      if (err) console.log(err, err.stack);
      // successful response
      else callback(null, data);
  });
};

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
