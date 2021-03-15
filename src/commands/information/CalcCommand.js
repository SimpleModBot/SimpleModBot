const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class CalcCommand extends BaseCommand {
  constructor() {
    super("calc", "information", ["calculate"]);
  }

  async run(client, message, args) {
    const firstvalue = Number(args[0]);
    const secondvalue = Number(args[2]);

    if (!args[0])
      return message.channel.send(
        `You need to give more arguments: ${client.prefix}calc number [+, -, x, /x] number`
      );
    if (!firstvalue)
      return message.channel.send("The first value is not a number.");
    if (!args[1])
      return message.channel.send(
        "You need to say what method to use for calculation"
      );
    if (!["+", "-", "x", "/"].includes(args[1]))
      return message.channel.send(
        "You need to say a proper method of calculating: `+, -, x, /`"
      );
    if (!secondvalue)
      return message.channel.send("The second value is not a number.");

    if (args[1] == "+") {
      let result = firstvalue + secondvalue;
      message.channel.send(`${firstvalue} + ${secondvalue} = ${result}`);
    }
    if (args[1] == "-") {
      let result = firstvalue - secondvalue;
      message.channel.send(`${firstvalue} + ${secondvalue} = ${result}`);
    }
    if (args[1] == "x") {
      let result = firstvalue * secondvalue;
      message.channel.send(`${firstvalue} x ${secondvalue} = ${result}`);
    }
    if (args[1] == "/") {
      let result = firstvalue / secondvalue;
      message.channel.send(`${firstvalue} / ${secondvalue} = ${result}`);
    }
  }
};
