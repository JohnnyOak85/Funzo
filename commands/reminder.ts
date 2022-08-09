import { Message } from 'discord.js';
import { recordReminder } from '../helpers/reminder';

module.exports = {
    name: 'reminder',
    description: `Record a reminder message`,
    usage: '<MM-DD> <message>',
    execute: async (message: Message, args: string[]) => {
        try {
            message.reply(recordReminder(args.shift(), args.join(' ')));
        } catch (error) {
            console.log(error);
        }
    }
};
