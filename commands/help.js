const dotenv = require('dotenv')
dotenv.config();

exports.run = (client, msg, args, Discord) => {
    msg.react("📬")

    helpEmbed = new Discord.MessageEmbed()
    .setTitle("Help")
    .setColor("#03a5fc")
    .addField("**Help command is a work in progress!**", "*Please come back when it's finished!*")
    .setFooter(`Developed by ${process.env.USERNAME}`);

    msg.author.send(helpEmbed)
}