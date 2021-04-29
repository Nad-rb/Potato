const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autoplay",
    category: "music",
    aliases: [ "ap" ],
    description: "AutoPlay Music",
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

        let mode = message.client.distube.toggleAutoplay(message);

        // Queue status template
        const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription("Set autoplay mode to **" + (mode ? "On" : "Off") + "**")
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(thing);
    }
}