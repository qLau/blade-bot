const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
  let dailyembed = new Discord.RichEmbed()
  .setTitle("Daily Battle")
  .setDescription(":black_small_square: Temă:\n:black_small_square: Stock:\n:black_small_square: Tipul lucrării:\n:black_small_square: Dimensiuni:\n:black_small_square: Text:");
  message.channel.send({embed:dailyembed});
}
module.exports.help = {
    name: "daily"
}
