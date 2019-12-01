import get from 'lodash/get';
import set from 'lodash/set';

export const gherkinContext = {};

export const prepareUsers = () => {
  // users
  gherkinContext.users = {};
};

export const getPropertyPath = (propertyPath) => get(gherkinContext, propertyPath);

export const setPropertyPath = (propertyPath, value) => {
  set(gherkinContext, propertyPath, value);
};

export const reset = () => {
  Object.keys(gherkinContext).filter((key) => key !== 'env' && key !== 'users').forEach((key) => {
    delete gherkinContext[key];
  });
  // env
  if (!process.env.SERVER_URL) {
    gherkinContext.env = 'local';
  }
};
