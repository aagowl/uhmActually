/* Index.js file, main file

About the project:
This is a project created for technica 2023 by @aagowl aka Abbie Gatsch
For me personally, this project really means a lot because this is the first
hackathon I have ever been to, and thus the first hackathon project I've 
ever made!

This project used the resources given in the discord.js documentation and guide
as well as the wikimedia api documentation.
https://api.wikimedia.org/wiki/Learn#Wikimedia_API_documentation
https://old.discordjs.dev/#/docs/discord.js/main/general/welcome 

This file contains:
- two event listeners
    - client ready
    - client interactions
- client set up
*/

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// even listener for when client is ready
client.once(Events.ClientReady, c => {
    console.log(`Bot is alive and logged in as ${c.user.tag}`);
});

// Log in
client.login(token);

/*******  Command handling *******/
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	
    for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


/******* event listener for interactions *******/
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
		
        // errors pnly visible to people trying to use command
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
