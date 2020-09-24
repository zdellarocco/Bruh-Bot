const dotenv = require('dotenv')
dotenv.config();

exports.run = (client, msg, args, Discord) => {
    msg.channel.send("**Pinging...**").then(m => {
        const ping = m.createdTimestamp - msg.createdTimestamp;
        const botPing = Math.round(client.pi)

        const pingEmbed = new Discord.MessageEmbed()
        .setColor("#4287f5")
        .setThumbnail(msg.author.avatarURL)
        .setFooter(`Developed by Minervaa#2222`)
        .addField("Ping", ping);

        m.delete()
        msg.channel.send(pingEmbed)
    });
}