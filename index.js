/**
 * Module Imports
 */
const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { TOKEN, PREFIX, OWNERID, EMBEDCOLOR } = require("./config.json");
const DisTube = require('distube');

const client = new Client({
    disableMentions: "everyone",
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    ws: { intents: Intents.ALL }
});

const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnStop: true, leaveOnEmpty: true });

client.prefix = PREFIX;
client.owner = OWNERID;
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.distube = distube;
client.color = EMBEDCOLOR;


/**
 * Client Events
 */
readdirSync("./events/").forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading Events Client ${eventName}`);
    client.on(eventName, event.bind(null, client));
});

/**
 * Import all commands
 */
readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        console.log(`Loading ${command.category} commands ${command.name}`);
        client.commands.set(command.name, command);
    }
});

/**
 * Error Handler
 */
client.on("disconnect", () => console.log("Bot is disconnecting..."))
client.on("reconnecting", () => console.log("Bot reconnecting..."))
client.on('warn', error => console.log(error));
client.on('error', error => console.log(error));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

/**
 * Distube Events
 */
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("addList", (message, queue, playlist) => {
        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`Added **${playlist.title}** playlist (${playlist.total_items} songs) to the queue`)
            .setThumbnail(playlist.thumbnail)
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(thing);
    })
    .on("addSong", (message, queue, song) => {
        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`Added **${song.name}** - \`[${song.formattedDuration}]\` to the queue`)
            .setThumbnail(song.thumbnail)
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(thing);
    })
    .on("empty", message => {
        let thing = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Channel is empty. Leaving the channel`)
        message.channel.send(thing);
    })
    .on("error", (message, err) => {
        let thing = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`An error encountered: ${err}`)
        message.channel.send(thing);
    })
    .on("finish", message => {
        let thing = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`No more song in queue`)
        message.channel.send(thing);
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
    })
    .on("noRelated", message => {
        let thing = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Can't find related video to play. Stop playing music.`)
        message.channel.send(thing);
    })
    .on("playList", (message, queue, playlist, song) => {
        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`Play **${playlist.title}** playlist (${playlist.total_items} songs)\nNow playing **${song.name}** - \`[${song.formattedDuration}]\``)
            .setThumbnail(playlist.thumbnail)
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(thing);
    })
    .on("playSong", (message, queue, song) => {
        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`Started Playing **${song.name}** - \`[${song.formattedDuration}]\``)
            .setThumbnail(song.thumbnail)
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(thing);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => {
        let thing = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Searching canceled!`)
        message.channel.send(thing);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
            .setFooter(`Enter anything else or wait 60 seconds to cancel`);
        message.channel.send(thing);
    });

client.login(TOKEN);