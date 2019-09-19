"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const AWS = __importStar(require("aws-sdk"));
const Email = __importStar(require("email-templates"));
AWS.config.update({ region: 'eu-west-1' });
const SES = new AWS.SES();
function sendEmail(callback, to, from, subject, template, data, replyTo, bcc) {
    const email = new Email({
        preview: false,
        views: {
            root: path.resolve('templates/email'),
        },
        message: {
            from: from,
            bcc: bcc,
        },
        send: false,
        juice: true,
        juiceResources: {
            preserveImportant: true,
            webResources: {
                relativeTo: path.resolve('templates/css'),
            },
        },
        transport: {
            jsonTransport: true,
        },
    });
    const toSummary = typeof to === 'string' ? to : to.join(',');
    console.log(`Begin rendering email template '${template}' for ${toSummary}`);
    return email.render(`${template}/index`, data).then((output) => {
        console.log(`Finished rendering email template '${template}' for ${toSummary}`);
        const bccList = typeof bcc === 'string' ? bcc.split(',').map((x) => x.trim()) : [];
        const sesParams = {
            Destination: {
                BccAddresses: bccList,
                ToAddresses: Array.isArray(to) ? to : [to],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: output,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject,
                },
            },
            Source: from,
            ReplyToAddresses: replyTo ? [replyTo] : undefined,
        };
        console.log(`Invoking SES.sendEmail for ${toSummary}...`);
        return SES.sendEmail(sesParams, (err, data) => {
            if (err)
                console.log(err, err.stack);
            else
                callback(null, data);
        });
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL0VtYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDJDQUE2QjtBQUM3Qiw2Q0FBK0I7QUFDL0IsdURBQXlDO0FBSXpDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFHM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsU0FBZ0IsU0FBUyxDQUN2QixRQUFrQixFQUNsQixFQUFxQixFQUNyQixJQUFZLEVBQ1osT0FBZSxFQUNmLFFBQWdCLEVBQ2hCLElBQW9CLEVBQ3BCLE9BQWdCLEVBQ2hCLEdBQVk7SUFFWixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQztRQUN0QixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLElBQUk7WUFDVixHQUFHLEVBQUUsR0FBRztTQUNUO1FBQ0QsSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsSUFBSTtRQUNYLGNBQWMsRUFBRTtZQUNkLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsWUFBWSxFQUFFO2dCQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQzthQUMxQztTQUNGO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsYUFBYSxFQUFFLElBQUk7U0FDcEI7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3RCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxRQUFRLFNBQVMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUM3RSxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxRQUFRLFNBQVMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUdoRixNQUFNLE9BQU8sR0FBYSxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRzdGLE1BQU0sU0FBUyxHQUFxQjtZQUNsQyxXQUFXLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLE9BQU87Z0JBQ3JCLFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzNDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLE9BQU87d0JBQ2hCLElBQUksRUFBRSxNQUFNO3FCQUNiO2lCQUNGO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsSUFBSSxFQUFFLE9BQU87aUJBQ2Q7YUFDRjtZQUNELE1BQU0sRUFBRSxJQUFJO1lBQ1osZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ2xELENBQUM7UUFHRixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixTQUFTLEtBQUssQ0FBQyxDQUFDO1FBRTFELE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFFM0MsSUFBSSxHQUFHO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRWhDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6RUQsOEJBeUVDIn0=