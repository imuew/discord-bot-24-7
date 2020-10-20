const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');

const ytdl = require("ytdl-core");

var version = '1.2';

var servers  = {};

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('sno is online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command == 'youtube') {
        client.commands.get('youtube').execute(message, args);

    }

});

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {

        case "poll":
            const Embed = new Discord.MessageEmbed()
                .setColor(0xFFC300)
                .setTitle("Setting up poll...")
                .setDescription("-poll (Description) to start a new poll");

            if (!args[1]) {
                message.channel.send(Embed);
                break;
            }

            let msgArgs = args.slice(1).join(" ");

            message.channel.send(":notepad_spiral: : " + "**" + msgArgs + "**").then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
                message.delete({ timeout: 3000 }).catch(console.error);
            });

            break;
    }

})

client.on('message',message => {

    let args = message.content.substring(prefix.length).split(" ")

    switch (args[0]) {
        case 'sno':

        function play(connection, message){
            var server = servers[message.guild.id];

            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

            server.queue.shift();

            server.dispatcher.on("end",function(){
                if(server.queue[0]){
                    play(connection, message);
                }else {
                    connection.disconnect();
                }
            });

        }

            if(!args[1]){
                message.channel.send("there was no link");
                return;
            }

            if(!message.member.voice.channel){
                message.channel.send("imagine not being in a channel");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.Voice.Channel.join().then(function(connection){
                play(connection, message);
            })

        break;
    }
});

client.login(process.env.token);
