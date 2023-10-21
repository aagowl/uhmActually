const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// run when client is ready
client.once(Events.ClientReady, c => {
    console.log(`Bot is alive and logged in as ${c.user.tag}`);
});

// Log in
client.login(token);
