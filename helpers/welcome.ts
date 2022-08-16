import { GuildMember } from 'discord.js';
import { getList } from '../storage/cache';
import { getMember } from '../storage/members.database';
import { getRandom } from '../tools/math';
import { StoryFactory } from './story.factory';

const buildStory = (username: string) => {
    const factory = new StoryFactory(username);

    return factory.getStory();
};

const getWelcomeMessage = async (memberId: string) => {
    const messages = await getList('welcomes');

    return messages[getRandom(messages.length) - 1].replace('§member', `<@${memberId}>`);
};

export const welcome = async (member: GuildMember) => {
    const storedMember = await getMember(member.id);

    if (storedMember) {
        member.guild.systemChannel?.send(await getWelcomeMessage(member.id));

        if (storedMember.nickname) {
            member.setNickname(storedMember.nickname);
        }

        if (storedMember.roles?.length) {
            storedMember.roles.forEach(role => {
                member.roles.add(role);
            });
        }
    } else {
        member.guild.systemChannel?.send(`Welcome <@${member.id}>, have a little story:`);
        member.guild.systemChannel?.send(await buildStory(member.user.username));
    }
};
