const { SlashCommandBuilder } = require('discord.js');
const { accessToken } = require("../../config.json");
const { email } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('page-of-the-day')
        .setDescription('the featured wikipedia page of the day!'),

    async execute(interaction) {
        
        // get wikipedia link of the day!
        const today = new Date();
        const year = today.getFullYear();
        // month + 1 to offset 0 indexing
        // padStart(); to put those silly little zeros infront of the numbers
        const month = String(today.getMonth() + 1).padStart(2,'0');
        const day = String(today.getDate()).padStart(2,'0');
        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;

        const response = await fetch( url,
            {
                headers: {
                    'Authorization': accessToken,
                    'Api-User-Agent': `uhmActually (${email})`
                }
            }
        );
        stats = await response.json();

        const title = stats.tfa.normalizedtitle;
        const summary = stats.tfa.extract;

        await interaction.reply(`# Today\'s featured Wikipedia article is: ${title}\n${summary}`);
    },
}