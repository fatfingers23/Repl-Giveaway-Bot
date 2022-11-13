import type { Client } from '@replit/database'
import type { Giveaway } from '../models/Giveaway'
const db = require("@replit/database");

export default class GiveawayService {

  protected dbClient: Client;
  protected giveawaysKey: String = "giveaways"
  constructor() {
    this.dbClient = new db();
  }

  public async createGiveaway(giveaway: Giveaway): Promise<Giveaway> {
    console.log(giveaway);
    //todo write to a key as well called currentgiveaways that holds the ids of all the current giveaways
    var test = await this.dbClient.pushArray(`${this.giveawaysKey}:current_giveaways`, { guildId: giveaway.guildId, messageId: giveaway.messageId });
    console.log(test)
    await this.dbClient.set(`${this.giveawaysKey}:${giveaway.guildId}:${giveaway.messageId}`, giveaway);
    return giveaway;
  }

  public async selectAWinner() {

  }
}