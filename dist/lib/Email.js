"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const AWS = __importStar(require("aws-sdk"));
const email_templates_1 = __importDefault(require("email-templates"));
AWS.config.update({ region: 'eu-west-1' });
const SES = new AWS.SES();
function sendEmail(callback, to, from, subject, template, data, replyTo, bcc) {
    const email = new email_templates_1.default({
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
                relativeTo: path.resolve('templates'),
            },
        },
        transport: {
            jsonTransport: true,
        },
    });
    const toSummary = typeof to === 'string' ? to : to.join(',');
    console.log(`Begin rendering email template '${template}' for ${toSummary}`);
    return email.render(`${template}/text`, data).then((output) => {
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
        return SES.sendEmail(sesParams).promise();
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL0VtYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDJDQUE2QjtBQUM3Qiw2Q0FBK0I7QUFDL0Isc0VBQW9DO0FBSXBDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFHM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsU0FBZ0IsU0FBUyxDQUN2QixRQUFrQixFQUNsQixFQUFxQixFQUNyQixJQUFZLEVBQ1osT0FBZSxFQUNmLFFBQWdCLEVBQ2hCLElBQWEsRUFDYixPQUFnQixFQUNoQixHQUFZO0lBRVosTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBSyxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7U0FDdEM7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRCxJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsY0FBYyxFQUFFO1lBQ2QsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixZQUFZLEVBQUU7Z0JBQ1osVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3RDO1NBQ0Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxhQUFhLEVBQUUsSUFBSTtTQUNwQjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLFFBQVEsU0FBUyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLFFBQVEsU0FBUyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBR2hGLE1BQU0sT0FBTyxHQUFhLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFHN0YsTUFBTSxTQUFTLEdBQXFCO1lBQ2xDLFdBQVcsRUFBRTtnQkFDWCxZQUFZLEVBQUUsT0FBTztnQkFDckIsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDM0M7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsSUFBSSxFQUFFLE1BQU07cUJBQ2I7aUJBQ0Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLE9BQU8sRUFBRSxPQUFPO29CQUNoQixJQUFJLEVBQUUsT0FBTztpQkFDZDthQUNGO1lBQ0QsTUFBTSxFQUFFLElBQUk7WUFDWixnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDbEQsQ0FBQztRQUdGLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLFNBQVMsS0FBSyxDQUFDLENBQUM7UUFFMUQsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBFRCw4QkFvRUMifQ==