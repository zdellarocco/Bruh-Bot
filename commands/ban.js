const Discord = require('discord.js')

exports.run = (client, msg, args) => {
    const banUser = msg.mentions.members.first();
    const banReason = args[1]

    if(!kickUser) return msg.channel.send("**That user does not exist**")

    if(!args[0]) return msg.channel.send("**Please specify a user**")

    if(banReason) {
        banUser.ban()
    } else {
        banUser.ban(banReason)
    }
}