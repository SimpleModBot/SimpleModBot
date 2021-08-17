module.exports = {
    name: "shuffle",
    async execute(message, args, data, client) {
        var randomWords = require('random-words');
        const word = randomWords();

        const { ShuffleGuess } = require('weky');
        const game = new ShuffleGuess({
            message: message,
            word: word,
            winMessage: "GG, you won!",
            colorReshuffleButton: 'green',
            messageReshuffleButton: 'ReShuffle',
            colorCancelButton: 'red',
            messageCancelButton: 'Cancel Game',
            client: client
        });

        game.start();
    },
};