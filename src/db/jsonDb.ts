import testRosterData from './testRosterData';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Roster } from '../models/models';

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

export default {
  initDbFromTestData,
  dbUpdateRoster,
  dbGetRosterById
}
