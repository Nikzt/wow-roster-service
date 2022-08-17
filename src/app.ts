import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import jsonDb from './db/jsonDb';
import { Player, Roster } from './models/models';

const app = express()
const port = 4141
const host = '0.0.0.0';

jsonDb.initDbFromTestData();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Roster Service Online');
});

app.get('/roster/:id', async (req, res) => {
  const rosterId = req.params.id;
  const roster = await jsonDb.dbGetRosterById(rosterId);
  if (!roster)
    res.sendStatus(404);
  else
    res.send(roster);
})

app.post('/roster', async (req, res) => {
  const roster = req.body as Roster;
  const result = jsonDb.dbUpdateRoster(roster);
  if (result)
    res.sendStatus(200);
  else
    res.sendStatus(500);
})

app.post('/roster/:rosterId/player/:playerId', async (req, res) => {
  const player = req.body as Player;
  const rosterId = req.params.rosterId;
  const playerId = req.params.playerId
  const result = jsonDb.dbUpdatePlayer(rosterId, playerId, player);
  if (result)
    res.sendStatus(200);
  else
    res.sendStatus(500);
})

app.listen(port, host, () => {
  return console.log(`Express is listening at http://${host}:${port}`)
})
