import {SlashCommandBuilder} from '@discordjs/builders'
import type {CommandInteraction} from 'discord.js'
import {MessageActionRow, MessageButton} from "discord.js";
import GiveawayService from '../services/giveawayService';
import type {Giveaway} from "../models/Giveaway";
import {DateTime} from 'luxon'
import {MessageButtonStyles} from "discord.js/typings/enums";

const timestring = require('timestring');

export const getData = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a giveaway')
    .addStringOption(option => option.setName('duration').setDescription("How long the giveaway will last. ex 1h, 1d, 1w").setRequired(true))
    .addIntegerOption(option => option.setName('winners').setDescription("How many people can win.").setRequired(true))
    .addStringOption(option => option.setName('prize').setDescription("What the prize is").setRequired(true))


export default class CreateCommand {

    constructor(interaction: CommandInteraction) {
        this.interaction = interaction;
        this.giveawayService = new GiveawayService();
    }

    protected interaction: CommandInteraction;
    protected giveawayService: GiveawayService;

    public async execute(): Promise<void> {
        const duration = this.interaction.options.getString('duration');
        const winners = this.interaction.options.getInteger('winners');
        const prize = this.interaction.options.getString('prize');
        console.log(duration, winners, prize);
        let timeTillInSeconds = 0;
        let rightNow = DateTime.now();
        try {
            timeTillInSeconds = timestring(duration, 's')
        } catch (e) {
            await this.interaction.reply("There was an error parsing the time you gave")
        }
        let endTime = rightNow.plus({seconds: timeTillInSeconds});
        const message = await this.interaction.channel?.send("This is some fancy giveaway message that is pretty");
        const user = this.interaction.member?.user;
        if (user == null) {
            //Unlikely, but makes the ide happy to check for null
            throw  new Error("There was not a user for this command");
        }
        if (message && this.interaction.guildId) {
            const giveaway: Giveaway = {
                stillRunning: true,
                messageId: message.id,
                guildId: this.interaction.guildId,
                description: prize ?? '',
                possibleNumberOfWinners: winners ?? 0,
                endTime: endTime,
                hostId: user.id
            }
            await this.giveawayService.createGiveaway(giveaway);
            const embedGiveawayMessage = this.giveawayService.createGiveawayMessage(giveaway);
            const actionRow = new MessageActionRow().addComponents(new MessageButton()
                .setCustomId('giveaway').setLabel('Enter Giveaway').setStyle(MessageButtonStyles.PRIMARY));
            message.edit({embeds: [embedGiveawayMessage], components: [actionRow]});
            // {
            //     "channel_id": `${context.params.event.channel_id}`,
            //     "content": "",
            //     "tts": false,
            //     "components": [
            //     {
            //         "type": 1,
            //         "components": [
            //             {
            //                 "style": 1,
            //                 "label": `Sign Up`,
            //                 "custom_id": `row_0_button_0`,
            //                 "disabled": false,
            //                 "type": 2
            //             }
            //         ]
            //     }
            // ],
            //     "embeds": [
            //     {
            //         "type": "rich",
            //         "title": `Description of giveaway`,
            //         "description": ````\n{timeleft}\nHosted By: {<@user_id>}\nEntries: {entries count}\nWinners: <@winner1_id> <@winner2_id>\n````,
            //     "color": 0x00FFFF
            // }
            // ]
            // }


        }
        await this.interaction.reply("Your giveaway has successfully been created.");
    }
}

