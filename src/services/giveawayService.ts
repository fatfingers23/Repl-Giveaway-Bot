import type { Client } from '@replit/database'
import type { Giveaway } from '../models/Giveaway'
import EnduserMessageError from '../errors/EnduserMessageError';
import type {CurrentGiveaway} from "../models/CurrentGiveaway";
const db = require("@replit/database");

export default class GiveawayService {

  protected dbClient: Client;
  protected giveawaysKey: String = "giveaways"
  constructor(client?: Client) {
    this.dbClient = client ?? new db();
  }

  /**
   * Creates a new giveaway
   * @param giveaway
   */
  public async createGiveaway(giveaway: Giveaway): Promise<Giveaway> {
    const currentGiveaway: CurrentGiveaway = {
      messageId: giveaway.messageId,
      guildId: giveaway.guildId
    };
    await this.dbClient.pushArray(`${this.giveawaysKey}:current_giveaways`, currentGiveaway);
    await this.dbClient.set(`${this.giveawaysKey}:${giveaway.guildId}:${giveaway.messageId}`, giveaway);
    return giveaway;
  }

  /**
   * Adds a new participant to the giveaway
   * @param guildId
   * @param messageId
   * @param userId
   */
  public async addAParticipant(guildId: number, messageId: number, userId: number){
    const addNewUser = (giveaway: Giveaway) => giveaway.participants?.push(userId);
    await this.manipulateParticipants(guildId, messageId, addNewUser)
  }

  /**
   * Removes a participant from the giveaway
   * @param guildId
   * @param messageId
   * @param userId
   */
  public async removeAParticipant(guildId: number, messageId: number, userId: number){
    const removeAUser = (giveaway: Giveaway) => {
      const indexOfObject = giveaway.participants?.findIndex(user => {
        return user == userId;
      });
      if (indexOfObject == -1 || indexOfObject === undefined) {
        throw new Error(
            `Was not able to find the user in this giveaway`
        );
      }
      giveaway.participants?.splice(indexOfObject, 1);
    };
    await this.manipulateParticipants(guildId, messageId, removeAUser)

  }

  /**
   * Selects winner(s) at random
   * @param guildId
   * @param messageId
   */
  public async selectAWinner(guildId: number, messageId: number): Promise<Giveaway> {
    const currentGiveawayKey = `${this.giveawaysKey}:${guildId}:${messageId}`;
    let giveaway: Giveaway = (await this.dbClient.get(currentGiveawayKey) as Giveaway);

    for(let i = 0; i < giveaway.possibleNumberOfWinners; i++){
     giveaway = this.selectAWinnerFromGiveAway(giveaway);
    }

    giveaway.stillRunning = false;
    await this.dbClient.deleteArrayItemByValue(`${this.giveawaysKey}:current_giveaways`, 'messageId', messageId);

    await this.dbClient.set(currentGiveawayKey, giveaway);
    return giveaway;
  }

  /**
   * Returns all the current giveaways for a guild
   * @param guildId
   */
  public async getGuildsCurrentGiveaways(guildId: number): Promise<Array<Giveaway>>{
      const currentGiveaways: Array<CurrentGiveaway> = (await this.dbClient.get(`${this.giveawaysKey}:current_giveaways`) as Array<CurrentGiveaway>);
      const currentGuildGiveaways = currentGiveaways.filter(x => x.guildId === guildId);
      let giveawaysToReturn: Array<Giveaway> = [];
      for(const giveawayId of currentGuildGiveaways){
        const giveawayKey = `${this.giveawaysKey}:${giveawayId.guildId}:${giveawayId.messageId}`;
        const giveaway: Giveaway = await (await this.dbClient.get(giveawayKey) as Giveaway);
        giveawaysToReturn.push(giveaway);
      }
      return giveawaysToReturn;
  }

  // public async deleteAGiveaway(guildId: Number, messageId: number){
  //
  // }
  //

  /**
   * Selects a winner logic
   * @param giveaway
   * @private
   */
  private selectAWinnerFromGiveAway(giveaway: Giveaway): Giveaway{
    if(giveaway.participants == null){
      throw new Error("Not enough data provided to make a selection.")
    }
    const length = giveaway.participants.length;
    const indexOfWinner: number = Math.floor(Math.random() * length) as number;
    const winningNumber: number = giveaway.participants[indexOfWinner];
    giveaway.participants.splice(indexOfWinner, 1);
    giveaway.winnerIds?.push(winningNumber);
    return giveaway;
  }

  /**
   * Re rolls a giveaway. Sets the old winners back to participants after selected
   * @param guildId
   * @param messageId
   * @param reRollCount
   */
  public async reRollAGiveaway(guildId: Number, messageId: number, reRollCount?: number): Promise<Giveaway>{
    let giveaway: Giveaway = (await this.dbClient.get(`${this.giveawaysKey}:${guildId}:${messageId}`) as Giveaway);
    const oldWinners = giveaway.winnerIds as Array<number>;
    giveaway.winnerIds = [];
    for(let i = 0; i < giveaway.possibleNumberOfWinners; i++){
      if(reRollCount != i) {
        this.selectAWinnerFromGiveAway(giveaway);
      }
    }
    giveaway.participants = giveaway.participants?.concat(oldWinners);
    await this.dbClient.set(`${this.giveawaysKey}:${guildId}:${messageId}`, giveaway);
    return giveaway;
  }

  /**
   * Logic to select a giveaway and re set it allowing for a callback to manipulate it
   * @param guildId
   * @param messageId
   * @param callback
   * @private
   */
  private async manipulateParticipants(guildId: number, messageId: number, callback: (giveaway: Giveaway) => void){
    const currentGiveawayKey = `${this.giveawaysKey}:${guildId}:${messageId}`;
    let giveaway: Giveaway = (await this.dbClient.get(currentGiveawayKey) as Giveaway);
    if(!giveaway.stillRunning){
      throw new EnduserMessageError('This giveaway is now over.');
    }
    callback(giveaway);
    await this.dbClient.set(currentGiveawayKey, giveaway);
  }

}