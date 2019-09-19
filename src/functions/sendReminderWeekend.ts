import { ScheduledEvent, Context, Callback, Handler } from 'aws-lambda';
import { sendEmail } from '../lib/Email';

export const sendReminderWeekend: Handler<ScheduledEvent> = (event: ScheduledEvent, context: Context, callback: Callback) => {
	const toFullName = 'Ronnie Nyaga';
	const to = `${toFullName} <ronnienyaga@gmail.com>`;
	const fromFullName = 'Ronnie Nyaga';
  const from = `${fromFullName} <ronnie.nyaga@andela.com>`;
  const template = 'weekend-reminder';

  sendEmail(callback, to, from, 'Woof Garden Reminder', template, null, from).then((result) => {
    console.info(`SES Message ID: ${result.MessageId}`);
  })
};
