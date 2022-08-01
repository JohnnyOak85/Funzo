import { setCommands } from './commands';
import { connect } from './redis';

export const start = () => {
    setCommands();
    connect();
};
