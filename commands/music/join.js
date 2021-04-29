const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "join",
    category: "music",
    aliases: [ "j" ],
    description: "Join Voice Channel",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute(message, args) {
        if (!message.guild.me.voice.channel) {
            message.member.voice.channel.join();

            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
                .setDescription("**Join** the voice channel.")
                .setFooter(`Request by: ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send(thing);
        } else {
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
                let thing = new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`You must be in the same channel as ${message.client.user}`);
                return message.channel.send(thing)
            }
        }
    }
}