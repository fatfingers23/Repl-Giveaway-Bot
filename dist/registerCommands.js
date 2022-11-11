"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const index_1 = tslib_1.__importDefault(require("./commands/index"));
const config_1 = tslib_1.__importDefault(require("./config"));
const { token, setCommandsByGuild, botApplicationId, devGuildId } = config_1.default;
const rest = new rest_1.REST({ version: "9" }).setToken(token?.toString() ?? "");
const commandData = index_1.default.map((getData) => {
    const data = getData;
    return data.toJSON();
});
if (setCommandsByGuild && devGuildId) {
    console.log("Setting up commands by guild");
    try {
        rest.put(v9_1.Routes.applicationGuildCommands(botApplicationId || "missing id", devGuildId), { body: commandData }).then(x => console.log(x));
    }
    catch (error) {
        console.log(`Register command error on ${devGuildId}`);
        console.log(error);
    }
}
else {
    console.log("Setting up commands for all");
    commandData.forEach(async (command) => {
        await rest.post(v9_1.Routes.applicationCommands(botApplicationId ?? ""), {
            body: command,
        });
    });
}
//# sourceMappingURL=registerCommands.js.map