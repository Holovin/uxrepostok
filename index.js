const youtubedl = require('youtube-dl');
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    console.log(inlineQuery);

    const url = inlineQuery.query.trim();
    const recipes = [{
        type: 'article',
        id: '0',
        title: 'Статус: ???',
        'input_message_content': { 'message_text': '[денис]' }
    }];

    if (!!url || !url.startsWith('https://')) {
        recipes[0].title = 'Статус: жду ссылку...';
        return answerInlineQuery(recipes);
    }

    youtubedl.getInfo(url, function(err, info) {
        if (err) {
            console.log(err);

            recipes[0].title = 'Статус: ошибка парсинга';
            return answerInlineQuery(recipes);
        }

        console.log('id:', info.id, info.title, info.url);

        recipes.pop();
        recipes.unshift({
            type: 'video',
            id: '1',
            'video_url': info.url,
            'mime_type': 'video/mp4',
            title: info.title,
            thumb_url: 'https://sun9-41.userapi.com/c846123/v846123269/af8c/ppe9PW9c8Qc.jpg',
        });

        return answerInlineQuery(recipes);
    });
});

bot.launch();

// bot.on('chosen_inline_result', ({ chosenInlineResult }) => {
//     console.log('chosen inline result', chosenInlineResult)
// });
