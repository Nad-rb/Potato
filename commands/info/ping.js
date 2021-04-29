const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    aliases: [],
    description: "Check Ping Bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Ping : **${message.client.ws.ping}**ms`)
            .setFooter(`Request by: ${message.author.tag}`);
        message.channel.send(embed);
    }
}