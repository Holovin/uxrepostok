const youtubedl = require('youtube-dl');
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('message',(ctx) => {
    // console.log(ctx);

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

        recipes.pop();
        recipes.unshift({
            type: 'video',
            id: '1',
            'video_url': info.url,
            'mime_type': 'video/mp4',
            title: info.title,
            thumb_url: 'https://sun9-41.userapi.com/c846123/v846123269/af8c/ppe9PW9c8Qc.jpg',
            description: info.title ? info.title : '[нет описания]',
        });

        try {
            console.log('send: ok');
            ctx.replyWithVideo(info.url);
        } catch (e) {
            ctx.reply('Err: это видео недоступно');
        }
    });
});

bot.launch();
