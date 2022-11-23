import type {DateTime} from "luxon";

export type Giveaway = {
	stillRunning?: Boolean;
	winnerIds?: Array<string>;
	participants?: Array<string>
	messageId: string;
	guildId: string;
	description?: string;
	endTime?: DateTime;
	possibleNumberOfWinners: number
}