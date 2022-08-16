import { Message } from 'discord.js';
import { recordBirthday } from '../helpers/bday';

module.exports = {
    name: 'bday',
    description: `Record a user's birthday`,
    usage: '<user> <MM-DD>',
    execute: async (message: Message, args: string[]) => {
        try {
            const memberId = args[0].replace('<@', '').replace('>', '');
            const member = message.mentions.members?.find(member => member.user.id === memberId);

            if (!member) {
                message.reply('User is invalid');
                return;
            }

            message.reply(recordBirthday(member, args[1]));
        } catch (error) {
            console.log(error);
        }
    }
};
