import express, { Request, Response } from 'express';
import { getFlats, update } from './flat_model';

const app = express();
const port = 3001;

app.use(express.json());
app.use(function (req: Request, res: Response, next: () => void) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,UPDATE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const response = await getFlats();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/flats/', async (req: Request, res: Response) => {
  try {
    const response = await update();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
