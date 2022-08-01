import { Message } from 'discord.js';
import { getQuote } from '../helpers/quotes';

module.exports = {
    name: 'quote',
    description: 'Prints a random quote.',
    usage: '',
    execute: async (message: Message, args: string[]) => {
        try {
            message.channel.send(getQuote());
        } catch (error) {
            console.log(error);
        }
    }
};
