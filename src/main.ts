import dotenv from 'dotenv';
import express, { type Express } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 5000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
