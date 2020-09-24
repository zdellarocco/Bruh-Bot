const Discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config();

exports.run = (client, msg, args) => {
    const serverEmbed = new Discord.MessageEmbed();
    serverEmbed.setColor("#0082ff");
    serverEmbed.setTitle("Server Info");
    serverEmbed.setThumbnail(msg.guild.iconURL());
    serverEmbed.setDescription(`**${msg.guild}**'s information`);
    serverEmbed.addField("Owner", `The owner of this server is ${msg.guild.owner}`);
    serverEmbed.addField("Member Count", `This server has ${msg.guild.memberCount} members`);
    serverEmbed.addField("Emoji Count", `This server has ${msg.guild.emojis.cache.size} emojis`);
    serverEmbed.addField("Roles Count", `This server has ${msg.guild.roles.cache.size} roles.`);
    serverEmbed.setFooter(`Developed by Minervaa#2222`)

    msg.channel.send(serverEmbed)
}