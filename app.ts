import { Client } from 'discord.js';
import { GUILD_ID, TOKEN } from './config';
import { checkMessage } from './helpers/messages';
import { countReactions } from './helpers/replies';
import { start } from './helpers/start';
import { welcome } from './helpers/welcome';
import { updateMember } from './helpers/members';

const client = new Client({
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

client.login(TOKEN);

client.on('ready', async () => {
    const guild = await client.guilds.fetch(GUILD_ID);

    start(guild);
    console.log('ready');
});

client.on('guildMemberAdd', member => welcome(member));

client.on('guildMemberUpdate', (m, member) => {
    updateMember(member);
});

client.on('messageReactionAdd', (reaction, user) => {
    !reaction.partial && countReactions(reaction);
});

client.on('messageUpdate', async (m, message) => {
    !message?.partial && checkMessage(message);
});

client.on('messageCreate', async message => checkMessage(message, client.user?.id));

client.on('error', error => {
    console.log(error);
});
