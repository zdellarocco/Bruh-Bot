const Discord = require('discord.js');
const dotenv = require('dotenv');

const client = new Discord.Client();

dotenv.config();

const prefix = '>';

client.on('message', msg => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;

    // Command Handler
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, msg, args, Discord)
    } catch(e) {
        console.log(e.stack)
    }
})

client.on("ready", () => {
    console.log(`${client.user.username}#${client.user.discriminator} is online.`)
})

client.login(process.env.TOKEN)