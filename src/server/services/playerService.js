import Logger from '../utils/Logger';
import playerDataService from './playerDataService';

const logger = new Logger('test:service:player');

class PlayerService {
  constructor() {
    this.players = {};
  }

  async getAll() {
    const { status, error, content = {} } = await playerDataService.getAll();
    let players;
    if (status === 200) {
      players = (content.players || []).filter((player) => player && player.id);
      this.players = players.reduce((result, player) => {
        // eslint-disable-next-line no-param-reassign
        result[player.id] = player;
        return result;
      }, {});
    } else {
      logger.error('playerDataService.getAll() status = %d error=%j', status, error);
      this.players = {};
      players = [];
    }
    return players;
  }

  async get(id) {
    // force to load all when empty
    if (Object.keys(this.players).length === 0) {
      await this.getAll();
    }
    return this.players[id];
  }

  async list() {
    const players = await this.getAll();
    players.sort((player1, player2) => player1.id - player2.id);
    return players;
  }
}

export default new PlayerService();
