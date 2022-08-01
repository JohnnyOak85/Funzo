import { Message } from 'discord.js';
import { recordBirthday } from '../helpers/bday';

module.exports = {
    name: 'bday',
    description: `Record a user's birthday`,
    usage: '<user> <YYYY-MM-DD>',
    execute: async (message: Message, args: string[]) => {
        try {
            const user = message.mentions.users.first();

            if (!user) {
                message.reply('User is invalid');
            }

            message.reply(recordBirthday(user?.id, args[1]));
        } catch (error) {
            console.log(error);
        }
    }
};
