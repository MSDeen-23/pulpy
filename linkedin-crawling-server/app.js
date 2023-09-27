const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const user = require('./app/v2/controller/LoginController');
const { runCampaign } = require("./app/v2/controller/CampaignController");
const { logger } = require('./app/v2/Helper/helper');
const { runProducer, runConsumer } = require('./app/v2/Services/Kafka');

dotenv.config({ path: ".env" });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(process.env.UserName);
console.log(process.env.PASS);

app.use('/', require('./app/v2/routes'));
let page;

(async () => {
    try {
        let login_reponse = await user.login();
        page = login_reponse?.page;
        if (page) {
            let isOtpRequried = login_reponse.isOtpRequried;
            console.log(`isOtpRequried ${isOtpRequried}`);
            if (isOtpRequried) {
                await runProducer({
                    "UserName": process.env.UserName,
                    "otp_required": isOtpRequried
                }, process.env.OUT_TOPIC);
            }
            // runCampaign(campaign, page);
            // return
            let topicName = process.env.IN_TOPIC;
            console.log(`topicName ${topicName}`);
            await runConsumer(page, runCampaign, topicName).catch((err) => {
                console.error("error in consumer: ", err)
            })
        } else {
            throw "Login Failed";
        }
    } catch (error) {
        if (error?.stack) {
            logger.error(error.stack);
        } else {
            logger.error(error);
        }
    }
})();
// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });