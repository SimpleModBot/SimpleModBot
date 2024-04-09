# Contributing

### Supported Versions

All versions of SimpleModBot that use discord.js `13` or higher are currently supported. Any versions that use version `12` or lower are not supported anymore due to those versions being depricated and possibly not supporting the current version of the Discord API.

You can get support in the [discord server](https://discord.gg/49KeKwXc8g).

### Reporting a Vulnerability

If you find a bug or security issue in SimpleModBot, please create an [issue](https://github.com/SimpleModBot/SimpleModBot/issues). Before creating an issue, though, please check if your issue has already been reported.

### Spamming and Trolls

Anyone who spams or creates a fake issue will be blacklisted from the bot. It wastes our time and we don't appreciate that!!

## How to Contribute

### Requirements
 - Node version `>= 20`
 - ~~MongoDB~~ (Not yet)

 We also reccomend using Visual Studio Code for easier development.
#

### Setup
The very first thing you should do after cloning the repository is create the `config.json` file in the root directory.
Here's an example of what it should look like:
```json
{
    "Discord" : {
        "dev_ids": [
            "398758748904226836",
            "801294818839756811",
            "492492282789101568"
        ],
        "token": "OTA4OTQ5MzkwMzEwNDA4MjQz.G3o-FN.0gmuFDIDny-eLdMmjLqQp_BUgJhXeDcLgFF330",
        "app_id": "911112976793215006"
    }
}
```
- `dev_ids` is an array of strings. it's used for actions that require a developer of the bot.
- `token` is used for authentication in Discord's api. If you don't know how or where to get one, check out [this resource](https://www.writebots.com/discord-bot-token/).
- `app_id` is the user id of the bot.

Once you have this done, just run `npm install` in the terminal. It will install all of the necesary dependencies.
#

### Building

#### For VSC Users
Building the bot doesn't require you to use the terminal, just use one of the 2 provided tasks for building, `Build` or `Build Clean`. 

#### Non-VSC/Terminal
All of the compiler options are already set inside of `tsconfig.json`. Use the `tsc --build` command to build the project. If you want to do a clean build of the bot, you can do `tsc --build --clean`, although deleting the `out` directory and running the build command again works also.





