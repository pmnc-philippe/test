import Logger from '../../utils/logger';
import playerService from '../playerService';

const logger = new Logger('test:playerService-suite');

describe('playerService integration test suite', () => {
  test('task3 - list() should return a list of players ordered by ids ', async (done) => {
    let players;
    try {
      players = await playerService.list();
    } catch (err) {
      logger.error('err=%j', err);
    }
    const ids = players.map((player) => player.id);
    const sortedIds = [...ids];
    sortedIds.sort((id1, id2) => id1 - id2);
    expect(ids).toEqual(sortedIds);
    done();
  });
});
