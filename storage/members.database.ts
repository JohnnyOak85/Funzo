import { Guild } from 'discord.js';
import PouchDB from 'pouchdb';
import { DB_ADDRESS } from '../config';
import { addAnniversary } from '../helpers/bday';
import { addReminder } from '../helpers/reminder';
import { Member, MemberDoc } from '../interfaces';
import { checkYear } from '../tools/time';

const db = new PouchDB<Member>(`${DB_ADDRESS}/members`);

const cleanDoc = (doc: MemberDoc): Member => ({
    id: doc._id,
    anniversary: doc.anniversary,
    nickname: doc.nickname,
    reminders: doc.reminders,
    roles: doc.roles
});

const getDocs = async () => await db.allDocs({ include_docs: true });
const parseDocs = async () => (await getDocs()).rows.map(row => row.doc).filter(doc => doc);

const getMemberList = async () =>
    (await parseDocs())
        .map(doc => {
            if (doc) {
                return cleanDoc(doc);
            }
        })
        .filter(doc => doc);

export const getMember = async (id: string) => {
    try {
        const doc = await db.get(id);

        return cleanDoc(doc);
    } catch (error) {
        return undefined;
    }
};

export const saveMember = async (id: string, member: Member) => {
    const doc = cleanDoc(await db.get(id));

    if (member.reminders) {
        doc.reminders = Object.assign(doc.reminders || {}, member.reminders);
    }

    delete member.id;

    saveMember(id, doc);
};

export const startDatabase = async (guild: Guild) => {
    await db.info();

    const members = await getMemberList();

    members.forEach(async member => {
        if (!member?.id) return;

        const guildMember = await guild.members.fetch(member.id);

        if (member.anniversary) {
            addAnniversary(guildMember, checkYear(member.anniversary));
        }

        if (member.reminders) {
            for (const reminder in member.reminders) {
                addReminder(guildMember, reminder, checkYear(member.reminders[reminder]));
            }
        }
    });
};
