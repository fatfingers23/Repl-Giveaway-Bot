import GiveawayService from '../../src/services/giveawayService'
import type { Giveaway } from '../../src/models/Giveaway'
import { Client } from '@replit/database';

let giveawayClass: GiveawayService;

jest.mock('@replit/database', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        pushArray: () => { },
      };
    })
  };
});

const

  beforeEach(() => {
    giveawayClass = new GiveawayService();
  });

describe("test the give away service", () => {
  it("should be able to create a giveaway", async () => {
    const giveAway: Giveaway = {
      winnerIds: [],
      stillRunning: true,
      messageId: 0,
      guildId: 0,
      description: "",
      endTimeinMins: 0
    };

    var result = await giveawayClass.createGiveaway(giveAway);
    // expect(mocked.set.m).toBeTruthy;
    expect(result).toBeInstanceOf(Object)
  })
})