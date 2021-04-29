const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    category: "music",
    aliases: [ "p" ],
    description: "Play Music",
    args: true,
    usage: "<YouTube URL | Video Name | Spotify URL>",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute(message, args) {
        if (!message.guild.me.voice.channel) {
            message.member.voice.channel.join();
        } else {
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
                let thing = new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`You must be in the same channel as ${message.client.user}`);
                return message.channel.send(thing)
            }
        }
        
        try {
            message.client.distube.play(message, args.join(' '))
        } catch (e) {
            let thing = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Error: \`${e}\``);
            return message.channel.send(thing);
        }
    }
}