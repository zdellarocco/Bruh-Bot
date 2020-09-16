const Discord = require('discord.js')

exports.run = (client, msg, args) => {

    const noPermEmbed = new Discord.MessageEmbed();
    noPermEmbed.setColor("#ff0000");
    noPermEmbed.setTitle("Error")
    noPermEmbed.setDescription("You cannot perform this command.")

    const noPermEmbed2 = new Discord.MessageEmbed();
    noPermEmbed2.setColor("#ff0000");
    noPermEmbed2.setTitle("Error")
    noPermEmbed2.setDescription("That user cannot be banned")

    const banUser = msg.mentions.members.first();
    const banReason = args[1]

    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(noPermEmbed)
    if(banUser.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPermEmbed2)

    if(!kickUser) return msg.channel.send("**That user does not exist**")

    if(!args[0]) return msg.channel.send("**Please specify a user**")

    if(banReason) {
        banUser.ban()
    } else {
        banUser.ban(banReason)
    }
}