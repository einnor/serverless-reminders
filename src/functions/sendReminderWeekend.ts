import { sendEmail } from '../lib/Email';

export const sendReminderWeekend = async () => {
  const result = await sendEmail('weekend-reminder');
  console.info('Weekend reminder accepted by SES', { messageId: result.MessageId });
  return result;
};
