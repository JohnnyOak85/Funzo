import { Message } from 'discord.js';
import { StoryFactory } from '../helpers/story.factory';

module.exports = {
    name: 'story',
    description:
        'Constructs a random story based on the quoted user, otherwise it will default to the author.',
    usage: '<command> <user>',
    execute: async (message: Message, args: string[]) => {
        try {
            const mentions = message.mentions.members?.map(member => member.user.username) || [];

            const factory = new StoryFactory(mentions[0] || message.author.username);

            message.channel.send(factory.getStory());
        } catch (error) {
            console.log(error);
        }
    }
};
