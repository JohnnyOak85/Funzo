import { Message } from 'discord.js';
import { StoryFactory } from '../helpers/story.factory';

module.exports = {
    name: 'story',
    description:
        'Constructs a random story based on the quoted user, otherwise it will default to the author.',
    usage: '<user>',
    execute: async (message: Message, args: string[]) => {
        try {
            const memberId = args[0].replace('<@', '').replace('>', '');
            const member = message.mentions.members?.find(member => member.user.id === memberId);
            const factory = new StoryFactory(member?.user.username || message.author.username);

            message.channel.send(factory.getStory());
        } catch (error) {
            console.log(error);
        }
    }
};
