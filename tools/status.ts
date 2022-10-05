import { TextChannel } from "discord.js";
import { checkCache } from "../storage/cache"
import { getLog } from "./logger";

export const buildList = (list: string[]) => list.filter(x => x).join('\n');

export const getStatus = async (channel: TextChannel) => {
    const isOpen = checkCache();
    const log = getLog();
    const status = ['Artemis'];

    status.push(`Database is ${isOpen ? '' : 'not '}ready`);

    channel.send(buildList(status));
    channel.send(`\`\`\`${log.join('\n')}\`\`\``);

    return;
}