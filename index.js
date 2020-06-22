const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';

var version = '1.0.1';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('!help' , { type: 'LISTENING'})
});

client.on('message', message =>{
  
    let args = message.content.slice(prefix.length).split(" ");

    switch(args[0]){
        case 'info':
            const embed = new Discord.MessageEmbed()
            .setTitle('User Info')
            .addField('Player name', message.author.username)
            .addField('Current Server', message.guild.name)
            .setThumbnail(message.author.displayAvatarURL())
            .addField('Version', version)
            .setColor(0x33DACE)
            message.channel.send(embed);
        break;
        case 'help':
            const embed2 = new Discord.MessageEmbed()
            .addField('Commands', `bot's commands are: ping, help, info, kick. note: bot is under construction`)
            .setColor(0xE20C40)
            message.channel.send(embed2);
        break;    
    
        case 'ping':
            message.channel.send('pong');
        break; 

        case 'kick':
            if(!message.member.hasPermission("KICK_MEMBERS", explicit = true)) return message.channel.send('You don\'t have permissions.');
            
            if(!args[1]) message.channel.send('You have to specify a person')

            const user = message.mentions.users.first();

            if(user) {
                const member = message.guild.member(user);

                if (user) {
                    member.kick('You were kicked!').then(() =>{
                        message.reply(`Successfully kicked ${user.tag}`);
                    }).catch(err =>{
                        message.reply('I was unable to kick the specified member!');
                    });
                } else{
                    message.reply("That user isn\'t in this server")
                }
            } else {
                message.reply("That user isn\'t in this server") 
            }

            break;
            

            
    }
});

client.login(process.env.token);