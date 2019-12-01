import Logger from '../../utils/logger';
import playerService from '../playerService';
import playerDataService from '../playerDataService';
import dataSet from './dataSet';

const logger = new Logger('test:playerService-suite');
playerDataService.injectFetch(global.fetch);

describe('playerService suite', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('task1 - list() should return a list of players ordered by ids ', async (done) => {
    fetch.mockResponses([JSON.stringify(dataSet), { status: 200, headers: { 'content-type': 'application/json' } }]);
    let players;
    try {
      players = await playerService.list();
    } catch (err) {
      logger.error('err=%j', err);
    }
    const ids = players.map((player) => player.id);
    expect(ids).toEqual([17, 52, 65, 95, 102]);

    done();
  });

  test('task1 - list() should return an empty list of players when received status !== 200 ', async (done) => {
    fetch.resetMocks();
    fetch.mockResponses([
      JSON.stringify({ error: 'failing web service' }),
      { status: 503, headers: { 'content-type': 'application/json' } },
    ]);
    let players;
    try {
      players = await playerService.list();
    } catch (err) {
      logger.error('err=%j', err);
    }
    expect(players).toEqual([]);

    done();
  });

  test('tzsk2 -get(17) should return player 17 ', async (done) => {
    fetch.mockResponses([JSON.stringify(dataSet), { status: 200, headers: { 'content-type': 'application/json' } }]);
    let player;
    try {
      player = await playerService.get(17);
    } catch (err) {
      logger.error('err=%j', err);
    }
    const player17 = {
      id: 17,
      firstname: 'Rafael',
      lastname: 'Nadal',
      shortname: 'R.NAD',
      sex: 'M',
      country: {
        picture: 'https://i.eurosport.com/_iss_/geo/country/flag/large/2203.png',
        code: 'ESP',
      },
      picture: 'https://i.eurosport.com/_iss_/person/pp_clubteam/large/435121.jpg',
      data: {
        rank: 1,
        points: 1982,
        weight: 85000,
        height: 185,
        age: 33,
        last: [1, 0, 0, 0, 1],
      },
    };

    expect(player).toEqual(player17);

    done();
  });

  test('task2 - get(170) should return undefined ', async (done) => {
    fetch.mockResponses([JSON.stringify(dataSet), { status: 200, headers: { 'content-type': 'application/json' } }]);
    let player;
    try {
      player = await playerService.get(170);
    } catch (err) {
      logger.error('err=%j', err);
    }
    expect(player).toBeUndefined();

    done();
  });
});
