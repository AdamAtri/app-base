import { Router } from 'express';
import { threadList } from '../data/thread-data';

const threadRouter = Router();

threadRouter.get('/getList', (req, res) => {  
  const offset = +req.query.offset || 0;
  const limit = +req.query.limit || undefined;
  const start = offset;
  const finish = offset + (limit || threadList.length);
  console.log('offset', offset, 'limit', limit, 'finish', finish);
  const threads = threadList.slice(start, finish);
  res.json(threads);
});

export { threadRouter };