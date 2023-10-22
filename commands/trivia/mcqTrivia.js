/******* Multiple Choice Trivia *******/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcq_trivia')
        .setDescription('test your knowledge with these crazy quizzes'),

    async execute(interaction) {
        await interaction.reply('Pong!');
    },
}