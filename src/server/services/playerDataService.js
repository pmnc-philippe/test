import nodeFetch from 'node-fetch';
import Logger from '../utils/Logger';
import { ConfigUtils } from '../utils/configUtils';

const config = ConfigUtils.configServices('eurosport');
const logger = new Logger('test:services:player:data');

const defaultOptions = {
  timeout: 5000,
  headers: {
    'content-type': 'application/json',
    'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
  },
};

const responseJson = (response) => {
  if (!response) {
    return Promise.resolve({ status: 503 });
  }
  const contentType = response.headers.get('content-type');
  if (response.bodyUsed) {
    return Promise.resolve({
      status: response.status,
      content: response.body,
      type: contentType,
    });
  }
  let bodyText;
  return response
    .text()
    .then((text) => {
      bodyText = text;
      return JSON.parse(text);
    })
    .then((json) => ({
      status: response.status,
      content: json,
      type: contentType,
    }))
    .catch((err) => {
      logger.error('RESPONSE IS NOT JSON : response.json() err=%j', err);
      return {
        status: 503,
        error: 'response.not.json',
        content: bodyText,
        type: contentType,
      };
    });
};

const responseError = (err, url) => {
  const message = err.message || err;
  logger.error('url: %s message:%s error: %j', url, message, err);
  return { status: err.status || 503, error: message };
};

/**
 * Simple player data service based on node-fetch or jest-fetch-mock.
 */
class PlayerDataService {
  constructor() {
    this.fetch = nodeFetch;
    this.endpoint = config.url;
    this.options = { ...defaultOptions };
  }

  injectFetch(injectedFetch) {
    this.fetch = injectedFetch;
  }

  url(theUrl) {
    return `${this.endpoint}${theUrl}`;
  }

  buildOptions(options = {}) {
    return { ...this.options, ...options };
  }

  getAll() {
    const getAllUrl = '/eurosport-node-developer-recruitment/headtohead.json';
    return this.fetch(this.url(getAllUrl), this.buildOptions({ method: 'GET' }))
      .then(responseJson)
      .catch((err) => responseError(err, this.url(getAllUrl)));
  }
}

export default new PlayerDataService();
