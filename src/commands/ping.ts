import { SlashCommandBuilder } from '@discordjs/builders'
import type { CommandInteraction } from 'discord.js'

export const getData = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');


export default class PingCommand {

  constructor(interaction: CommandInteraction) {
    this.interaction = interaction;
  }

  protected interaction: CommandInteraction
  public async execute(): Promise<void> {
    await this.interaction.reply("Pong!");

  }
}

