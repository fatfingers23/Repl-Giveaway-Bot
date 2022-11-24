import { Client, Interaction } from 'discord.js';
import config from './config';
const { intents, prefix, token } = config;


import { PingCommand, CreateCommand, ListCommand } from './commands/index';
const commandsMap = {
	"ping": PingCommand,
	"create": CreateCommand,
	"list": ListCommand
}

const client = new Client({
	intents,
	presence: {
		status: 'online',
		activities: [{
			name: `${prefix}help`,
		}]
	}
});


client.on("ready", async () => {
	console.log(`Logged in as: ${client.user?.tag}`);

	const servers = client.guilds.cache.size
	console.log(`Online on ${servers} servers: ${client.guilds.cache.map(guild => guild.name).join(', ')}`)

});

client.on('interactionCreate', async (interaction: Interaction) => {

	if (!interaction.isCommand()) return;
	const commandName = interaction.commandName;
	console.log(commandName);
	// @ts-ignore
	const Command = commandsMap[commandName];

	const commandClass = new Command(interaction);
	commandClass.execute();
})

client
	.on("debug", console.log)
	.on("warn", console.log);
client.login(token);

