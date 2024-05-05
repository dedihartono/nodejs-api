import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import router from './api/v1/routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as path from 'path';
import { sequelizeConnection, i18n } from './libs';
import 'reflect-metadata';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;

const testDatabaseConnection = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log(
      'Connection to the database has been established successfully.',
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

app.use(i18n.init);
app.use((req: Request, res: Response, next: NextFunction) => {
  const locale = req.query.lang?.toString() || 'en';
  i18n.setLocale(locale);
  next();
});

const swaggerPath = path.resolve(
  __dirname,
  '..',
  'docs',
  'swagger',
  'api.yaml',
);
const swaggerDocument = YAML.load(swaggerPath);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));
app.use('/', router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

const startServer = () => {
  app.listen(port, () => {
    console.log(
      `[server]: Server is running at http://localhost:${port} | env: ${process.env.NODE_ENV}`,
    );
  });
};

testDatabaseConnection()
  .then(startServer)
  .catch((error) => {
    console.error('Error testing database connection:', error);
    process.exit(1);
  });
