import { Sequelize } from 'sequelize';
import { config } from '../config';

const environment = process.env.NODE_ENV || 'development';
const sequelizeConnection = new Sequelize(config[environment]);

export default sequelizeConnection;
