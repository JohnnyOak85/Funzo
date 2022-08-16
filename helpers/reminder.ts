import { EmbedBuilder, GuildMember } from 'discord.js';
import { Collector } from '../storage/collections';
import { saveMember } from '../storage/members.database';
import { isValidDate, setDateValue } from '../tools/time';

const reminders = new Collector<NodeJS.Timeout>();

const getEmbed = (member: GuildMember, reminder: string) =>
    new EmbedBuilder()
        .setColor(0x1b08ed)
        .setTitle('REMINDER!')
        .addFields({ name: `Here's your reminder <@${member.id}>`, value: reminder });

const cleanTimer = (id: string, member: GuildMember) => {
    member.guild.systemChannel?.send({ embeds: [getEmbed(member, id)] });
    clearTimeout(reminders.getItem(id));
    reminders.deleteItem(id);
};

export const addReminder = (member: GuildMember, reminder: string, timeout: number) => {
    reminders.addItem(
        reminder,
        setTimeout(() => {
            cleanTimer(reminder, member);
        }, timeout)
    );
};

export const recordReminder = (member: GuildMember, date = '', reminder = '') => {
    try {
        if (!isValidDate(date)) {
            return 'Date is invalid';
        }

        if (!reminder) {
            return 'Nothing to record';
        }

        const timeout = setDateValue(date);

        addReminder(member, reminder, timeout);
        saveMember(member.id, { [reminder]: timeout });

        return 'Reminder has been recorded';
    } catch (error) {
        console.log(error);
        return 'There was an error trying record the reminder';
    }
};
