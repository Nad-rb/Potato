const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    category: "music",
    aliases: [ "dc" ],
    description: "Leave Voice Channel",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        if(!queue) {
            message.member.voice.channel.leave();
        } else {
	    message.client.distube.stop(message);
	    message.member.voice.channel.leave();
	}

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription("**Leave** the voice channel.")
            .setFooter(`Request by: ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send(thing);
    }
}
