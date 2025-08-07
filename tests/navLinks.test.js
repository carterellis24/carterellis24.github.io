const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert');

const siteDir = path.join(__dirname, '..', 'carter-ellis-website-FINAL-NO-GMAIL-BELOW (1)');
const html = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');

const linkRegex = /<a\s+[^>]*href="([^"]+)"/g;
const links = [];
let match;
while ((match = linkRegex.exec(html)) !== null) {
  links.push(match[1]);
}

const internalLinks = links.filter(href => !href.startsWith('http') && !href.startsWith('#'));

internalLinks.forEach(link => {
  test(`"${link}" points to existing file`, () => {
    const filePath = path.join(siteDir, link);
    assert.ok(fs.existsSync(filePath), `Missing file for link: ${link}`);
  });
});
