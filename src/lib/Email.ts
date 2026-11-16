import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';
import path from 'node:path';
import fs from 'node:fs';
import pug from 'pug';
import juice from 'juice';

export type ReminderTemplate = 'daily-reminder' | 'weekend-reminder';
type MailClient = { send(command: SendEmailCommand): Promise<{ MessageId?: string }> };

export function renderEmail(template: ReminderTemplate): string {
  const root = path.resolve(__dirname, '../../templates');
  const html = pug.renderFile(path.join(root, 'email', template, 'html.pug'));
  const css = fs.readFileSync(path.join(root, 'css', `${template}.css`), 'utf8');
  return juice(html, { extraCss: css, removeStyleTags: true });
}

export async function sendEmail(
  template: ReminderTemplate,
  client: MailClient = new SESClient({}),
): Promise<{ MessageId?: string }> {
  const from = process.env.REMINDER_FROM?.trim();
  const to = process.env.REMINDER_TO?.split(',').map(value => value.trim()).filter(Boolean);
  if (!from || !to?.length) throw new Error('REMINDER_FROM and REMINDER_TO are required.');

  const input: SendEmailCommandInput = {
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: { Charset: 'UTF-8', Data: template === 'daily-reminder' ? 'Daily reminder' : 'Weekend reminder' },
      Body: { Html: { Charset: 'UTF-8', Data: renderEmail(template) } },
    },
  };
  return client.send(new SendEmailCommand(input));
}
