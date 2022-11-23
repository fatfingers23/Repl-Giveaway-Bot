import { Client, Interaction } from 'discord.js';
import config from './config';
import helpCommand from './commands';
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
			type: 'LISTENING'
		}]
	}
});


client.on("ready", async () => {
	console.log(`Logged in as: ${client.user?.tag}`);

	const servers = client.guilds.cache.size
	console.log(`Online on ${servers} servers: ${client.guilds.cache.map(guild => guild.name).join(', ')}`)

});

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;

	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).split(' ');
		const command = args.shift();

		switch (command) {
			case 'ping':
				const msg = await message.reply('Pinging...');
				await msg.edit(`Pong! The round trip took ${Date.now() - msg.createdTimestamp}ms.`);
				break;

			case 'say':
			case 'repeat':
				if (args.length > 0) await message.channel.send(args.join(' '));
				else await message.reply('You did not send a message to repeat, cancelling command.');
				break;

			case 'help':
				const embed = helpCommand(message);
				embed.setThumbnail(client.user!.displayAvatarURL());
				await message.channel.send({ embeds: [embed] });
				break;
		}
	}
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

