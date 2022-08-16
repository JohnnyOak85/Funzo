import { Client } from 'discord.js';
import { TOKEN } from './config';
import { checkMessage } from './helpers/messages';
import { countReactions } from './helpers/replies';
import { start } from './helpers/start';
import { welcome } from './helpers/welcome';
import { updateMember } from './helpers/members';

const bot = new Client({
    intents: [
        'Guilds',
        'GuildEmojisAndStickers',
        'GuildMessages',
        'GuildPresences',
        'GuildMembers',
        'MessageContent',
        'GuildMessageReactions'
    ]
});

bot.login(TOKEN);

bot.on('ready', () => {
    start();
    console.log('ready');
});

bot.on('guildMemberAdd', member => welcome(member));

bot.on('guildMemberUpdate', (m, member) => {
    !member.partial && updateMember(member);
});

bot.on('messageReactionAdd', (reaction, user) => {
    !reaction.partial && countReactions(reaction);
});

bot.on('messageUpdate', async (m, message) => {
    !message?.partial && checkMessage(message);
});

bot.on('messageCreate', async message => checkMessage(message, bot.user?.id));

bot.on('error', error => {
    console.log(error);
});
