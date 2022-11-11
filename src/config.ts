import { Intents } from 'discord.js';

export default {
  prefix: '!',
  token: process.env.DISCORD_TOKEN,
  botApplicationId: process.env.APPLICATION_ID,
  setCommandsByGuild: process.env?.BY_GUILD,
  devGuildId: process.env?.GUILD_ID,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
}
