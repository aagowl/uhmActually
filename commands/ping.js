const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setname('ping')
        .setDescription('for every ping there shall be a pong');

    async execute(interaction) {
        await interaction.reply('Pong!');
    },
}

