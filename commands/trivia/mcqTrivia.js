/******* Multiple Choice Trivia *******/

const { SlashCommandBuilder } = require('discord.js');
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM("");
const jQuery = require('jquery')(dom.window);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcq_trivia')
        .setDescription('test your knowledge with these crazy quizzes'),

    async execute(interaction) {
        let question;

        await jQuery.getJSON( 'https://opentdb.com/api.php?amount=1',  function(data) {
            question = data.results;
        }); 

        console.log(question);
        const message = `**Catagory:** ${question[0].category}\n**Difficulty: **${question[0].difficulty}\n**Question:** ${question[0].question}`;
        await interaction.reply(message);
        setTimeout(() => {  interaction.followUp(`**Answer:${question[0].correct_answer}**`); }, 10000);
        
        
    },
}