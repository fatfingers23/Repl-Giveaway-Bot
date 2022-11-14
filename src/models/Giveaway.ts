export type Giveaway = {
  stillRunning?: Boolean;
  winnerIds?: Array<number>;
  participants?: Array<number>
  messageId: number;
  guildId: number;
  description?: string;
  endTimeInMins?: number;
  possibleNumberOfWinners: number
}