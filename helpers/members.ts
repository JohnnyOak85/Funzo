import { GuildMember } from 'discord.js';
import { getMember, saveMember } from '../storage/members.database';

export const updateMember = async (member: GuildMember) => {
    const storedMember = (await getMember(member.id)) || {};
    let updated = false;

    if (member.nickname && member.nickname !== storedMember.nickname) {
        storedMember.nickname = member.nickname;
        updated = true;
    }

    const memberRoles = [...member.roles.valueOf().values()].map(role => role.id);

    if (memberRoles.length) {
        memberRoles.forEach(roleId => {
            if (!storedMember.roles?.length) {
                storedMember.roles = [];
            }

            if (!storedMember.roles.includes(roleId)) {
                storedMember.roles.push(roleId);
            }
        });

        updated = true;
    }

    if (updated) {
        saveMember(member.id, storedMember);
    }
};
