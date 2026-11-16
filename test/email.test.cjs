const { test } = require('node:test');
const assert = require('node:assert/strict');
const { renderEmail, sendEmail } = require('../dist/lib/Email');

test('both templates render with inline styles and without remote images', () => {
  for (const template of ['daily-reminder', 'weekend-reminder']) {
    const html = renderEmail(template);
    assert.match(html, /<html/);
    assert.match(html, /style=/);
    assert.doesNotMatch(html, /<img|<link/);
  }
});

test('SES receives configured addresses and errors propagate for Lambda retries', async () => {
  process.env.REMINDER_FROM = 'reminders@example.com';
  process.env.REMINDER_TO = 'one@example.com, two@example.com';
  let input;
  const response = await sendEmail('daily-reminder', {
    async send(command) { input = command.input; return { MessageId: 'offline-test' }; },
  });
  assert.equal(response.MessageId, 'offline-test');
  assert.deepEqual(input.Destination.ToAddresses, ['one@example.com', 'two@example.com']);
  assert.equal(input.Source, 'reminders@example.com');
  await assert.rejects(sendEmail('daily-reminder', {
    async send() { throw new Error('SES unavailable'); },
  }), /SES unavailable/);
  delete process.env.REMINDER_FROM;
  await assert.rejects(sendEmail('daily-reminder'), /required/);
  delete process.env.REMINDER_TO;
});
