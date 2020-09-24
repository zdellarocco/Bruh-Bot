const Discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config();
exports.run = (client, msg, args) => {
    const banUser = msg.mentions.members.first();
    const banReason = args[1]
    const logChannel = msg.guild.channels.cache.find(ch=>ch.name=="logs");
    
    const noPermEmbed = new Discord.MessageEmbed();
    noPermEmbed.setColor("#ff0000");
    noPermEmbed.setTitle("Error")
    noPermEmbed.setDescription("You cannot perform this command.")

    const noPermEmbed2 = new Discord.MessageEmbed();
    noPermEmbed2.setColor("#ff0000");
    noPermEmbed2.setTitle("Error")
    noPermEmbed2.setDescription("That user cannot be banned")

    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(noPermEmbed)
    if(banUser.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPermEmbed2)

    if(!banUser) return msg.channel.send("**That user does not exist**")

    if(!args[0]) return msg.channel.send("**Please specify a user**")

    const banEmbed = new Discord.MessageEmbed();
    banEmbed.setColor("#ff0000");
    banEmbed.setThumbnailI(banUser.user.displayAvatarURL())
    banEmbed.setTitle(`Member Banned by ${msg.author.username}#${msg.author.discriminator}`)
    banEmbed.setDescription(`<@${banUser.user.id}>`)
    banEmbed.setFooter(`Developed by ${process.env.USERNAME}`)

    if(banReason) {
        banUser.ban()
    } else {
        banUser.ban(banReason)
    }

    logChannel.send(banEmbed);
}