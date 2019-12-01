import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { ConfigUtils } from './utils/configUtils';
import router from './routes';

const server = express();

server.use(morgan('tiny'));
server.use(bodyParser.json());

server.use(ConfigUtils.exposedApiEndpoint(), router(express.Router()));

export default server;
