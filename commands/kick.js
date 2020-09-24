const Discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config();
exports.run = (client, msg, args, Discord) => {
    const kickUser = msg.mentions.members.first();
    const kickReason = args[1];
    const loggingChannel = msg.guild.channels.cache.find(ch => ch.name == "logs")

    const noPermEmbed = new Discord.MessageEmbed();
    noPermEmbed.setColor("#ff0000");
    noPermEmbed.setTitle("Error")
    noPermEmbed.setDescription("You cannot perform this command.")

    const noPermEmbed2 = new Discord.MessageEmbed();
    noPermEmbed2.setColor("#ff0000");
    noPermEmbed2.setTitle("Error")
    noPermEmbed2.setDescription("That user cannot be kicked")

    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPermEmbed)
    if(kickUser.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPermEmbed2)

    if(!kickUser) return msg.channel.send("**That user does not exist**");

    if(!args[0]) return msg.channel.send("**Please specify a user**");

    const kickEmbed = new Discord.MessageEmbed();
    kickEmbed.setColor("#ffff00");
    kickEmbed.setThumbnail(kickUser.user.displayAvatarURL());
    kickEmbed.setTitle(`Member kicked by ${msg.author.username}#${msg.author.discriminator}`);
    kickEmbed.setDescription(`<@${kickUser.user.id}>`);
    kickEmbed.setFooter(`Developed by Minervaa#2222`);

    if(!kickReason) {
        kickUser.kick();
    } else {
        kickUser.kick(kickReason);
    }

    loggingChannel.send(kickEmbed)
}