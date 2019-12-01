import {
  Given, Before, BeforeAll, setDefaultTimeout,
} from 'cucumber';

import { gherkinContext, reset, prepareUsers } from '../gherkinContext';

BeforeAll(() => {
  prepareUsers();
});

Before(() => {
  reset();
});

Given(/^I am (.*)$/, async (userName) => {
  const userKey = userName.toLowerCase();
  if (userKey === 'public') {
    gherkinContext.user = null;
  }
  gherkinContext.user = gherkinContext.users[gherkinContext.env];
});

Given(/^timeout to be (.*) seconds$/, async (seconds) => {
  const milliseconds = (seconds + 1) * 60;
  setDefaultTimeout(milliseconds);
});
