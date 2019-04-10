import * as Winston from "winston";

const path = "logs/";
const TIMESTAMP_T_INDEX: number = 19;
const JSON_INDEX: number = 2;

const alignedWithColorsAndTime = Winston.format.combine(
    Winston.format.colorize(),
    Winston.format.timestamp(),
    Winston.format.align(),
    Winston.format.printf((info) => {
        const {
            timestamp,
            level,
            message,
            ...args
        } = info;

        const ts = timestamp.slice(0, TIMESTAMP_T_INDEX).replace("T", " ");
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, JSON_INDEX) : ""}`;
    }),
);

const logger = Winston.createLogger({
    format: alignedWithColorsAndTime,
    transports: [
        new Winston.transports.Console({}),
        new Winston.transports.File({
            filename: `${path}/info.log`,
            level: "info",
        }),
        new Winston.transports.File({
            filename: `${path}/error.log`,
            level: "error",
        }),
    ],
});

export default logger;
