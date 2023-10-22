const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('page-of-the-day')
        .setDescription('the featured wikipedia page of the day!'),

    async execute(interaction) {
        await interaction.reply('Pong!');
    },
}