import type { ButtonInteraction } from 'discord.js'
import GiveawayService from '../services/giveawayService';

export default class SignUp {

	constructor(interaction: ButtonInteraction) {
		this.interaction = interaction;
		this.giveawayService = new GiveawayService();
	}

	protected interaction: ButtonInteraction;
	protected giveawayService: GiveawayService;

	public async execute(): Promise<void> {

		const guildId = this.interaction.guildId ?? "";
		const messageId = this.interaction.message.id;
		const userId = this.interaction.user.id ?? ""
		const giveaway = await this.giveawayService.addAParticipant(guildId, messageId, userId);
		const message = this.giveawayService.createGiveawayMessage(giveaway);
		console.log(giveaway);
		const giveAwayMessage = await this.interaction.channel?.messages.fetch(giveaway.messageId);
		giveAwayMessage?.edit({ embeds: [message] })
		await this.interaction.deferReply();
		await this.interaction.deleteReply();
	}
}

