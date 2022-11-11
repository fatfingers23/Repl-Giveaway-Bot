import type { Client } from 'better-replit-db'
import type { Giveaway } from '../models/Giveaway'
const db = require("better-replit-db");
export default class GiveawayService {

  protected dbClient: Client;

  constructor(dbClient = null) {
    this.dbClient = dbClient ?? db

  }

  public async createGiveaway(giveaway: Giveaway): Promise<Giveaway> {
    console.log(giveaway);
    await this.dbClient.set(`giveaways:${giveaway.guildId}:${giveaway.messageId}`, giveaway)
    return giveaway;
  }

}