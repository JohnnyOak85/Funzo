import { startDatabase } from '../storage/artemis.database';
import { startStoryDatabase } from '../storage/story.database';
import { setCommands } from './commands';

export const start = () => {
    setCommands();
    startDatabase();
    startStoryDatabase();
};
