/******* simple ping *******/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('for every ping there shall be a pong'),

    async execute(interaction) {
        await interaction.reply('Pong!');
    },
}

