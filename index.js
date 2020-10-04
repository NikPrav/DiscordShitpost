// require the discord.js module
const Discord = require('discord.js');
const fs = require('fs')
const pathn = require('path')

// create a new Discord client
const client = new Discord.Client();
const { prefix,token } = require('./config.json');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(token);

// Logging the messages
client.on('message', async message => {
    console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(command);
    if (command === `ping`) {
        message.channel.send('Pong.');
    } else if (command === `beep`) {
        message.channel.send('Boop.');
    } else if (command === `server`) {
        message.channel.send(`This server's name is: ${message.guild.name}`);
    } else if (command === `user-info`) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);        
    } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    } else if (command === 'sukdik') {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to suk them!');
        } else{
            const taggedUser = message.mentions.users.first();
            message.channel.send(`You have started suking: ${taggedUser.username}`);
            message.channel.send(`${taggedUser.username} 8========D O: ${message.author.username} `).then((msg) =>{ 
                for(i = 0; i< 3 ; ++i){
                setTimeout(() => { msg.edit(`${taggedUser.username} 8========O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8======O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8====O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8===O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8=O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8===O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8=====O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8======O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8=======O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.edit(`${taggedUser.username} 8========O: ${message.author.username} `); }, 100);
                setTimeout(() => { msg.delete(); }, 200);
                }
            })
            message.react('💦')
            message.channel.send("he has come now, you can stop")
        }
    } else if (command === 'play'){
        // Joining a voice channel
        console.log("Trying to join the voice channel")
        // Join the same voice channel of the author of the message
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            console.log("created a connection object")
             // Create a dispatcher
            const dispatcher = connection.play(`songs/${args}.mp3`,{volume : 0.5});

            dispatcher.on('start', () => {
                console.log(`${args}.mp3 is now playing!`);
            });

            dispatcher.on('finish', () => {
                console.log(`${args}.mp3 has finished playng!`);
                connection.disconnect()
            });
            // Error handling
            dispatcher.on('error', console.error)
        } else{
            message.channel.send(`${message.author.username},plis join a voice channel naayinte mone `);
        }
            
        
       
         
    } else if(command === 'help'){
        // Special for majja, possibly implement a feature which checks for the simpiest in the group?
        if(`${message.author.username}` === 'majja'){
            message.channel.send(`${message.author.username}, plis kandam vazhi od myre. The onli help you need is psychological`);
        } else{
            if (!args.length) {
                message.channel.send(`${prefix}play to play from a variety of songs \n ${prefix}sukdik to suk someone's`);
            }
        
            message.channel.send(`Command name: ${command}\nArguments: ${args}`);
            var files = fs.readdirSync('songs/');
            message.channel.send('To play any sounds, use \`\`\`*play <filename>\`\`\` w/o any extension');
            var Dirlist = ''
            // Since there's some kinda cooldown associated with the number of messages that you can send at a time to a channel, 
            // concatnating everything and sending it in a single message
            files.forEach(file => {
                // message.channel.send(`> ${file}`)
                
                if(pathn.extname(file) == '.mp3'){
                    // message.channel.send(`> ${file}`)
                    Dirlist = Dirlist.concat(`${file} \n`)
                }
            })
            
            message.channel.send(`>>> ${Dirlist}`)
            message.channel.send("These are all the files that are available")
        }

    }

});


