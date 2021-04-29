const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "music",
    aliases: [ "s" ],
    description: "Skip Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        if(!queue) {
            let thing = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`There is no music playing.`);
            return message.channel.send(thing);
        }

        message.client.distube.skip(message);
    }
}