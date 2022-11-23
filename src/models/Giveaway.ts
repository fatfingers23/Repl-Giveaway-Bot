import type {DateTime} from "luxon";

export type Giveaway = {
	hostId: string,
	stillRunning?: Boolean;
	winnerIds?: Array<string>;
	participants?: Array<string>
	messageId: string;
	guildId: string;
	description?: string;
	endTime?: String | DateTime;
	possibleNumberOfWinners: number
}