const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    category: "info",
    aliases: [ "inv" ],
    description: "Invite Link",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute(message, args) {
        let embed = new MessageEmbed()
            .setTitle("Click Here")
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setColor(message.client.color)
            .setURL("https://discord.com/api/oauth2/authorize?client_id=" + message.client.user.id + "&permissions=8&scope=bot")
            .addField('Or Clik Link Below', "https://discord.com/api/oauth2/authorize?client_id=" + message.client.user.id + "&permissions=8&scope=bot")
            .setFooter(`Request by: ${message.author.tag}`);
        message.channel.send(embed);
    }
}