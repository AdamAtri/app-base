import * as express from 'express';
import { threadRouter } from './routes/thread-route';

const app = express();
const PORT = 9191;

app.use('/', (req, res, next) => {
  res.set({'X-Powered-By': "caffiene and sarcasm"});
  next();
});

app.get('/ping', (req, res) => {
  res.status(200).json(true);
});

app.use('/thread', threadRouter);

app.listen(PORT, () => {console.log("API Server listening on:", PORT)});