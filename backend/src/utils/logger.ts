import pino from "pino";
import pretty from "pino-pretty";
import dayjs from "dayjs";

const log = pino(pretty({
  colorize: true
}));

export default log;
