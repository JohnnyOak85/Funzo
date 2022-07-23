import { ChannelType, Message } from 'discord.js';
import { REACTIONS, RESPONSES } from '../configurations/reactions';
import { executeCommand } from './commands';

const respond = (message: Message) => {
    const words = message.content.split(' ');

    for (const word of words) {
        if (RESPONSES[word.toLowerCase()]) {
            message.channel.send(RESPONSES[word.toLowerCase()]);
            return;
        }
    }
};

const react = async (message: Message) => {
    try {
        const words = message.content.split(' ');

        for (const word of words) {
            if (REACTIONS[word.toLowerCase()]) {
                message.react(REACTIONS[word.toLowerCase()]);
                return;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const checkMessage = async (message: Message) => {
    if (message.channel.type === ChannelType.DM || message.author.bot || !message.guild) return;

    respond(message);
    react(message);
    executeCommand(message);
};
