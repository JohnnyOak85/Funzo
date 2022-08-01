import { Message } from 'discord.js';
import { getCommandDescription, getCommandsDescription } from '../helpers/commands';

module.exports = {
    name: 'help',
    description:
        'Displays the list of commands. It can also display information on a given command.',
    usage: '',
    execute: async (message: Message, args: string[]) => {
        try {
            args.length
                ? message.channel.send(getCommandDescription(args[0].toLowerCase()))
                : message.channel.send(getCommandsDescription());
        } catch (error) {
            console.log(error);
        }
    }
};
