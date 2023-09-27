const helper = require('../Helper/helper');
let logger = helper.logger

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs').promises;
const linkedin = require("../config/LinkedInSelectors");

let User = {
    login: async function () {
        try {
            const browser = await puppeteer.launch({
                // executablePath: '/usr/bin/chromium-browser',
                executablePath: '/opt/google/chrome/google-chrome',
                headless: false,
                // args: [`--window-size=1920,1080`,
                //     // "--user-data-dir=~/.config/google-chrome Default",
                //     '--disable-gpu',
                //     '--disable-dev-shm-usage',
                //     '--disable-setuid-sandbox',
                //     '--no-first-run',
                //     '--no-sandbox',
                //     '--no-zygote',
                //     '--single-process',
                // ],

            });

            // await new Promise(resolve => setTimeout(resolve, 15000)).then(() => {
            //     console.log("wwwwwwww");
            // });
            /*
            logger.info('browser opening');
            let page = await browser.newPage();
            logger.info('new page opened');
            await page.setDefaultNavigationTimeout(60000);
            await page.goto(linkedin.LOGIN_PAGE, {
                waitUntil: "load",
            });

            page.once("load", () => logger.info("Login Page loadedd!"));
            logger.info(process.env.UserName);
            logger.info(process.env.PASS);

            await page.type(linkedin.UserName, process.env.UserName, {
                delay: 100,
            });

            await page.type(linkedin.Password, process.env.PASS, {
                delay: 100,
            });
            await page.waitForSelector(linkedin.LoginBtn);

            await page.click(linkedin.LoginBtn, { delay: 3000 });

            await page.waitForNavigation({ waitUntil: "load" });
            let isOtpPage = await this.checkOTPElement(linkedin, page);
            console.log(`isOtpPage ${isOtpPage}`);

            if (isOtpPage) {
                return {
                    "page": page,
                    "isOtpRequried": isOtpPage
                };
            }

            if (await this.checkLoggedIn(page)) {
                logger.info(`Logged in ${await this.checkLoggedIn(page)}`);

                const cookies = await page.cookies();
                await fs.writeFile(`./cookies/cookies_${process.env.UserName}.json`, JSON.stringify(cookies, null, 2));
                return {
                    "page": page,
                    "isOtpRequried": isOtpPage
                };
            } else {
                logger.info('Not logged in');
                const title = await page.title();
                logger.error(`Something went wrong on login,Page Title : ${title}`);
                let error = await page.evaluate(() => {
                    return !!document.querySelector('.form__input--error') // !! converts anything to boolean
                });
                await page.screenshot({ path: './assets/screenshots/login_error.png' });
                await helper.uploadImg(`./assets/screenshots/login_error.png`, "login_error.png");
                if (error) {
                    logger.info('Login Failure');
                }
                return {
                    "page": null,
                    "isOtpRequried": isOtpPage
                };
            }
            
            /*
            */

            
            let page = await browser.newPage();
            let cookiesFile = `./cookies/cookies_${process.env.UserName}.json`;
            const cookiesString = await fs.readFile(cookiesFile);
            const cookies = JSON.parse(cookiesString);
            await page.setCookie(...cookies);
            await page.goto(linkedin.CONNECTION_PAGE, {
                waitUntil: "load",
            });
            console.log(process.env.UserName);
            console.log(process.env.PASS);

            let isOtpPage = await this.checkOTPElement(linkedin, page);
               
            return {
                "page": page,
                "isOtpRequried": isOtpPage
            };
            

        } catch (error) {
            if (error?.stack) {
                logger.error(error.stack);
            } else {
                logger.error(error);
            }
        }

    },
    checkLoggedIn: async function (page) {
        let cookies = await page.cookies();

        if (cookies.length) {
            cookies = cookies.filter(e => e.name == 'li_at')
        }
        logger.info(`cookies length ${cookies.length}`);
        return (cookies.length ? true : false);
    },
    checkOTPElement: async function (selector, page) {
        let actionElement = await page.evaluateHandle((selector) => {
            var element = document.querySelector(selector.OTP_INPUT);
            if (typeof (element) != 'undefined' && element != null) {
                return true;
            } else {
                return false;
            }
        }, selector);
        await page.screenshot({ path: './assets/screenshots/checkOTPElement.png' });
        // await helper.uploadImg(`./assets/screenshots/checkOTPElement.png`, "checkOTPElement.png");
        return actionElement.jsonValue();
    },
}
module.exports = User;