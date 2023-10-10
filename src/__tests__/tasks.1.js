const puppeteer = require('puppeteer');
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./dist/index.html'), { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 350))
}, 30000);

afterAll((done) => {
    try {
        browser.close();
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Task1: Page exists', () => {
    it("`#countdown` container should contain a countdown clock", async () => {
        const countdown = await page.$('#countdown');
        const children = await page.evaluate(countdown => countdown.children.length, countdown);
        expect(children).toBeGreaterThan(0);
    });
})
describe('Days countdown', () => {
    it('Countdown should display remaining days until fourth of February 2025 16 o\'clock', async () => {
        await page.waitForSelector('#countdown');
        const timeNow = new Date();
        const timeCountdown = new Date(2025, 1, 4, 16);
        const timeDiff = timeCountdown - timeNow;
        const timeDiffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const countdownContent = await page.$eval('#countdown', el => el.textContent);
        expect(countdownContent).toMatch(new RegExp(timeDiffDays.toString()));
    });
});
describe('Hours countdown', () => {
    it('Countdown should display correct number of remaining hours', async () => {
        await page.waitForSelector('#countdown');
        const timeNow = new Date();
        const timeCountdown = new Date(2025, 1, 4, 16);
        const timeDiff = timeCountdown - timeNow;
        const timeDiffHours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const countdownContent = await page.$eval('#countdown', el => el.textContent);
        expect(countdownContent).toMatch(new RegExp(timeDiffHours.toString()));
    });
});
describe('Minutes countdown', () => {
    it('Countdown should display correct number of remaining minutes', async () => {
        await page.waitForSelector('#countdown');
        const timeNow = new Date();
        const timeCountdown = new Date(2025, 1, 4, 16);
        const timeDiff = timeCountdown - timeNow;
        const timeDiffMinutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const countdownContent = await page.$eval('#countdown', el => el.textContent);
        expect(countdownContent).toMatch(new RegExp(timeDiffMinutes.toString()));
    });
});
