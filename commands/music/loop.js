const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    category: "music",
    aliases: [ "repeat" ],
    description: "Stop Music",
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

        let mode = message.client.distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";

        // Queue status template
        const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription("Set repeat mode to **" + mode + "**")
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(thing);
    }
}