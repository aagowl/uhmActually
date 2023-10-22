const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(_dirname, 'commands');
const command = require(filePath);

// run when client is ready
client.once(Events.ClientReady, c => {
    console.log(`Bot is alive and logged in as ${c.user.tag}`);
});

// Log in
client.login(token);

// Command handling
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    // checks to ensure that there is proper information to run
    if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
        console.log(interaction);

        const command = interaction.client.commands.get(interaction.commandName);

        // does that command even exist?
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
