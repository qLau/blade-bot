const Discord = require('discord.js');
const moment = require('moment');
require("moment-duration-format");
const bot = new Discord.Client();
const fs = require("fs");
const ffmpeg = require("ffmpeg-binaries")
bot.commands = new Discord.Collection();
// COMMAND HANDLER 
fs.readdir("./commands", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Nu ai creat folder-ul commands!");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});
//
bot.on('guildMemberAdd', function(member) {
  });
bot.on("ready", async () => {
    console.log(`WolvesZone este online`);
    bot.user.setPresence({ game: { name: `Prefix: o!help\nLaurentiu seful meu`, url: 'https://twitch.tv/qlau234', type: 1 } });
});
bot.on("message", message => {
  if(message.channel.type === "dm") return

    const prefix = "o!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let sender = message.author;
    let args = messageArray.slice(1);
	
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);
    if(!message.content.startsWith(`${prefix}`)) return
	//COMMANDS
if(cmd === `${prefix}avatar`){
    let user = message.mentions.users.first() || message.author;
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff) // This will set the embed sidebar color
        .setImage(user.avatarURL) // This will set the embed image     
    message.channel.send({embed});
        return;
    }
   //
if(cmd === `${prefix}color`){
	let colors = message.guild.roles.filter(role => role.name.startsWith("●"))
	if(colors.size < 1) return message.channel.send("Pe acest server nu existﾄ・nici o culoare.");

	let str = args.join(" ")
	let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

	try {
		message.member.removeRoles(colors);
		message.member.addRole(role)
		message.channel.send(`Ai primit culoarea ${role.name}!`).then(msg => msg.delete(6500));
		message.delete(6500);

	} catch(e) {
		message.channel.send(`Problema intampinata: ${e.message}`);
	}
}
	if(cmd === `${prefix}colors`){
	let colors = message.guild.roles.filter(role => role.name.startsWith("●"))
	if(colors.size < 1) return message.channel.send("Pe acest server nu exista nici o culoare.");
	const embed = new Discord.RichEmbed()
	.setTitle("Culori disponibile:")
	.setDescription(`${colors.array()}\n\n**Pentru a primi o culoare dorita,\nFolositi ${prefix}color <culoare>.\n\nExemplu: w!color red**`)
	.setColor(`#bc2731`)
	message.channel.send({embed});
	message.delete();
	return;
	}
   //
  if(cmd === `${prefix}userinfo`){
	let user;
	// If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
	// Define the member of a guild.
    const member = message.guild.member(user);

	//Discord rich embed
    const embed = new Discord.RichEmbed()
		.setColor('#0a9678')
		.setThumbnail(user.avatarURL)
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField("ID:", `${user.id}`, true)
		.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
		.addField("Creat pe", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("A intrat pe server:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Bot:", `${user.bot}`, true)
		.addField("Status:", `${user.presence.status}`, true)
		.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
		.addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
		.setFooter(`Cerut de ${message.author.username}#${message.author.discriminator}`)
     message.channel.send({embed});
	  return;
    }
	//HEP
	if(cmd === `${prefix}help`){
		const embed = new Discord.RichEmbed()
		.setColor("#cc0000")
		.setTitle("Ti-am dat mai jos toate comenzile!")
		.setDescription("**Fun**\no!youtube - Caută ceva pe youtube\no!google - Cu ajutor acestei comenzi poți căuta ceva pe google.\no!meme - Această comandă arată un meme random.\no!roll - Această comandă aruncă un zar.\no!emojify - Această comandă transformă un mesaj în emoji.\no!gif - Această comandă arată un .GIF random.\no!avatar - Această comandă arată avatarul tău sau al unui membru.\n\n**Moderare**\no!userinfo - Această comandă îți arată informațiile tale sau ale unui membru.\no!kick - Această comandă dă afară un membru de pe server.\no!ban - Această comandă banează un membru de pe server.\no!mute - Această comandă scoate accesul unui membru de a vorbi.\no!warn - Această comandă avertizează un membru de pe server.\no!serverinfo - Această comandă îți arată informațiile despre server.\n\n**Dj Dizainaru**\no!play - <link> sau numele de la piesa blana\no!disconnect - scoate-l pe dj dizainaru\n\n**Self Assignable Roles**\n**IN CURAND**")
		.setFooter("Laurențiu șeful meu.")
		message.channel.send({embed})
		return;
	}
	//SERVERINFO
if(cmd === `${prefix}serverinfo`){
   let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
   let day = message.guild.createdAt.getDate()
   let month = 1 + message.guild.createdAt.getMonth()
   let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let guild = message.guild
   let embed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Creat pe • ${day}.${month}.${year}`)
   .setColor("#0a9678")
   .setThumbnail(sicon)
   .addField("ID", message.guild.id, true)
   .addField("Name", message.guild.name, true)
   .addField("Owner", message.guild.owner.user.tag, true)
   .addField("Regiune", message.guild.region, true)
   .addField("Canale", message.guild.channels.size, true)
   .addField("Members", message.guild.memberCount, true)
   .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Online", online.size, true)
   .addField("Roles", guild.roles.map(roles => `${roles.name}`).join(', '), true)
   message.channel.send({embed});
return;
}
if(cmd === `${prefix}roles`){
	let rolesEmbed = new Discord.RichEmbed()
	.setColor(`#0a9678`)
	.setTitle(`Roles [${message.guild.roles.size}]`)
	.setDescription(message.guild.roles.map(roles => `${roles.name}`).join(', '))
	.setFooter(`Lista completa cu rolurile serverului ${message.guild.name}!`)
	message.channel.send({embed:rolesEmbed});
}
	//
	//ACCEPTAT
if(cmd === `${prefix}accept`){
	let acRole = message.guild.roles.find(`name`, `ASSISTANCE`);
	let acUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	message.channel.send(`${acUser} aplicatia ta a fost acceptata de catre **${message.author.tag}**.`)
	acUser.addRole(acRole);
	acUser.send("**Bun venit in staff-ul WolvesZone**\nFelicitari, ai fost acceptat(a) in staff-ul **WolvesZone**!\n\nReguli pe care trebuie sa le urmezi:\nNu ai voie sa ...\nTrebuie sa respecti membrii...\nNu ai voie sa...\nAi voie sa ...")
	message.delete();
	return;
}
//RESPINS
if(cmd === `${prefix}reject`){
	let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let aReason =args.join(" ").slice(22);
	message.channel.send(`${aUser} din pacate aplicatia ta a fost respinsa de catre **${message.author.tag}**.\n**Motiv:** ${aReason}`)
	message.delete();
	return;
}
	//BOT STATS
if(cmd === `${prefix}botstats`){
	const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new Discord.RichEmbed()
    .setTitle("*** Stats ***")
    .setColor("RANDOM")
    .addField("• Uptime ", `${duration}`, true)
    .addField("• Users", `${bot.users.size.toLocaleString()}`, true)
    .addField("• Servers", `${bot.guilds.size.toLocaleString()}`, true)
    .addField("• Channels ", `${bot.channels.size.toLocaleString()}`, true)
    message.channel.send({embed})
	return;
}
	//ANTI INVITE LINK
	let msg = message.content.toUpperCase();
	if(message.member.hasPermission("ADMINISTRATOR")) return;
if (msg.includes(`DISCORD.GG`)){
		message.channel.send("**Fără invite link-uri!**");
		message.delete();
		return
	}
  });
  
bot.login(process.env.BOT_TOKEN);
