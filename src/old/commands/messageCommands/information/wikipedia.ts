const Discord = require("discord.js");

module.exports = {
  name: "wikipedia",
  description: "Search wikipedia.",
  async execute(message, args, data, client) {
    const search = args.join("_");
    const msg = args.join(" ");
    if (args[0] == 'ENA') return message.channel.send("You need to enter some text to search for");

    const link = `https://www.wikipedia.org/w/index.php?search=${search}&ns0=1`;
    const embed = new Discord.MessageEmbed()
      .setTitle("Wikipedia Search")
      .addField(`Query:`, `${msg}`)
      .addField(`Results:`, `[Click](${link})`)
      .setColor("GREY");

    message.channel.send({ embeds: [embed] });
  },
};