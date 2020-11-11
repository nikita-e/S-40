//С-40, крутит сирену внимание всем
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
//конфиг
const prefix = "S40/";
const tokens = [
    ""
];
let bots = [];
let isInVoice = false;

for (let i = 0; i < tokens.length; i++) {
    bots[i] = new Discord.Client();
}
/* ===== основная часть ===== */
bots.forEach(bot => {
    bot.login(tokens[bots.indexOf(bot)]);
    bot.on('ready', () => {
        console.log(`Запустился бот ${bot.user.tag}`);
        bot.generateInvite().then(link => { //[`ADMINISTRATOR`]
            console.log(link);
        });
    });
    bot.on('message', async message => {
        if (message.content === prefix + "start") {
            if (message.member.voice.channel) {
              const channel = await message.member.voice.channel.join();
              const sound = channel.play(ytdl('https://youtu.be/1mag85Ok0jI', { filter: 'audioonly' }));
              isInVoice = true;
              message.reply("Started playing!");
              sound.on('finish', () => channel.leave());
            } else {
              message.reply('Join an audio channel first!');
            }
        }
        if (message.content === prefix + "stop") {
            if (isInVoice) {
                await message.member.voice.channel.leave();
                isInVoice = false;
                message.reply("Stopped playing!");
            } else {
                message.reply("I'm not playing now!")
            }
        }
        
    });
})