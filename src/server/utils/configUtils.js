import config from 'config';
import process from 'process';
import path from 'path';

class ConfigUtils {
  static serverConfig = config.util.toObject();

  static logLevel() {
    const { logs: { level = 'debug' } = {} } = ConfigUtils.serverConfig;
    return level;
  }

  static services() {
    const { services = {} } = ConfigUtils.serverConfig;
    return services;
  }

  static configServices(service) {
    const { services = {} } = ConfigUtils.serverConfig;
    return services[service];
  }

  static standardErrorMessage() {
    return ConfigUtils.serverConfig.standardErrorMessage;
  }

  static exposedApiEndpoint() {
    return ConfigUtils.serverConfig.exposedApiEndpoint;
  }

  static port() {
    return ConfigUtils.serverConfig.port;
  }

  static info() {
    return {
      configDir: path.resolve(process.env.NODE_CONFIG_DIR),
      config: ConfigUtils.serverConfig,
    };
  }
}

export { ConfigUtils };
