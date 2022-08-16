import { Message, MessageReaction } from 'discord.js';
import { REACTION_MAX } from '../config';
import { Dictionary } from '../interfaces';
import { getList, getMap } from '../storage/cache';
import { addQuote } from './quotes';
import { getRandom } from '../tools/math';

export const countReactions = (reaction: MessageReaction) => {
    const map: Dictionary<number> = {};

    reaction.message.reactions.cache.each(reaction => {
        map[reaction.emoji.id || 'null'] = reaction.count;
    });

    for (const emoji of Object.keys(map)) {
        if (
            map[emoji] >= REACTION_MAX &&
            reaction.message.content &&
            reaction.message.author?.username
        ) {
            addQuote(reaction.message.content, reaction.message.author?.username);
        }
    }
};

export const respond = async (message: Message, word: string) => {
    const responses = await getMap('responses');
    const response = responses[word];

    if (response) {
        message.channel.send(response);
        return true;
    }

    return false;
};

export const react = async (message: Message, word: string) => {
    const reactions = await getMap('reactions');
    const reaction = reactions[word];

    if (reaction) {
        message.react(reaction);
        return true;
    }

    return false;
};

export const reply = async (message: Message) => {
    const replies = await getList('prompts');

    message.reply(replies[getRandom(replies.length) - 1]);
};
