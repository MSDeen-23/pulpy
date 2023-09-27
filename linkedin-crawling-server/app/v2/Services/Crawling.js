const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs').promises;
const linkedin = require("../config/LinkedInSelectors");

const helper = require('../Helper/helper.js');
let logger = helper.logger

class Crawling {
    constructor(campaignId, page) {
        this.page = page;
        this.campaignId = campaignId;
        return (async () => {
            await this.init();
            return this;
        })();
    }

    async login() {
        this.page.once("load", () => logger.info("Login Page loadedd!"));

        await this.page.type(linkedin.UserName, process.env.UserName, {
            delay: 100,
        });

        await this.page.type(linkedin.Password, process.env.PASS, {
            delay: 100,
        });

        await this.page.waitForSelector(linkedin.LoginBtn);

        await this.page.click(linkedin.LoginBtn, { delay: 3000 });

        await this.page.waitForNavigation({ waitUntil: "load" });

        await this.page.screenshot({ path: './assets/screenshots/login_.png' });
        // await helper.uploadImg(`./assets/screenshots/init.png`, "login_.png");

        logger.info(`Logged in ${await this.checkLoggedIn()}`);
        //save cookies
        const cookies = await this.page.cookies();

        await fs.writeFile(`./cookies/cookies_${process.env.UserName}.json`, JSON.stringify(cookies, null, 2));
    }

    /**
     * Send Connection Request
     * @param {String} leadUrl 
     * @returns 
     */
    async sendRequest(leadUrl, messageContent) {
        logger.info(`Crawling::sendRequest`);
        if (!(await this.checkLoggedIn())) {
            const title = await this.page.title();
            logger.error(`Something went wrong on login,Page Title : ${title}`);
            throw `Something went wrong on login,Page Title : ${title}`;
        }
        // await this.page.goto(leadUrl, { waitUntil: "load" });
        await this.page.waitForTimeout(1000);

        logger.info(`sendRequest for ${leadUrl}`);
        let action_text = await this.getProfileState();
        return this.connectAction(action_text, messageContent)
    }

