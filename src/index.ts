import { Client, Interaction, Events, CommandInteraction, ButtonInteraction } from 'discord.js';
import config from './config';
const { intents, prefix, token } = config;


import { PingCommand, CreateCommand, ListCommand } from './commands/index';
import { SignUp } from './actions';

const commandsMap = {
	"ping": PingCommand,
	"create": CreateCommand,
	"list": ListCommand
}

const actionMap = {
	"giveaway": SignUp
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


client.on(Events.ClientReady, async () => {
	console.log(`Logged in as: ${client.user?.tag}`);

	const servers = client.guilds.cache.size
	console.log(`Online on ${servers} servers: ${client.guilds.cache.map(guild => guild.name).join(', ')}`)

});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {

	try {


		if (interaction instanceof CommandInteraction) {

			const commandName = interaction.commandName;
			// @ts-ignore
			const Command = commandsMap[commandName];
			const commandClass = new Command(interaction);
			await commandClass.execute();
		}

		if (interaction instanceof ButtonInteraction) {
			const actionId = interaction.customId
			// @ts-ignore
			const Action = actionMap[actionId];
			const actionClass = new Action(interaction);
			await actionClass.execute();
		}

	} catch (error) {
		console.log(error)
	}

})

client
	.on("debug", console.log)
	.on("warn", console.log);
client.login(token);

