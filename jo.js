import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-save-password-bubble']
});



let page = await browser.newPage()
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

page.on('dialog', async dialog => {
    const dialogType = dialog.type()
    await delay(2000)
    if (dialogType === 'confirm' || dialogType === 'alert') {
        await dialog.accept();
        await page.reload()
    }
});

await page.goto('https://www.filejo.com/main/index.php')


await delay(2000)
await page.type('#loginBox > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > input', 'star2098');
await page.type('#loginBox > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > input', 'star8903');
await page.click('#ajax_indicator > a');

await page.waitForNavigation()


await delay(2000)
page = await browser.newPage()
page.on('dialog', async dialog => {
    const dialogType = dialog.type()
    await delay(2000)
    if (dialogType === 'confirm' || dialogType === 'alert') {
        await dialog.accept();
        await page.reload()
    }
});
await page.goto('https://extra.filejo.com/')
await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
    });
});


await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:110.0) Gecko/20100101 Firefox/110.0');


console.log('페이지이동')
// #frm > table > tbody > tr:nth-child(4) > td:nth-child(1) > input
await delay(2000)

await page.click('body > div.top_info > div > ul > li:nth-child(1) > a')
await delay(1000)
await page.click('body > div.top_info > div > ul > div.myinfo_popup.myInfoLayer > ul.myinfo_box > input.mypage_btn');
await delay(1000)
await page.click('body > div.main_wrap > div.main_list2 > ul.mytop_tab > li:nth-child(2) > a');
await delay(1000)
await page.click('#sellerContentsMenu');
await delay(1000)

for(let i = 1; i <= 100; i ++) {
    console.log('시작')
    if (i === 1) {
        await delay(3000)
    } else {
        await delay(610000)
    }

    console.log(getCurrentTimeString() + ':' + `${i}번째 실행`)
    await page.click('#mypageInfoArea > ul.list006 > li:nth-child(15) > div.ttl001 > input')
    await page.click('#mypageInfoArea > ul.mypminibar > ul.minibar02 > li:nth-child(3) > input[type=button]')


}


function getCurrentTimeString() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}