    /**
     * Send Message to the lead
     * @param {String} leadUrl 
     * @param {String} messageContent 
     * @returns 
     */
    async sendMessagess(leadUrl, messageContent = 'Hi') {
        try {
            if (!(await this.checkLoggedIn())) {
                await this.init()
            }

            if (!(await this.checkLoggedIn())) {
                const title = await this.page.title();
                logger.error(`Something went wrong on login,Page Title : ${title}`);
                throw `Something went wrong on login,Page Title : ${title}`;
            }
            let response = { status: 400, message: "Something went wrong" }
            await this.page.waitForTimeout(2000);

            // await this.page.goto(leadUrl, { waitUntil: "load" });
            logger.info(`Lead url ${leadUrl}`);
            await this.page.waitForTimeout(1000);
            if (await this.isPending()) {
                return logger.info(`Connection still Pending`);
            }
            let canSend = await this.canIsend();
            if (canSend) {
                await this.page.waitForTimeout(2000);
                const messageBtn = await this.page.$(linkedin.Profile_msg_btn);
                await messageBtn.click();
                logger.info("sendMessage clicked");

                await this.page.waitForSelector(linkedin.MessageTabClass);
                logger.info("message tab opened");

                await this.page.click(linkedin.MessageTextArea);

                messageContent = await this.processMessageContent(messageContent);
                logger.info(`messageContent ${messageContent}`);

                await this.page.type(linkedin.MessageTextArea, messageContent, {
                    delay: 100,
                });

                logger.info("message typed");
                await this.page.click(".msg-form__send-button", { delay: 2000 });

                logger.info("send");
                await this.page.keyboard.press('Escape');
                response = { status: 200, message: "Message send successfully" }
            } else {
                logger.info(`Not Connected`);
                response = { status: 400, message: "looks like lead not connected yet" }
            }
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async init() {

        try {
            // await page.setDefaultNavigationTimeout(60000);
            let cookiesFile = `./cookies/cookies_${process.env.UserName}.json`;
            if (cookiesFile && !await this.checkLoggedIn()) {
                logger.info(cookiesFile)

                // load cookies
                const cookiesString = await fs.readFile(cookiesFile);
                const cookies = JSON.parse(cookiesString);
                await this.page.setCookie(...cookies);
                logger.info('Cookies set it up');
                await this.page.goto(linkedin.CONNECTION_PAGE, {
                    waitUntil: "load",
                });
                await this.page.screenshot({ path: './assets/screenshots/init.png' });
                // await helper.uploadImg(`./assets/screenshots/init.png`, "init.png");
                logger.info('Home page loaded');
            }
            if (!await this.checkLoggedIn()) {
                await this.page.screenshot({ path: './assets/screenshots/init.png' });
                // await helper.uploadImg(`./assets/screenshots/init.png`, "init.png");
                logger.info('not logged in');
                await this.page.goto(linkedin.LOGIN_PAGE, {
                    waitUntil: "load",
                });
                await this.login();
            }
            logger.info('browser loaded');

        } catch (e) {
            throw e;
        }
    }

    async checkLoggedIn() {
        let cookies = await this.page.cookies();

        if (cookies.length) {
            cookies = cookies.filter(e => e.name == 'li_at')
        }
        logger.info(`cookies length ${cookies.length}`);
        return (cookies.length ? true : false);
    }

    /**
     * Checking the Profile has the action buttons [Connect,Pending,Follow]
     * @returns {Promise<string>}
     */
    async getProfileState() {
        logger.info(`Crawling::getProfileState`);
        let action_text = await this.page.$eval(linkedin.ProfilePageBtn, (element) => {
            return element.querySelector('button').innerText;
        })
        logger.info(`lead state was ${action_text}`);
        return action_text;
    }

    /**
     * Based on the Lead Profile button text, it will return the action to be performed
     * @param {String} action_text 
     * @returns 
     */
    async connectAction(action_text, messageContent) {
        let response = '';
        if (messageContent) {
            messageContent = await this.processMessageContent(messageContent);
        }
        switch (action_text) {
            case "Follow":
                response = await this.sendReqInMoreTab('More', messageContent);
                break;
            case "Connect":
                response = await this.sendReqInMainActionTab('Connect', messageContent);
                break;
            case "Pending":
                logger.info(`Pending True`);
                response = { status: 400, message: "Connection Pending" }
                break;
            case "Message":
                let is_Pending = await this.isPending();
                if (is_Pending) {
                    logger.info(`is_Pening : ${is_Pending}`);
                    response = { status: 400, message: "Connection Pending" }
                }
                break;
            default:
                logger.info(`default ${action_text}`);
                response = { status: 200, message: "Already Connected" }
                break;
        }
        let leadname = await this.getLeadName();
        response.firstName = leadname[0];
        response.lastName = leadname[1];
        logger.info(`response ${JSON.stringify(response)}`);
        return response;
    }

    async getLeadName() {
        let leadName = await this.page.$eval(linkedin.LEAD_NAME, (element) => {
            return element.innerText;
        });
        logger.info(`leadName ${leadName}`);
        return leadName.split(' ');
    }

    /**
     * Click Connect button from Main connect btn
     * @param {string} action 
     * @returns 
     */
    async sendReqInMainActionTab(action = 'Connect', messageContent) {

        let selector = linkedin.ProfilePage_more_btn;
        let profilebtns = await this.getElement(selector, action)
        profilebtns.click();

        if (messageContent) {
            await this.page.waitForXPath(linkedin.conneconnectBtn_message_tab);
            const mgsbtn = await this.page.$x(linkedin.conneconnectBtn_message_tab);
            await this.page.waitForTimeout(2000);
            await mgsbtn[0].click();

            await this.page.waitForSelector(linkedin.connectReqMgsTextArea);
            await this.page.click(linkedin.connectReqMgsTextArea);

            await this.page.type(linkedin.connectReqMgsTextArea, messageContent, {
                delay: 300,
            });
        }

        await this.page.waitForXPath(linkedin.connectBtn_2);
        const connectBtn_2 = await this.page.$x(linkedin.connectBtn_2);
        await this.page.waitForTimeout(2000);
        await connectBtn_2[0].click();
        return { status: 200, message: "Request sent successfully" }
    }

    /**
     * Send Req from by clicking more tab
     * @param {string} action 
     * @returns 
     */
    async sendReqInMoreTab(action = 'More', messageContent) {
        logger.info(`sendReqInMoreTab`);
        // Getting the More tab 
        let profilebtns = await this.getElement(linkedin.ProfilePage_action_btn, action)
        profilebtns.click();

        await this.page.waitForSelector(linkedin.ProfilePage_More_dropdown);
        return this.moreDropDown('Connect', messageContent);
    }

    /**
     * After more dropdown open check the leand has profile btn and perform connect action
     * @param {string} action 
     * @returns 
     */
    async moreDropDown(action = 'Connect', messageContent) {
        try {
            // Clicking the Connect
            let element = await this.getElement(linkedin.ProfilePage_More_dropdown_action_text, action);
            await this.page.waitForTimeout(2000);
            await element.click();

            await this.page.waitForSelector('.send-invite');

            // First Popupmodal
            // let actionElement = await this.getElement(linkedin.ProfilePage_more_dropdown_connect_btn, action)

            // await this.page.waitForTimeout(2000);
            // await actionElement.click();


            if (messageContent) {
                await this.page.waitForXPath(linkedin.conneconnectBtn_message_tab);
                const mgsbtn = await this.page.$x(linkedin.conneconnectBtn_message_tab);
                await this.page.waitForTimeout(2000);
                await mgsbtn[0].click();

                await this.page.waitForSelector(linkedin.connectReqMgsTextArea);
                await this.page.click(linkedin.connectReqMgsTextArea);
                await this.page.type(linkedin.connectReqMgsTextArea, messageContent, {
                    delay: 300,
                });
            }

            // Second Popupmodal for aproval
            await this.page.waitForXPath(linkedin.connectBtn_2);
            const connectBtn_2 = await this.page.$x(linkedin.connectBtn_2);
            await this.page.waitForTimeout(2000);

            await connectBtn_2[0].click();
            logger.info(`Request send successfully`);
            return { status: 200, message: "Request send successfully" };
        }
        catch (error) {
            if (error?.stack) {
                logger.error(error.stack);
            } else {
                logger.error(error);
            }
            return { status: 400, message: "Request not sent" };
        }

    }

    /**
     * Checking the lead has elements based on the selector and text;
     * @param {string} selector 
     * @param {string} action 
     * @param {boolean} accuracy // if true then it will check the text is equal to the action text
     * @returns {element}
     */
    async getElement(selector, action, accuracy = false) {
        logger.info(`getElement for ${action}`);
        let actionElement = await this.page.evaluateHandle((action, selector, accuracy) => {
            let actionBtns = document.querySelectorAll(selector);
            // logger.info(JSON.stringify(actionBtns));
            let actionElement;
            [...actionBtns].forEach((btn) => {
                if (accuracy) {
                    if (btn.innerHTML.trim() === action) {
                        actionElement = btn;
                    }
                } else {
                    if (btn.innerHTML.includes(action)) {
                        actionElement = btn;
                    }
                }
                // let btTextMatch = (btn != null) ? btn.innerHTML.includes(action) : false;
                // // logger.info(btn.innerHTML);
                // if (btTextMatch) {
                //     actionElement = btn;
                // }
            });
            return actionElement;
        }, action, selector, accuracy);
        return actionElement;
    }

    /**
     * Checking the lead was connected or not. In linkedin for connected leads, more tab will have 'Remove Connection' Element
     * @param {string} action 
     * @returns {Promise<string>} boolean
     */
    async canIsend(action = 'Remove Connection') {
        let moreBtn = await this.getElement(linkedin.ProfilePage_action_btn, 'More');
        moreBtn.click();
        await this.page.waitForSelector(linkedin.ProfilePage_More_dropdown);
        let is_connected = await this.checkElement(linkedin.ProfilePage_More_dropdown_action_text, action);
        logger.info(`is_connected ${is_connected}`);
        return is_connected;
    }

    /**
     * Check the lead has Pending Btn in the main tab.if its pengind then willl return true
     * @returns {Promise<string>} boolean
     */
    async isPending() {
        let mainBtnCheck = await this.checkElement(linkedin.ProfilePage_action_btn, 'Pending');
        // if first check passed return the status
        if (mainBtnCheck) {
            return mainBtnCheck;
        }
        let moreBtn = await this.getElement(linkedin.ProfilePage_action_btn, 'More');

        moreBtn.click();
        let secondCheck = await this.checkElement(linkedin.ProfilePage_More_dropdown_action_text, 'Pending');
        // if pending button in more dropdown
        logger.info(`Pening check on mainBtnCheck ${mainBtnCheck}`);
        logger.info(`Pening check on secondCheck ${secondCheck}`);
        return secondCheck;
    }

    /**
     * Checking the elemet is avaliable or not but element text
     * @param {string} selector 
     * @param {string} action 
     * @returns {Promise<string>} boolean
     */
    async checkElement(selector, action) {
        logger.info(`checkElement :: arguments ::` + JSON.stringify(arguments));
        let actionElement = await this.page.evaluateHandle((action, selector) => {
            let actionBtns = document.querySelectorAll(selector);
            let actionElement = false;
            [...actionBtns].forEach((btn) => {
                let btTextMatch = (btn != null) ? btn.innerHTML.includes(action) : false;
                if (btTextMatch) {
                    console.log(btn.innerHTML);
                    actionElement = true;
                }
            });
            return actionElement;
        }, action, selector);
        return actionElement.jsonValue();
    }

    /**
     * Check lead current status based on the trigger type
     */
    async getEventStatus(triggerType, leadUrl) {
        logger.info(`Crawling::getEventStatus arguments:: ` + JSON.stringify(arguments));
        let status;
        // await this.page.goto(leadUrl, { waitUntil: "load" });
        switch (triggerType) {
            case "INVITE_ACCEPTED":
                let is_pending = await this.isPending();
                status = !is_pending;
                break;

            default:
                break;
        }
        logger.info(`triggerType:: ${triggerType} status ${status}`);
        return status;
    }

    async goToLeadPage(leadUrl) {
        logger.info(`Crawling::goToLeadPage arguments:: ` + JSON.stringify(arguments));
        await this.page.goto(leadUrl, { waitUntil: "load" });
    }
    static async enterOtp(topic_payload, page) {
        logger.info("Crawling::enterOtp");
        if (topic_payload.topic_type == "OTP_VERIFICATION") {
            let otp = topic_payload.topic_data.otp;
            logger.info(`otp ${otp}`);
            await page.type(linkedin.OTP_INPUT, otp, {
                delay: 100,
            });
            logger.info(`Otp Entered`);
            await page.waitForSelector(linkedin.OTP_SUBMIT);
            await page.click(linkedin.OTP_SUBMIT, { delay: 3000 });
            await page.waitForNavigation({ waitUntil: "load" });
            let isLoggedIn = await Crawling.loggedInCheck(page);
            if (isLoggedIn) {
                logger.info(`Logged in ${isLoggedIn}`);

                const cookies = await page.cookies();
                await fs.writeFile(`./cookies/cookies_${process.env.UserName}.json`, JSON.stringify(cookies, null, 2));
                return page;
            } else {
                logger.info('Not logged in');
                const title = await page.title();
                logger.error(`Something went wrong on login,Page Title : ${title}`);
                let error = await page.evaluate(() => {
                    return !!document.querySelector('.form__input--error') // !! converts anything to boolean
                });
                await page.screenshot({ path: './assets/screenshots/example.png' });
                // await helper.uploadImg(`./assets/screenshots/example.png`, "example.png");
                if (error) {
                    logger.info('Login Failure');
                }
                return null;
            }
        }

    }
    /**
     * using this function for static call
     * @param {*} page 
     * @returns 
     */
    static async loggedInCheck(page) {
        let cookies = await page.cookies();

        if (cookies.length) {
            cookies = cookies.filter(e => e.name == 'li_at')
        }
        logger.info(`cookies length ${cookies.length}`);
        return (cookies.length ? true : false);
    }

    async processMessageContent(message) {
        let names = await this.getLeadName();
        let replace = new Object();
        replace.FIRST_NAME = names?.[0] ?? '';
        replace.LAST_NAME = names?.[1] ?? '';
        console.log(replace);
        let messagecontent = this.getLiterals(message, replace);
        console.log(messagecontent);
        return messagecontent;
    }

    getLiterals($target, $replace) {
        const result = $target.replace(/@#([^#]+)#/g, (match, key) => {
            return $replace[key] !== undefined ? $replace[key] : " ";
        });
        return result;
    }
    /**
     * Get the List of leads from search URL.
     * @param {*} searchUrl
     *  @param {*} Number of leads to be fetched
     * @returns {Promise<Array>}
     */
    async getLeadsFromUrl(searchLeadConfigItems) {
        logger.info(`getLeadsFromUrl :: arguments ::` + JSON.stringify(arguments));
        try {
            if (!(searchLeadConfigItems?.searchLeadIds && searchLeadConfigItems?.searchLeadIds.length)) {
                console.log(searchLeadConfigItems);
                let filterLink = searchLeadConfigItems?.searchUrl;
                let is_lastPage = false;
                let count_reached = false;
                let page_no = 1;
                let no_of_count = 0;
                let connection_count = searchLeadConfigItems?.leadsNumberToCollect ?? 0;
                let connectionLists = [];

                while (!is_lastPage && !count_reached) {
                    await this.page.goto(`${filterLink}&page=${page_no}`, { waitUntil: ['networkidle2'] });

                    if (await this.checkSearchResult(this.page)) {
                        throw { message: "No Result Found Check your search URL" };
                    }
                    await this.page.waitForTimeout(2000);

                    let connections = await this.page.evaluate((no_of_count, connection_count, linkedin) => {
                        window.scrollTo(0, 2000);
                        let profiles = [];
                        let results = document.querySelectorAll(linkedin.ConnectionListPage);

                        for (const result of results) {

                            if (no_of_count >= connection_count) {
                                break;
                            }
                            let actions = result.querySelector(linkedin.ConnectionListPageAction);
                            if (!(actions.innerHTML.includes("Connect") || actions.innerHTML.includes("Follow"))) {
                                continue;
                            }
                            var profile_name = result.querySelector(linkedin.ConnectionName) != null ? result.querySelector(linkedin.ConnectionName).innerText : '';

                            var profile_link = result.querySelector(linkedin.ConnectionLink) != null ? (result.querySelector(linkedin.ConnectionLink).href).split('?')[0] : '';

                            var profile_pic = result.querySelector('.presence-entity__image')?.src ?? '';

                            if (profile_name == '' || profile_link == '') {
                                continue;
                            }
                            let names = profile_name.split(' ');
                            let profile = {
                                lead_id: profile_link,
                                lead_url: profile_link,
                                extra_info: {
                                    profile_name: profile_name,
                                    first_name: (names.length) ? names[0] : '',
                                    last_name: (names.length >= 1) ? names[1] : '',
                                    profile_pic: profile_pic,
                                }
                            };

                            profiles.push(profile);
                            no_of_count++;
                        }
                        return profiles;
                    }, no_of_count, connection_count, linkedin);

                    no_of_count += Object.keys(connections).length;
                    connectionLists.push(connections);
                    logger.info(`no_of_count ${no_of_count}`);
                    await this.page.waitForTimeout(2000);
                    await this.page.waitForSelector('.artdeco-pagination__button--next');
                    is_lastPage = await this.page.$('.artdeco-pagination__button--next[disabled]') !== null ? true : false;
                    count_reached = (no_of_count >= connection_count) ? true : false;

                    if (!is_lastPage) {
                        page_no++;
                    }
                }

                let profileList = [];
                connectionLists.map((list) => {
                    list.map(l => profileList.push(l));
                });
                logger.info(profileList);
                return profileList;
            }
        } catch (error) {
            if (error?.stack) {
                logger.error(error.stack);
            } else {
                logger.error(error);
            }
        }
    }

    async checkSearchResult(page) {
        const check = await page.$(linkedin.No_Result_Found);
        logger.info(`check ${check}`);
        if (check == null) {
            return false;
        } else {
            return true;
        }
    }

    async follow() {
        try {
            let action_text = await this.getProfileState();
            console.log(action_text);
            let response = '';
            let canSend = await this.canIsend();
            if (canSend) {
                response = { status: 200, message: "Already Connected" }
                return response;
            }
            switch (action_text) {
                case "Follow":
                    let followBtn = await this.getElement(linkedin.FollowBtn, "Follow")
                    followBtn.click();
                    response = { status: 200, message: "Followed successfully" }
                    break;
                case "Connect":
                case "Pending":
                    let profilebtns = await this.getElement(linkedin.ProfilePage_action_btn, "More")
                    profilebtns.click();
                    await this.page.waitForSelector(linkedin.ProfilePage_More_dropdown);
                    // Click the more btn and follow
                    if (await this.checkElement(linkedin.ProfilePage_More_dropdown_action_text, "Follow")) {
                        let element = await this.getElement(linkedin.ProfilePage_More_dropdown_action_text, "Follow", true);
                        await this.page.waitForTimeout(2000);
                        await element?.click();
                        response = { status: 200, message: "Followed successfully" }
                    } else if ((await this.checkElement(linkedin.ProfilePage_More_dropdown_action_text, "Unfollow")) ||
                        await this.checkElement(linkedin.ProfilePage_action_btn, 'Following')) {
                        // Check pending leads are already followed or not
                        response = { status: 200, message: "Already Followed" }
                    }
                    break;
                case "Message":
                    let is_Pending = await this.isPending();
                    logger.info(`is_Pending : ${is_Pending}`);
                    if (is_Pending) {
                        let profilebtns = await this.getElement(linkedin.ProfilePage_action_btn, "More")
                        profilebtns.click();
                        await this.page.waitForSelector(linkedin.ProfilePage_More_dropdown);
                        if (await this.checkElement(linkedin.ProfilePage_More_dropdown_action_text, "Follow")) {
                            let element = await this.getElement(linkedin.ProfilePage_More_dropdown_action_text, "Follow", true);
                            await this.page.waitForTimeout(2000);
                            await element?.click();
                            response = { status: 200, message: "Followed successfully" }
                        } else if ((await this.checkElement(linkedin.ProfilePage_More_dropdown_action_text, "Unfollow")) ||
                            await this.checkElement(linkedin.ProfilePage_action_btn, 'Following')) {
                            // Check pending leads are already followed or not
                            response = { status: 200, message: "Already Followed" }
                        }
                        // response = { status: 400, message: "Connection Pending" }
                    }
                    break;
                default:
                    logger.info(`Already Connected- default ${action_text}`);
                    response = { status: 200, message: "Already Followed" }
                    break;
            }
            logger.info(response);
            return response;
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = {
    Crawling
};