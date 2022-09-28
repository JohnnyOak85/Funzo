import { startDatabase } from '../storage/artemis.database';
import { setCommands } from './commands';

export const start = () => {
    setCommands();
    startDatabase();
};
