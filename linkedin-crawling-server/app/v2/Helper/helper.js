const { createLogger, transports, format, exceptions } = require("winston");
const fs = require('fs');
var request = require('request');

module.exports = {
    isEmpty: function (object) {
        return Object.keys(object).length === 0
    },
    findObj: (objArray, id) => {
        const obj = objArray.find((obj, index) => {
            return obj.step_id == id;
        })
        return obj;
    },
    // UTC time
    now: () => {
        return new Date().toISOString().slice(0, 19).replace("T", " ");
    },
    sleep: async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    // Logger
    logger: createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.printf((info) =>
                JSON.stringify({
                    t: info.timestamp,
                    l: info.level,
                    m: info.message
                }) + ','
            )
        ),
        transports: [
            new transports.Console({ level: "silly" }),
            new transports.File({ filename: `./logs/v1_logs_${new Date().toISOString().slice(0, 10)}.log`, level: "silly" }),
        ],
    }),

    // Logger end

    checkFileExists: async (file) => {
        return fs.promises.access(file, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false)
    },
    uploadImg: (image_path,image_name) => {
        var options = {
            'method': 'POST',
            'url': 'https://upload.uploadcare.com/base/',
            'headers': {
                'Content-Type': 'multipart/form-data'
            },
            formData: {
                'UPLOADCARE_PUB_KEY': 'd9a12e8040bb7559f3e2',
                'UPLOADCARE_STORE': 'auto',
                'my_file': {
                    'value': fs.createReadStream(image_path),
                    'options': {
                        'filename': image_name,
                        'contentType': null
                    }
                },
                'metadata[subsystem]': 'uploader',
                'metadata[pet]': 'cat'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            return response;
        });
    }
};