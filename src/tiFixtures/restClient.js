import supertest from 'supertest';

export const DEFAULT_REST_HEADERS = {
  'Content-Type': 'application/json',
};

export class RestClient {
  constructor(serverUrl) {
    this.headers = {};
    this.token = '';
    this.serverUrl = serverUrl || process.env.SERVER_URL;
  }

  setUrl(serverUrl) {
    this.serverUrl = serverUrl;
  }

  setHeaders(headers = {}) {
    this.headers = { ...DEFAULT_REST_HEADERS, ...headers };
  }

  getUploadHeaders(additionalHeaders = {}) {
    const headers = this.getHeaders(additionalHeaders);
    delete headers['Content-Type'];
    delete headers['content-type'];
    return headers;
  }

  setToken(token = '') {
    this.token = token;
  }

  getRequest() {
    return supertest(this.serverUrl);
  }

  getHeaders(headers = {}) {
    const useHeaders = { ...this.headers, ...headers };
    if (this.token) {
      useHeaders.Authorization = `Bearer ${this.token}`;
    }
    return useHeaders;
  }

  get(url, headers) {
    return this.getRequest().get(url).set(this.getHeaders(headers));
  }
}
export default new RestClient();
