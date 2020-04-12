const youtubedl = require('youtube-dl');
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('message',(ctx) => {
    if (ctx.updateType !== 'message') {
        return ctx.reply('Wrong type');
    }

    if (!['Faringo', 'holov_in'].includes(ctx.update.message.from.username)) {
        return ctx.reply('Err: Access error');
    }

    const url = ctx.update.message.text.trim();

    if (!url || !url.startsWith('https://')) {
        return ctx.reply('Err: No link');
    }

    youtubedl.getInfo(url, function(err, info) {
        if (err) {
            console.log(err);
            return ctx.reply(`Err: ${err.message}`);
        }

        console.log('id:', info.id, info.title, info.description, info.url);

        ctx.reply('Загружается...');

        try {
            console.log('send: ok');
            ctx.replyWithVideo(info.url);
        } catch (e) {
            ctx.reply('Err: это видео недоступно');
        }
    });
});

bot.launch();
