import {SlashCommandBuilder} from '@discordjs/builders'
import type {CommandInteraction} from 'discord.js'
import GiveawayService from '../services/giveawayService';
// import type {Giveaway} from "../models/Giveaway";
// import { DateTime} from 'luxon'
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

        //Luxon toRelative should show time as in xp time till
        await this.interaction.reply("Your giveaway has successfully been created.");
    }
}

