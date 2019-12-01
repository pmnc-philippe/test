import servicePlayer from './services/playerService';
import Logger from './utils/Logger';

const logger = new Logger('test:routes');

const serveListPlayers = async (req, resp) => {
  debugger;
  try {
    const players = await servicePlayer.list();

    return resp.send({ players });
  } catch (err) {
    logger.error('/players error=%j', err);
    return resp.status(503).json({ error: err.message });
  }
};

const serveGetPlayer = async (req, resp) => {
  const { id } = req.params;
  try {
    if (typeof id === 'undefined') {
      const error = { error: 'WRONG_PARAMETER' };
      logger.error('/players/ error=%j', error);
      return resp.status(400).json(error);
    }
    const player = await servicePlayer.get(id);
    if (!player) {
      return resp.status(404).json({ error: 'NOT_FOUND' });
    }
    return resp.status(200).send({ player });
  } catch (err) {
    logger.error('/players/%s error=%j', id, err);
    return resp.status(503).json({ error: err.message });
  }
};

const routes = (server) => {
  server.get('/players', serveListPlayers);
  server.get('/players/:id', serveGetPlayer);
  return server;
};

export default routes;
