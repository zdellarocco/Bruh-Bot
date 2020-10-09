const Discord = require('discord.js')

exports.run = (client, msg, args) => {
    let muteUser = msg.mentions.members.first();
    let muteRole = msg.guild.roles.cache.find(r=>r.name=="muted")

    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("You do not have permission.")
    if(muteUser.hasPermission("MANAGE_GUILD")) return msg.channel.send("You cannot unmute that user.");

    if(!muteUser) return msg.channel.send("That user does not exist.");
    if(!args[0]) return msg.channel.send("There is no specified user to mute.")
    if(!muteRole) return msg.channel.send("There is no muted role. Please add it.")
    if(!msg.member.roles.some(r=>r.name=="muted")) return msg.channel.send("They are not muted.")

    muteUser.roles.remove(muteRole)
    msg.channel.send("Unmuted.")
}