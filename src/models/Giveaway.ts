export type Giveaway = {
  stillRunning: Boolean;
  winnerIds: Array<number>;
  messageId: Number;
  guildId: Number;
  description: String;
  endTimeinMins: Number;
}