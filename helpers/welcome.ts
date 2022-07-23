import { GuildMember } from 'discord.js';
import { StoryFactory } from './story.factory';

const buildStory = (username: string) => {
    const factory = new StoryFactory(username);

    return factory.getStory();
};

export const welcome = (member: GuildMember) => {
    member.guild.systemChannel?.send(`Welcome <@${member.id}>, have a little story:`);
    member.guild.systemChannel?.send(buildStory(member.user.username));
};
