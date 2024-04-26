import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { pino } from 'pino';

import userController from './user/user.controller';
import categoryController from './categories/category.controller';
import topicController from './topics/topic.controller';
import contentController from './content/content.controller';

const app: Express = express();
app.use(cors());
app.use(express.json());

const logger = pino({ name: 'server start' });

app.get('/ping',(req: Request, res: Response, next: NextFunction) => {
    res.send("pong");
});

// ROUTES
app.use('/users', userController);
app.use('/categories', categoryController);
app.use('/topics', topicController);
app.use('/contents', contentController);

export { app, logger };