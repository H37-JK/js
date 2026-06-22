import { chromium } from "playwright";

// const browser = await chromium.launch({
//     headless: false,
//     args: ['--no-sandbox']
// });

const browser = await chromium.connectOverCDP('http://localhost:9222');
const defaultContext = browser.contexts()[0];
let page = defaultContext.pages()[0];


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

page.on('dialog', async dialog => {
    const dialogType = dialog.type();
    await delay(2000);
    if (dialogType === 'confirm' || dialogType === 'alert') {
        await dialog.accept();
        await page.reload();
    }
});

// await page.goto('https://www.filejo.com/main/index.php');
//
// await delay(2000);
// await page.fill('#loginBox > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > input', 'star2098');
// await page.fill('#loginBox > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > input', 'star8903');
// await page.click('#ajax_indicator > a');
//
// await page.waitForURL('**/main/index.php');
//
// await delay(2000);
// page = await browser.newPage();
// page.on('dialog', async dialog => {
//     const dialogType = dialog.type();
//     await delay(2000);
//     if (dialogType === 'confirm' || dialogType === 'alert') {
//         await dialog.accept();
//         await page.reload();
//     }
// });

page.on('dialog', async dialog => {
    console.log('Dialog detected:', dialog.message());
    await dialog.accept();
    await delay(2000);
});

await page.goto('https://extra.filejo.com/');

await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
});

console.log('페이지이동');

await delay(2000);

await page.click('body > div.top_info > div > ul > li:nth-child(1) > a')
await delay(1000)
await page.fill('#mb_id', 'star2098')

await page.fill('#mb_pw', 'star8903')
await delay(1000)
await page.click('body > div.main_loginbox > ul > div.layerLogin > ul.login_inputbox > li:nth-child(5) > input')
await delay(2000)
await page.click('body > div.top_nav > ul > li:nth-child(11) > a')

await page.click('#list_sort > ul.ttl2 > li > div > div:nth-child(7) > input')
await page.click('body > form > div.popupbox1 > div > div > ul > li.fileup_3bl_b > div.fileup_li03 > input.fileup_btn001')


