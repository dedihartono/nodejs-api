import { Dialect } from 'sequelize/types';

interface SequelizeConfig {
  dialect: Dialect;
  host: string;
  username: string;
  password: string;
  database: string;
  [key: string]: unknown; // Additional options
}

interface EnvironmentConfig {
  [key: string]: SequelizeConfig;
}

const getEnvironmentConfig = (envPrefix: string): SequelizeConfig => ({
  dialect: (process.env[`${envPrefix}_DIALECT`] as Dialect) || 'mysql',
  host: process.env[`${envPrefix}_HOST`] || 'localhost',
  username: process.env[`${envPrefix}_USERNAME`] || 'root',
  password: process.env[`${envPrefix}_PASSWORD`] || '',
  database: process.env[`${envPrefix}_NAME`] || 'test_db',
});

const config: EnvironmentConfig = {
  production: {
    ...getEnvironmentConfig('DB'),
  },
  staging: {
    ...getEnvironmentConfig('DB_STAGING'),
  },
  development: {
    ...getEnvironmentConfig('DB_TEST'),
  },
  test: {
    ...getEnvironmentConfig('DB_TEST'),
  },
};

export default config;
