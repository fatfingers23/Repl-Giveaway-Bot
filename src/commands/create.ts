import {SlashCommandBuilder} from '@discordjs/builders'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import GiveawayService from '../services/giveawayService';
import type {Giveaway} from "../models/Giveaway";
import {DateTime} from 'luxon'

const timestring = require('timestring');

export const getData = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a giveaway')
    .addStringOption(option => option.setName('duration').setDescription("How long the giveaway will last. ex 1h, 1d, 1w").setRequired(true))
    .addIntegerOption(option => option.setName('winners').setDescription("How many people can win.").setRequired(true))
    .addStringOption(option => option.setName('prize').setDescription("What the prize is").setRequired(true))


export default class CreateCommand {

    constructor(interaction: ChatInputCommandInteraction) {
        this.interaction = interaction;
        this.giveawayService = new GiveawayService();
    }

    protected interaction: ChatInputCommandInteraction;
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
                messageId: message.id.toString(),
                guildId: this.interaction.guildId,
                description: prize ?? '',
                possibleNumberOfWinners: winners ?? 0,
                endTime: endTime,
                hostId: user.id
            }
            await this.giveawayService.createGiveaway(giveaway);
            const embedGiveawayMessage = this.giveawayService.createGiveawayMessage(giveaway);

            const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder()
                .setCustomId('giveaway').setLabel('Enter Giveaway').setStyle(ButtonStyle.Primary));


            message.edit({embeds: [embedGiveawayMessage], components: [actionRow]});
        }
        await this.interaction.reply("Your giveaway has successfully been created.");
    }

    public async buttonAction(): Promise<void>{
        
    }
}

