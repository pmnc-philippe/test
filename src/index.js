import path from 'path';
import server from './server/server';
import Logger from './server/utils/Logger';
import { ConfigUtils } from './server/utils/configUtils';

const logger = new Logger('test:server');
Logger.configure({ logLevel: ConfigUtils.logLevel() });

logger.debug('CONFIG_INFO= %j', ConfigUtils.info());

logger.info('NODE_CONFIG_DIR= %s', path.resolve(process.env.NODE_CONFIG_DIR));

const port = ConfigUtils.port();
server.listen(port, (err) => {
  if (err) {
    logger.error('failing to start error=%j', err);
    throw err;
  }
  logger.info('> server ready on http://localhost:%s', port);
});
