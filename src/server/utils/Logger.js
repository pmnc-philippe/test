import createDebug from 'debug';

export const logLevels = ['trace', 'debug', 'info', 'warn', 'error'];

/**
 * simple logger based on debug.
 */
export default class Logger {
  static configuration = { logLevel: 'info' };

  static configure(configuration) {
    Logger.configuration = { ...Logger.configuration, ...configuration };
  }

  constructor(channel = 'test:log') {
    this.channel = channel;
    this.debugImpl = createDebug(channel);
    const instance = this;
    logLevels.forEach((level) => {
      instance[level] = (...params) => instance.log(level, ...params);
    });
  }

  getChannel() {
    return this.channel;
  }

  static hasLevel(level) {
    const value = logLevels.indexOf(level);
    const current = logLevels.indexOf(Logger.configuration.logLevel);
    return value >= current;
  }

  log(level, message, ...params) {
    if (!Logger.hasLevel(level)) {
      return;
    }
    const dt = new Date().toISOString();
    this.debugImpl(`${dt}  ${level.toUpperCase()} ${message}`, ...params);
  }
}
