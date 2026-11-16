const fs = require('node:fs');
const path = require('node:path');
const { renderEmail } = require('../dist/lib/Email');

const output = path.join(__dirname, '../docs/preview');
fs.mkdirSync(output, { recursive: true });
for (const template of ['daily-reminder', 'weekend-reminder']) {
  fs.writeFileSync(path.join(output, `${template}.html`), renderEmail(template));
}
console.log('Rendered docs/preview/*.html locally. No AWS credentials used and no email sent.');
