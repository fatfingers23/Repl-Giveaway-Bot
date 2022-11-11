import GiveawayService from '../../src/services/giveawayService'
import type { Giveaway } from '../../src/models/Giveaway'
import { Client } from 'better-replit-db';
const mocked.set.mockReturnValue(db: Client = require('better-replit-db')
jest.mock('better-replit-db');
const mocked: jest.Mocked<Client> = db as any;
)
let giveawayClass: GiveawayService;

beforeEach(() => {

  giveawayClass = new GiveawayService(db);
});

describe("test the give away service", () => {
  it("should be able to create a giveaway", () => {
    const giveAway: Giveaway = {
      winnerIds: [],
      stillRunning: true,
      messageId: 0,
      guildId: 0,
      description: "",
      endTimeinMins: 0
    };
    mocked.set.mockReturnValue(giveAway)
    var result = giveawayClass.createGiveaway(giveAway);
    // expect(mocked.set.m).toBeTruthy;
    expect(result).toBeInstanceOf(Object)
  })
})