import testRosterData from './testRosterData';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Player, Roster } from '../models/models';

const db = new JsonDB(new Config("rosterDb", true, false, '/'));

const initDbFromTestData = () => {
  for (let rosterId in testRosterData) {
    db.push(`/${rosterId}`, testRosterData[rosterId]);
  }
}

const dbGetRosterById = async (rosterId: string) => {
  let roster = null
  try {
    roster = await db.getObject(`/${rosterId}`);
  } catch (e) {
    console.log(e);
  }
  return roster;
}

const dbUpdateRoster = async (roster: Roster) => {
  try {
    await db.push(`/${roster.id}`, roster);
  } catch (e) {
    return false;
  }
  return true;
}

const dbUpdatePlayer = async (rosterId: string, playerId: string, player: Player) => {
  try {
    const player = await db.exists(`/${rosterId}/players/${playerId}`);
    if (!player) return false;
    await db.push(`/${rosterId}/players/${playerId}`, player);
  } catch (e) {
    console.log(e);
    return false
  }
  return true;
}

const dbGetPlayer = async (rosterId: string, playerId: string) => {
  let player: Player;
  try {
    player = await db.getObject(`/${rosterId}/players/${playerId}`)
  } catch (e) {
    console.log(e);
  }
  return player;
}

export default {
  initDbFromTestData,
  dbUpdateRoster,
  dbUpdatePlayer,
  dbGetRosterById
}
