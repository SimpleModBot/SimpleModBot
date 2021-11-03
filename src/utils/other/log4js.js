const log4js = require(`log4js`);

module.exports = async () => {
    log4js.configure({
        appenders: {
            errlog: {
                type: `file`,
                filename: `./utils/logs/errors.log`
            },
            infolog: {
                type: `file`,
                filename: `./utils/logs/information.log`
            },
            wlog: {
                type: `file`,
                filename: `./utils/logs/warnings.log`
            },
            console: {
                type: `console`,
                layout: {
                    type: `pattern`,
                    pattern: `%[[%d] - %f{1} - [%p] %] LN:%l   %m`
                }
            },
            errconsole: {
                type: `console`,
                layout: {
                    type: `pattern`,
                    pattern: `%[[%d, %f{1}] - [%p] %] LN:%l   %m`
                }
            }
        },
        categories: {
            default: {
                enableCallStack: true,
                appenders: [`errlog`, `errconsole`],
                level: `all`,
            },
            info: {
                enableCallStack: true,
                appenders: [`infolog`],
                level: `info`,
            },
            warn: {
                enableCallStack: true,
                appenders: [`wlog`, `console`],
                level: `warn`
            }
        }
    });

    const log = log4js.getLogger(`info`);
    log.info(`SMB Logged In.`);
};