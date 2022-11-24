import {SlashCommandBuilder} from '@discordjs/builders'
import type {CommandInteraction} from 'discord.js'
import GiveawayService from '../services/giveawayService';
import type {Giveaway} from "../models/Giveaway";
import { DateTime} from 'luxon'
import {EmbedBuilder} from "discord.js";
// const timestring = require('timestring');

export const getData = new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all of the current giveaways in this server.')

export default class ListCommand {

    constructor(interaction: CommandInteraction) {
        this.interaction = interaction;
        this.giveawayService = new GiveawayService();
    }

    protected interaction: CommandInteraction;
    protected giveawayService: GiveawayService;

    public async execute(): Promise<void> {

        const guildId = this.interaction.guildId;
        //HACK to a proper unwrap
        const giveaways = await this.giveawayService.getGuildsCurrentGiveaways(guildId ?? "");
        const message = this.createMessage(giveaways);
        console.log(message);

        await this.interaction.reply({embeds: [message]});
    }

    private createMessage(giveaways: Array<Giveaway>): EmbedBuilder {
        const fields = giveaways.map(giveaway => {
            //HACK not unwrapping properly
            let relativeEndTime: DateTime = DateTime.fromISO(giveaway.endTime?.toString() ?? "");

            return {
                name: `${giveaway.description}`,
                value: `[${giveaway.messageId}](https://Link) | Winners: ${giveaway.possibleNumberOfWinners} | Hosted By <@${giveaway.hostId}> | Ends: ${relativeEndTime.toRelative()}`,
                inline: false
            }
        })

        return new EmbedBuilder().setTitle("Current Giveaways").setDescription("Displays the current giveaways happening")
            .addFields(fields)

    }
}

