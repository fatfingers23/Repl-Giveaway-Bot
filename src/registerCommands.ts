import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import commandsData from "./commands/index";
import config from './config';
const { token, setCommandsByGuild, botApplicationId, devGuildId } = config;

const rest = new REST({ version: "9" }).setToken(token?.toString() ?? "");

const commandData = commandsData.map((getData) => {
  const data = getData;
  return data.toJSON();
});

if (setCommandsByGuild && devGuildId) {
  console.log("Setting up commands by guild");
  try {

    rest.put(
      Routes.applicationGuildCommands(botApplicationId || "missing id", devGuildId),
      { body: commandData }
    ).then(x => console.log(x));
  } catch (error: any) {
    console.log(`Register command error on ${devGuildId}`);
    console.log(error);
  }

} else {
  console.log("Setting up commands for all");
  commandData.forEach(async command => {
    await rest.post(Routes.applicationCommands(botApplicationId ?? ""), {
      body: command,
    });
  });
}

