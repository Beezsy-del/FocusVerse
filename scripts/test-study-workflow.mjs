import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const base = process.env.FOCUSVERSE_URL || 'http://127.0.0.1:5173';
const click = async (text, scope = 'button') => {
  const buttons = await page.$$(scope);
  for (const button of buttons) {
    if ((await button.evaluate(el => el.textContent.trim())) === text && await button.isVisible()) {
      await button.click();
      return;
    }
  }
  throw new Error(`Missing visible button: ${text}`);
};
const nav = text => click(text, 'header button');
const timerText = () => page.$eval('.timer-display', el => el.textContent);
const waitTimer = value => page.waitForFunction(value => document.querySelector('.timer-display')?.textContent.includes(value), {}, value);
const advance = async milliseconds => {
  await page.evaluate(ms => { window.__clockOffset += ms; }, milliseconds);
};
try {
  await page.setViewport({ width: 1440, height: 1000 });
  await page.evaluateOnNewDocument(() => {
    const realNow = Date.now.bind(Date);
    window.__clockOffset = 0;
    Date.now = () => realNow() + window.__clockOffset;
  });
  await page.goto(`${base}/#settings`, { waitUntil: 'networkidle0' });
  const durations = await page.$$('input[type=number]');
  for (const [index, value] of [[0, '40'], [1, '7'], [2, '18']]) {
    await durations[index].evaluate((input, value) => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }, value);
  }
  await nav('Study Timer');
  await waitTimer('40:00');
  await click('REST (7M)');
  await waitTimer('07:00');
  await click('LONG (18M)');
  await waitTimer('18:00');
  await click('FOCUS (40M)');
  await click('LOCK IN ▶');
  await advance(6000);
  await waitTimer('39:');
  await nav('Tasks & Planner');
  await advance(6000);
  await nav('Study Timer');
  await waitTimer('39:');
  assert.match(await timerText(), /RUNNING/);
  assert.doesNotMatch(await timerText(), /40:00/);
  console.log('PASS saved focus/break durations and active countdown across navigation');

  await nav('Settings');
  const focusDefault = await page.$('input[type=number]');
  await focusDefault.evaluate(input => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, '45');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await nav('Study Timer');
  assert.match(await timerText(), /39:/);
  assert.match(await timerText(), /RUNNING/);
  console.log('PASS changing defaults does not reset an active session');

  await click('PAUSE TIMER');
  const paused = (await timerText()).match(/\d{2}:\d{2}/)[0];
  await nav('Notes & Cards');
  await advance(6000);
  await nav('Study Timer');
  assert.match(await timerText(), /PAUSED/);
  assert.ok((await timerText()).includes(paused));
  console.log('PASS paused countdown stays paused with unchanged remaining time');

  await nav('Settings');
  await nav('Study Timer');
  await page.goBack();
  await page.waitForFunction(() => location.hash === '#settings' && document.body.innerText.includes('SETTINGS & HARDWARE CALIBRATION'));
  await page.goForward();
  await page.waitForSelector('.timer-panel');
  assert.ok((await timerText()).includes(paused));
  await page.evaluate(() => { location.hash = 'notes'; });
  await page.waitForFunction(() => !document.querySelector('.timer-panel') && location.hash === '#notes');
  await nav('Study Timer');
  assert.match(await timerText(), /PAUSED/);
  console.log('PASS Back, Forward, direct hash navigation and retained timer');

  await click('STOPWATCH');
  await click('LOCK IN ▶');
  await advance(5000);
  await nav('Tasks & Planner');
  await advance(5000);
  await nav('Study Timer');
  await waitTimer('00:1');
  assert.match(await timerText(), /RUNNING/);
  await click('PAUSE TIMER');
  await click('POMODORO');
  await click('15M');
  await click('LOCK IN ▶');
  await nav('Tasks & Planner');
  await advance(15 * 60000 + 1000);
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('focusverse_sessions') || '[]').length === 1);
  await nav('Study Timer');
  await page.waitForFunction(() => document.body.innerText.includes('SPRINT COMPLETE'));
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('focusverse_sessions')).length), 1);
  console.log('PASS stopwatch continuity and exactly one completion while viewing Tasks');

  await nav('Study Rooms');
  const roomText = await page.$eval('body', el => el.innerText);
  assert.match(roomText, /STUDY ROOM DEMO/);
  assert.match(roomText, /simulated peers/);
  assert.doesNotMatch(roomText, /LIVE SYNC|REAL-TIME|ONLINE/);
  await page.type('input[placeholder="Enter a demo room code..."]', 'TEST1234');
  const dialogPromise = new Promise(resolve => page.once('dialog', async dialog => {
    const message = dialog.message(); await dialog.accept(); resolve(message);
  }));
  await click('PREVIEW');
  assert.match(await dialogPromise, /Demo only:.*was not joined/);
  console.log('PASS simulated-room labels and honest preview message');
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
