const Discord = require('discord.js');
const dotenv = require('dotenv');

const client = new Discord.Client();

dotenv.config();

const prefix = '>';

client.on('message', msg => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;

    // Command Handler
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, msg, args, Discord)
    } catch(e) {
        console.log(e.stack)
    }
});

client.on("guildMemberAdd", m => {
    const memberChannel = m.guild.channels.cache.find(channel => channel.name == "members")
    const memberRole = m.guild.roles.cache.find(role => role.id == "563430153229828097")

    const newMemberEmbed = new Discord.MessageEmbed();
    newMemberEmbed.setColor("#0080ff")
    newMemberEmbed.setTitle("New Member Joined")
    newMemberEmbed.setDescription(`<@${m.user.id}>`)
    newMemberEmbed.setTimestamp();
    newMemberEmbed.setFooter("Developed by Zack#2222")

    memberChannel.send(newMemberEmbed)
    m.roles.add(memberRole)
})

client.on("guildMemberRemove", m => {
    const memberChannel = m.guild.channels.cache.find(channel => channel.name == "members")

    const memberEmbed = new Discord.MessageEmbed();
    memberEmbed.setColor("#ff0000")
    memberEmbed.setTitle("Member Left")
    memberEmbed.setDescription(`<@${m.user.id}>`)
    memberEmbed.setTimestamp();

    memberChannel.send(memberEmbed)
})

// client.once("messageUpdate", async(oldMessage, newMessage) => {

//     const channel = oldMessage.guild.channels.cache.find(ch=>ch.name == "logs")

//     const messageEmbed = new Discord.MessageEmbed();
//     messageEmbed.setColor("#0082ff")
//     messageEmbed.setTitle(`${oldMessage.author.username}#${oldMessage.author.discriminator} edited a message in #${oldMessage.channel.name}`)
//     messageEmbed.addFields(
// 		{ name: 'Old Message', value: `${oldMessage.content}`, inline: true },
// 		{ name: 'New Message', value: `${newMessage.content}`, inline: true }
// 	)
//     messageEmbed.setFooter("Developed by Zack#2222")
//     messageEmbed.setThumbnail(oldMessage.author.displayAvatarURL())

//     channel.send(messageEmbed)
// })

client.once("messageDelete", deletedMsg => {
    const logChannel = deletedMsg.guild.channels.cache.find(ch => ch.name == "logs");

    const msgEmbed = new Discord.MessageEmbed();
    msgEmbed.setColor("#0082ff");
    msgEmbed.setTitle(`Message deleted in #${deletedMsg.channel.name} by ${deletedMsg.author.username}`);
    msgEmbed.addField("Deleted Message", deletedMsg.content);
    msgEmbed.setFooter("Developed byt Zack#2222");

    logChannel.send(msgEmbed)

});

client.once("ready", () => {
    console.log(`${client.user.username}#${client.user.discriminator} is online.`)

    client.user.setActivity('Minervaa', {type: "LISTENING"})
})

client.login(process.env.TOKEN)