import { MessageReaction } from 'discord.js';
import { REACTION_MAX } from '../config';
import { Dictionary } from '../interfaces';
import { addQuote } from './quotes';

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
