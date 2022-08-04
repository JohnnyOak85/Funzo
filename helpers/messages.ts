import { ChannelType, Message } from 'discord.js';
import { executeCommand } from './commands';
import { getMap } from './redis';

const reactAndRespond = async (message: Message) => {
    try {
        const words = message.content.toLowerCase().split(' ');
        const responses = await getMap('responses');
        const reactions = await getMap('reactions');

        let responded = false;
        let reacted = false;

        for (const word of words) {
            const response = responses[word];
            const reaction = reactions[word];

            if (responded && reacted) return;

            if (!responded && response) {
                message.channel.send(response);
                responded = true;
            }

            if (!reacted && reaction) {
                message.react(reaction);
                reacted = true;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const checkMessage = async (message: Message) => {
    if (message.channel.type === ChannelType.DM || message.author.bot || !message.guild) return;

    reactAndRespond(message);
    executeCommand(message);
};
