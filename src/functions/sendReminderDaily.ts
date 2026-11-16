import { sendEmail } from '../lib/Email';

export const sendReminderDaily = async () => {
  const result = await sendEmail('daily-reminder');
  console.info('Daily reminder accepted by SES', { messageId: result.MessageId });
  return result;
};
