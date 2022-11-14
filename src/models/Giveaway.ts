export type Giveaway = {
	stillRunning?: Boolean;
	winnerIds?: Array<string>;
	participants?: Array<string>
	messageId: string;
	guildId: string;
	description?: string;
	endTimeInMins?: number;
	possibleNumberOfWinners: number
}