import { Message } from 'discord.js';
import { recordReminder } from '../helpers/reminder';

module.exports = {
    name: 'reminder',
    description: `Record a reminder message`,
    usage: '<MM-DD> <message>',
    execute: async (message: Message, args: string[]) => {
        try {
            if (!message.member) return;

            message.reply(recordReminder(message.member, args.shift(), args.join(' ')));
        } catch (error) {
            console.log(error);
        }
    }
};
