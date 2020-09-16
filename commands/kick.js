const Discord = require('discord.js')

exports.run = (client, msg, args, Discord) => {

    const noPermEmbed = new Discord.MessageEmbed();
    noPermEmbed.setColor("#ff0000");
    noPermEmbed.setTitle("Error")
    noPermEmbed.setDescription("You cannot perform this command.")

    const noPermEmbed2 = new Discord.MessageEmbed();
    noPermEmbed2.setColor("#ff0000");
    noPermEmbed2.setTitle("Error")
    noPermEmbed2.setDescription("That user cannot be kicked")

    const kickUser = msg.mentions.members.first();
    const kickReason = args[1];

    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPermEmbed)
    if(kickUser.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPermEmbed2)

    if(!kickUser) return msg.channel.send("There is no user.");

    if(!args[0]) return msg.channel.send("You did not specify a user");

    if(!kickReason) {
        kickUser.kick();
    } else {
        kickUser.kick(kickReason);
    }
}