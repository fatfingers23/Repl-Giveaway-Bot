"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const tslib_1 = require("tslib");
const builders_1 = require("@discordjs/builders");
const giveawayService_1 = tslib_1.__importDefault(require("../services/giveawayService"));
exports.getData = new builders_1.SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a giveaway')
    .addStringOption(option => option.setName('duration').setDescription("How long the giveaway will last. ex 1h, 1d, 1w").setRequired(true))
    .addIntegerOption(option => option.setName('winners').setDescription("How many people can win.").setRequired(true))
    .addStringOption(option => option.setName('prize').setDescription("What the prize is").setRequired(true));
class CreateCommand {
    constructor(interaction) {
        Object.defineProperty(this, "interaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "giveawayService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.interaction = interaction;
        this.giveawayService = new giveawayService_1.default();
    }
    async execute() {
        const duration = this.interaction.options.getString('duration');
        const winners = this.interaction.options.getInteger('winners');
        const prize = this.interaction.options.getString('prize');
        console.log(duration, winners, prize);
        // const giveaway: Giveaway = {
        //   stillRunning: true,
        // }
        // await this.interaction.reply("Haven't made it that far m8");
        const message = this.interaction.channel?.send("This is some fancy giveaway message that is pretty");
        console.log(message);
    }
}
exports.default = CreateCommand;
//# sourceMappingURL=create.js.map