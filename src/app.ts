import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
const port = 4141
const host = '0.0.0.0';

app.get('/', (_req, res) => {
  res.send('Hello World!')
});

app.get('/roster/:id', (req, res) => {
  const rosterId = req.params.id;
  fs.readFile(path.resolve('data', 'rosters.json'), 'utf8', (err, data) => {
    const rosters = JSON.parse(data);
    const roster = rosters[rosterId];
    if (!roster)
      res.sendStatus(404);
    else
      res.send(roster);
  })
})

app.listen(port, host, () => {
  return console.log(`Express is listening at http://${host}:${port}`)
})
