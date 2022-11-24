import { IntentsBitField } from 'discord.js';

export default {
  prefix: '!',
  token: process.env.DISCORD_TOKEN,
  botApplicationId: process.env.APPLICATION_ID,
  setCommandsByGuild: process.env?.BY_GUILD,
  devGuildId: process.env?.GUILD_ID,
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages
  ]
}
