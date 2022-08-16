import { EmbedBuilder } from '@discordjs/builders';
import { GuildMember } from 'discord.js';
import { Collector } from '../storage/collections';
import { saveMember } from '../storage/members.database';
import { addYear, getTimer, isValidDate, setDateValue } from '../tools/time';

const anniversaries = new Collector<NodeJS.Timeout>();

const getEmbed = (member: GuildMember) =>
    new EmbedBuilder()
        .setColor(0xed0808)
        .setTitle('HAPPY ANNIVERSARY!')
        .setThumbnail(member.avatarURL())
        .setURL('https://www.youtube.com/watch?v=8zgz2xBrvVQ')
        .addFields({ name: 'Everyone party!', value: `It's ${member.nickname}'s anniversary!` });

export const addAnniversary = (member: GuildMember, timeout: number) => {
    const cb = () => {
        member.guild.systemChannel?.send({ embeds: [getEmbed(member)] });
        addAnniversary(member, addYear(timeout));
    };

    anniversaries.addItem(member.id, getTimer(member.id, cb, timeout));
};

export const recordBirthday = (member: GuildMember, date = '') => {
    try {
        if (!member.guild.systemChannel) {
            return 'User is invalid';
        }

        if (!isValidDate(date)) {
            return 'Date is invalid';
        }

        const timeout = setDateValue(date);

        addAnniversary(member, timeout);
        saveMember(member.id, { anniversary: timeout });

        return 'Birthday has been recorded';
    } catch (error) {
        console.log(error);
        return 'There was an error trying record the birthday';
    }
};
