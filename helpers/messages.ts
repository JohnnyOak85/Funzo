import { ChannelType, Message } from 'discord.js';
import { executeCommand } from './commands';
import { getMap } from './redis';

const respond = async (message: Message) => {
    const words = message.content.split(' ');
    const responses = await getMap('responses');

    for (const word of words) {
        if (responses[word.toLowerCase()]) {
            message.channel.send(responses[word.toLowerCase()]);
            return;
        }
    }
};

const react = async (message: Message) => {
    try {
        const words = message.content.split(' ');
        const reactions = await getMap('reactions');

        for (const word of words) {
            if (reactions[word.toLowerCase()]) {
                message.react(reactions[word.toLowerCase()]);
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
