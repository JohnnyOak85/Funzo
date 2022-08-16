import { Message } from 'discord.js';

export interface BlockDoc {
    blocks: string[][];
}

export interface SpeechDoc {
    list: string[] | Dictionary<string>;
}

export interface Dictionary<T> {
    [x: string]: T;
}

export interface Command {
    description: string;
    execute: (message: Message, args?: string[]) => void;
    name: string;
    usage: string;
}

export interface Member {
    id?: string;
    anniversary?: number;
    nickname?: string;
    reminders?: Dictionary<number>;
    roles?: string[];
}

export type MemberDoc = PouchDB.Core.ExistingDocument<Member & PouchDB.Core.AllDocsMeta>;
