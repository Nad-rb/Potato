const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "filter",
    category: "music",
    aliases: [ "eq", "equalizer" ],
    description: "Audio Filters",
    args: true,
    usage: "<`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`>",
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

        if (args[0] === "off" && queue.filter) {
            message.client.distube.setFilter(message, queue.filter)
        } else if (Object.keys(client.distube.filters).includes(args[0])) {
            message.client.distube.setFilter(message, args[0])
        }

        // Queue status template
        const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`Current Queue Filter: **${queue.filter || "Off"}**`)
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(thing);
    }
}