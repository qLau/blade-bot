const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`[>] ${invites.inviter.username}: ${invites.uses}\n`)
    })

    const embed = new Discord.RichEmbed()
        .setTitle(`**INVITE LEADERBOARD**`)
        .setColor(0xCB5A5E)
        .setDescription(`\`\`\`Nume | Rank\n\n${possibleinvites.join('\n')}\`\`\``);
    message.channel.send(`**:tokyo_tower: Invite Leaderboard pentru ${message.guild.name}**`);
    message.channel.send({embed:embed});
}

module.exports.help = {
    name: "invites"
}
