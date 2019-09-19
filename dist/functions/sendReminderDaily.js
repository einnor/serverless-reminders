"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = require("../lib/Email");
exports.sendReminderDaily = (event, context, callback) => {
    const toFullName = 'Ronnie Nyaga';
    const to = `${toFullName} <ronnienyaga@gmail.com>`;
    const fromFullName = 'Ronnie Nyaga';
    const from = `${fromFullName} <ronnie.nyaga@andela.com>`;
    const template = 'daily-reminder';
    Email_1.sendEmail(callback, to, from, 'Woof Garden Reminder', template, {}, from).then((result) => {
        console.info(`SES Message ID: ${result.MessageId}`);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZFJlbWluZGVyRGFpbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL3NlbmRSZW1pbmRlckRhaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0NBQXlDO0FBRTVCLFFBQUEsaUJBQWlCLEdBQTRCLENBQUMsS0FBcUIsRUFBRSxPQUFnQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUN6SCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUM7SUFDbEMsTUFBTSxFQUFFLEdBQUcsR0FBRyxVQUFVLDBCQUEwQixDQUFDO0lBQ25ELE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztJQUNuQyxNQUFNLElBQUksR0FBRyxHQUFHLFlBQVksNEJBQTRCLENBQUM7SUFDekQsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7SUFFbEMsaUJBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3hGLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDIn0=