/******* Rsearches wikipedia for a users inputed term *******/

const { SlashCommandBuilder } = require('discord.js');
const { accessToken } = require("../../config.json");
const { email } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search wikipedia for a specific topic!')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The query to search!')
                .setRequired(true)),

    async execute(interaction) {
        // parameter settings, for back end
        const project = 'wikipedia';
        const lang = "en";
        const limit = "5";

        //Parameters set by users
        const query = interaction.options.getString('query');

        const url = `https://api.wikimedia.org/core/v1/${project}/${lang}/search/title?q=${query}&limit=${limit}`;

        const response = await fetch( url,
            {
                headers: {
                    'Authorization': accessToken,
                    'Api-User-Agent': `uhmActually (${email})`
                }
            }
        );
        const responseFile = await response.json();
        // probably more than a horrible ineffiencent way to do anything but...
        const pages = responseFile.pages;
        const titles = [];
        const descriptions = [];
        
        // loops through results to list the title and description of the pages
        for (const result of pages){
            titles.push(pages[result].title);
            descriptions.push(pages[result].description);
        }

        await interaction.reply(`# Results for ${query}:\n`);
    },
}