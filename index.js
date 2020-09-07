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

    // memberChannel.send(`Welcome <@${m.user.id}>. Shut the fuck up.`);
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

    // memberChannel.send(`<@${m.user.id}> got evicted. dam bro.`);
    memberChannel.send(memberEmbed)
})

client.once("messageUpdate", (oldMessage, newMessage) => {
    const channel = oldMessage.guild.channels.cache.find(ch=>ch.name == "logs")

    const messageEmbed = new Discord.MessageEmbed();
    messageEmbed.setColor("#0082ff")
    messageEmbed.setTitle("Message Edited")
    messageEmbed.addField("Old Message", `${oldMessage.content}`)
    messageEmbed.addField("New Message", `${newMessage.content}`)
    messageEmbed.setFooter("Developed by Zack#2222")

    channel.send(messageEmbed)
})

client.once("ready", () => {
    console.log(`${client.user.username}#${client.user.discriminator} is online.`)

    client.user.setActivity('Minervaa', {type: "LISTENING"})
})

client.login(process.env.TOKEN)