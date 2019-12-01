import { Then } from 'cucumber';
import expect from 'expect';

import { gherkinContext, getPropertyPath } from '../gherkinContext';

Then('Should return response code {int}', (statusCode) => {
  const expectedCode = parseInt(statusCode, 10);
  const { response } = gherkinContext;
  const responseCode = response.statusCode || (response.res && response.res.statusCode);
  expect(responseCode).toEqual(expectedCode);
});

Then('Should return response in json format', () => {
  const { response } = gherkinContext;
  expect(response.res.headers['content-type']).toContain('application/json');
});

Then(/^Should return an object with "(.*)"$/, (dataKey) => {
  const { response } = gherkinContext;
  expect(response.body).toBeDefined();
  const data = getPropertyPath(`response.body.${dataKey}`);
  expect(data).toBeDefined();
});

Then('Should return an object with errors', () => {
  const { response } = gherkinContext;
  expect(response.body).toBeDefined();
  expect(response.body.errors).toBeDefined();
});

Then(/^Should "(.*)" have (\d+) or more items$/, (dataKey, min) => {
  const items = getPropertyPath(`response.body.${dataKey}`);
  expect(items.length).toBeGreaterThanOrEqual(min);
});

Then(/^Should "(.*)" have (\d+) items$/, (dataKey, length) => {
  const items = getPropertyPath(`response.body.${dataKey}`);
  expect(items).toHaveLength(length);
});

Then(/^Should "(.*)" is equal to "(.*)"$/, (dataKey, value) => {
  const data = getPropertyPath(`response.body.${dataKey}`);
  expect(data).toEqual(value);
});
