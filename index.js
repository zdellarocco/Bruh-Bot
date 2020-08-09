const Discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Bruh Moment")

    client.user.setActivity("Minervaa on soundcloud", {type: "LISTENING"})
})

client.on('message', msg => {

});

client.login(process.env.TOKEN)