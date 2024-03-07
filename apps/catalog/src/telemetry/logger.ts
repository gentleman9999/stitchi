import pino from "pino";

const makeLogger = () => {
  const logger = pino({
    depthLimit: 5,
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      target: "pino-pretty",
    },
  });

  return logger;
};

export default makeLogger;
