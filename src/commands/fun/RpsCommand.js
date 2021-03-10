const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RpsCommand extends BaseCommand {
  constructor() {
    super('rps', 'fun', ['rockpaperscissors']);
  }

  async run(client, message, args) {
    const botChoice = Math.floor(Math.random() * 2) + 1
    let botEmoji;
    let playerEmoji;
    let botChoiceStr;

    if (!args[0]) return message.channel.send('You need to say your choice. rock, paper, or scissors?');
    if (!['rock', 'paper', 'scissors'].includes(args[0])) return message.channel.send('You did not choose one of the options: \`rock\`, \`paper\`, or \`scissors\`.');

    if (botChoice == 1) {
      botChoiceStr = 'rock';
      botEmoji = ':rock: Rock';
    }
    if (botChoice == 2) {
      botChoiceStr = 'paper';
      botEmoji = ':newspaper: Paper';
    }
    if (botChoice == 3) {
      botChoiceStr = 'scissors';
      botEmoji = ':scissors: Scissors';
    }

    if (args[0] == 'rock') playerEmoji = ':rock: Rock';
    if (args[0] == 'paper') playerEmoji = ':newspaper: Paper';
    if (args[0] == 'scissors') playerEmoji = ':scissors: Scissors';
    console.log(botChoice);
    console.log(botEmoji);

    if (botChoiceStr == args[0]) return message.channel.send(`${botEmoji} vs ${playerEmoji}! We tied! Try again..`);
    if (args[0] == 'rock') {
      if (botChoiceStr == 'paper') return message.channel.send(`${botEmoji} vs ${playerEmoji}! You lost.. Better luck next time!`);
      else return message.channel.send(`${botEmoji} vs ${playerEmoji}! You won! Good job!`);
    }
    if (args[0] == 'paper') {
      if (botChoiceStr == 'scissors') return message.channel.send(`${botEmoji} vs ${playerEmoji}! You lost.. Better luck next time!`);
      else return message.channel.send(`${botEmoji} vs ${playerEmoji}! You won! Good job!`);
    }
    if (args[0] == 'scissors') {
      if (botChoiceStr == 'rock') return message.channel.send(`${botEmoji} vs ${playerEmoji}! You lost.. Better luck next time!`);
      else return message.channel.send(`${botEmoji} vs ${playerEmoji}! You won! Good job!`);
    }
  }
}