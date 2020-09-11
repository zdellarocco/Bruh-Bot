const Discord = require('discord.js')

exports.run = (client, msg, args, Discord) => {
    const kickUser = msg.mentions.members.first();
    const kickReason = args[1];

    if(!kickUser) return msg.channel.send("There is no user.");

    if(!args[0]) return msg.channel.send("You did not specify a user");

    if(!kickReason) {
        kickUser.kick();
    } else {
        kickUser.kick(kickReason);
    }
}