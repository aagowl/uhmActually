/******* Returns list of items that happened "on this day" *******/

const { SlashCommandBuilder } = require('discord.js');
const { accessToken } = require("../../config.json");
const { email } = require("../../config.json");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('on-this-day')
        .setDescription('Returns list of items that happened "on this day" in years prior...')
        
        .addStringOption(option =>
			option.setName('month')
				.setDescription('enter a given month')
                .setRequired(true)
                .addChoices(
                    { name: 'December', value: '12' },
                    { name: 'November', value: '11' },
                    { name: 'October', value: '10' },
                    { name: 'September', value: '10' },
                    { name: 'August', value: '10' },
                    { name: 'July', value: '10' },
                    { name: 'June', value: '10' },
                    { name: 'May', value: '10' },
                    { name: 'April', value: '10' },
                    { name: 'March', value: '10' },
                    { name: 'February', value: '10' },
                    { name: 'January', value: '10' },
                ))
            
        .addIntegerOption(option =>
            option.setName('day')
                .setDescription('enter a given day')
                .setRequired(true)
                .setMaxValue(31)
                .setMinValue(1)),

    async execute(interaction) {
        
        // // get wikipedia link of the day!
        // const today = new Date();
        // const year = today.getFullYear();
        // // month + 1 to offset 0 indexing
        // // padStart(); to put those silly little zeros infront of the numbers
        // const month = String(today.getMonth() + 1).padStart(2,'0');
        // const day = String(today.getDate()).padStart(2,'0');
        
        const month = interaction.options.getString('month');
        const day = String(interaction.options.getInteger('day')).padStart(2, '0');
        const date = `${month}/${day}`

        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/2023/${month}/${day}`;

        const response = await fetch( url,
            {
                headers: {
                    'Authorization': accessToken,
                    'Api-User-Agent': `uhmActually (${email})`
                }
            }
        );
        const stats = await response.json();
        const happenings = stats.onthisday;
        console.log(happenings);
        let message = `# On ${date}... `;
        let count = 0

        for (const result of happenings){
            const year = result.year;
            const description = result.text;
            message += `\n**${year}** ${description}`;

            //don't bombard discord, limits happenings shown
            count++;
            if (count > 5){
                break;
            }
        }

        await interaction.reply(message);
    },
}