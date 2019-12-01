import { When } from 'cucumber';
import Logger from '../../utils/Logger';

import { setPropertyPath, getPropertyPath } from '../../../tiFixtures/gherkinContext';
import restClient from '../../../tiFixtures/restClient';

const logger = new Logger('test:bdd:players');
const endpoint = process.env.END_POINT || '';

When('I get the list of players', async () => {
  const response = await restClient.get(`${endpoint}/players`);
  logger.trace('players=%j', response.body);
  setPropertyPath('response', response);
  setPropertyPath('players', response.body.players);
});

When(/^I get a player with id index = (.*)$/, async (index) => {
  const idx = parseInt(index, 10);
  const players = getPropertyPath('players');
  const response = await restClient.get(`${endpoint}/players/${players[idx].id}`);
  logger.trace('player=%j', response.body);
  setPropertyPath('response', response);
  setPropertyPath('player', response.body.player);
});
