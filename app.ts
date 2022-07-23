import { Client } from 'discord.js';
import { TOKEN } from './config';
import { checkMessage } from './helpers/messages';
import { start } from './helpers/start';

const bot = new Client({
    intents: [
        'Guilds',
        'GuildEmojisAndStickers',
        'GuildMessages',
        'GuildPresences',
        'GuildMembers',
        'MessageContent'
    ]
});

bot.login(TOKEN);

bot.on('ready', () => {
    start();
    console.log('ready');
});

bot.on('messageUpdate', () => {});
bot.on('messageCreate', async message => checkMessage(message));

bot.on('error', error => {
    console.log(error);
});
