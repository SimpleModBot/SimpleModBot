const Discord = require("discord.js");

module.exports = {
    name: "hack",
    description: "Hacks a user.",
    cooldown: 30,
    async execute(message, args, data, client) {
        let ips = [
            '14.621.152.163.87.5',
            '96.492.139.149.12.8',
            '84.424.522.985.24.1',
            '82.245.242.874.83.13',
            '91.532.981.149.25.1',
            '24.123.091.134.24.4',
            '82.244.251.142.15.9',
            '21.981.847.109.12.3',
            '69.420.360.360.21.9',
            '87.242.081.018.24.6',
            '69.420.420.420.42.0',
            '92.487.293.748.92.3'
        ];

        let passwords = [
            'idiotsandwich12345',
            'noobgaedumass360',
            'imadoptedlolololololololol',
            'auxtalispogiwannamarryhim',
            '420ireallylikememes69',
            'joemamaurmama',
            'yesisyesyesimnub',
            '12345',
            'abcdef',
            'ilikecoconut12345',
            'penpinapplepinapplepen',
            'sussyimposter541',
            'ifrickedyourmom',
            'picklescrackersandcheese',
        ];

        let emails = [
            `sucks@gmail.com`,
            `isdumbdumb@gmail.com`,
            `@yahoo.com`,
            `@isdumb.io`,
            `@noob.com`,
            `idiot@noob.net`,
            `gae@wannabe.com`,
            `hacked@noob.com`,
            `artifical.intelegance@bot.com`,
            `getgood@ha.xyz`,
            `nub.nub@nub.nub`,
            `yes.no@yesnt.exe`,
            `obama@prism.old`,
            `joe@bidome.new`,
            `badpickup@line.tinder`,
            `dogwater@yes.com`,
            'thinkspicklesaregood@shopping.co',
        ];

        let ccis = [
            '5430112115445621',
            '9283109176382620',
            '1384378743864386',
            '2473897583563753',
            '3978564875648756',
            '4878567578565787',
            '8573647365736573',
            '7756542654265426',
            '6789768976789878',
            '6942021360420699',
            '9874899483648346',
            '0876578976374634',
            '7374826537265742',
            '942i758265487562',
            '1432874628746328',
            '9876546789098765',
            '8765678908765467',
            '6784932483724232',
            '7867524725278527',
            '8765456789876545',
            '3647284257425423',
            '3209785839479982',
        ];

        let names = [
            'Josh',
            'Ronald',
            'Joe',
            'Liam',
            'Noah',
            'Oliver',
            'Henry',
            'James',
            'Alexander',
            'Hugh jass',
            'Mike croch',
            'Jeb',
            'Jawnothin',
            'Liam',
            'Mia',
            'Aria',
            'Daniel',
            'Sebastian',
            'Gabriel',
            'Jacob',
            'Elias',
            'Matthew',
            'Diamond',
            'cheise',
            'Peter',
        ];

        const email = emails[Math.floor(Math.random() * emails.length)];
        const password = passwords[Math.floor(Math.random() * passwords.length)];
        const ip = ips[Math.floor(Math.random() * ips.length)];
        const cci = ccis[Math.floor(Math.random() * ccis.length)];
        const name = names[Math.floor(Math.random() * names.length)];

        let user = message.mentions.users.first() || message.author;
        if (!user) {
            return message.channel.send("Please mention a user to hack!");
        };


        let text = [
            `Getting \`${user.username}'s\` real name`,
            `\`${user.username}'s\` real name: ${name}`,
            `Downloading SYNAPSE X`,
            `Checking \`${user.username}'s\` Discord Account`,
            `\`${user.username}'s\` Email: ${user.username}${email}`,
            `\`${user.username}'s\` password: ${password}`,
            `\`${user.username}'s\` IP: ${ip}`,
            `Checking \`${user.username}'s\` bank account`,
            `\`${user.username}'s\` credit card number: ${cci}`,
        ];

        message.channel.send(`**Hacking \`${user.username}\`**`).then((m1) => {
            m1.edit(`${m1.content}\n${text[0]}`).then((m2) => {
                setTimeout(() => {
                    m2.edit(`${m2.content}\n${text[1]}`).then((m3) => {
                        setTimeout(() => {
                            m3.edit(`${m3.content}\n${text[2]}`).then((m4) => {
                                setTimeout(() => {
                                    m4.edit(`${m4.content}\n${text[3]}`).then((m5) => {
                                        setTimeout(() => {
                                            m5.edit(`${m5.content}\n${text[4]}`).then((m6) => {
                                                setTimeout(() => {
                                                    m6.edit(`${m6.content}\n${text[5]}`).then((m7) => {
                                                        setTimeout(() => {
                                                            m7.edit(`${m7.content}\n${text[6]}`).then((m8) => {
                                                                setTimeout(() => {
                                                                    m8.edit(`${m8.content}\n${text[7]}`).then((m9) => {
                                                                        setTimeout(() => {
                                                                            m9.edit(`${m9.content}\n${text[8]}`).then((m10) => {
                                                                                setTimeout(() => {
                                                                                    m10.edit(`${m10.content}\n**The hack is complete.**`);
                                                                                }, 2000);
                                                                            });
                                                                        }, 2000);
                                                                    });
                                                                }, 2000);
                                                            });
                                                        }, 2000);
                                                    });
                                                }, 2000);
                                            });
                                        }, 2000);
                                    });
                                }, 2000);
                            });
                        }, 2000);
                    });
                }, 2000);
            });
        });
    },
};