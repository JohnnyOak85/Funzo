import { Guild } from 'discord.js';
import { startDatabase } from '../storage/artemis.database';
import { startMemberDatabase } from '../storage/members.database';
import { startStoryDatabase } from '../storage/story.database';
import { setCommands } from './commands';

export const start = (guild: Guild) => {
    setCommands();
    startDatabase();
    startStoryDatabase();
    startMemberDatabase(guild);
};
