"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    prefix: '!',
    token: process.env.DISCORD_TOKEN,
    botApplicationId: process.env.APPLICATION_ID,
    setCommandsByGuild: process.env?.BY_GUILD,
    devGuildId: process.env?.GUILD_ID,
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
};
//# sourceMappingURL=config.js.map