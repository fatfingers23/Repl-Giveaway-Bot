"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const builders_1 = require("@discordjs/builders");
exports.getData = new builders_1.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');
class PingCommand {
    constructor(interaction) {
        Object.defineProperty(this, "interaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.interaction = interaction;
    }
    async execute() {
        await this.interaction.reply("Pong!");
    }
}
exports.default = PingCommand;
//# sourceMappingURL=ping.js.map