import { ChannelType, Message } from 'discord.js';
import { getRandom } from '../tools/math';
import { executeCommand } from './commands';
import { react, respond } from './replies';

const reactAndRespond = async (message: Message) => {
    try {
        const words = message.content.toLowerCase().split(' ');
        const willReact = getRandom(3) === 2;
        const willRespond = getRandom(3) === 2;

        if (!willReact && !willRespond) return;

        let responded = false;
        let reacted = false;

        for (const word of words) {
            if (responded && reacted) return;

            if (!responded && willRespond) {
                responded = await respond(message, word);
            }

            if (!reacted && willReact) {
                reacted = await react(message, word);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const checkMessage = async (message: Message, botId = '') => {
    if (message.channel.type === ChannelType.DM || message.author.bot || !message.guild) return;

    reactAndRespond(message);
    executeCommand(message, botId);
};
