"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = require("../lib/Email");
exports.sendReminderWeekend = (event, context, callback) => {
    const toFullName = 'Ronnie Nyaga';
    const to = `${toFullName} <ronnienyaga@gmail.com>`;
    const fromFullName = 'Ronnie Nyaga';
    const from = `${fromFullName} <ronnie.nyaga@andela.com>`;
    const template = 'weekend-reminder';
    Email_1.sendEmail(callback, to, from, 'Woof Garden Reminder', template, {}, from).then((result) => {
        console.info(`SES Message ID: ${result.MessageId}`);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZFJlbWluZGVyV2Vla2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvc2VuZFJlbWluZGVyV2Vla2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUF5QztBQUU1QixRQUFBLG1CQUFtQixHQUE0QixDQUFDLEtBQXFCLEVBQUUsT0FBZ0IsRUFBRSxRQUFrQixFQUFFLEVBQUU7SUFDM0gsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDO0lBQ2xDLE1BQU0sRUFBRSxHQUFHLEdBQUcsVUFBVSwwQkFBMEIsQ0FBQztJQUNuRCxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7SUFDbkMsTUFBTSxJQUFJLEdBQUcsR0FBRyxZQUFZLDRCQUE0QixDQUFDO0lBQ3pELE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDO0lBRXBDLGlCQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN4RixPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyJ9