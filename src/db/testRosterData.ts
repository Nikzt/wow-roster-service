import { RosterDb, WoWClassEnum, WoWSpecEnum } from "../models/models";

const testRosterData: RosterDb = {
  "NorthrendCasual": {
    id: "NorthrendCasual",
    players: {
      "Bence": {
        id: "Bence",
        info: {
          name: "Bence"
        },
        characters: [
          {
            name: "Zalgo",
            class: WoWClassEnum.warrior,
            mainSpec: WoWSpecEnum.warriorArms,
          }
        ],
        mainCharacterName: "Zalgo",
      },
      "Bram": {
        id: "Bram",
        info: {
          name: "Bram"
        },
        characters: [
          {
            name: "Tygerz",
            class: WoWClassEnum.druid,
            mainSpec: WoWSpecEnum.druidFeralTank,
          }
        ],
        mainCharacterName: "Tygerz",
      }
    }
  }
}

export default testRosterData;
