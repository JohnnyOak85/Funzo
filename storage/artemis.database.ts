import PouchDB from 'pouchdb';
import { DB_ADDRESS } from '../config';
import { Dictionary, SpeechDoc } from '../interfaces';
import { appendMap, connect, pushList } from './cache';

const db = new PouchDB<SpeechDoc>(`${DB_ADDRESS}/artemis`);

const getSpeech = async (id: string) => (await db.get(id)).list;

export const startDatabase = async () => {
    await connect();

    const [prompts, quotes, reactions, responses, welcomes] = await Promise.all([
        getSpeech('prompts') as Promise<string[]>,
        getSpeech('quotes') as Promise<string[]>,
        getSpeech('reactions') as Promise<Dictionary<string>>,
        getSpeech('responses') as Promise<Dictionary<string>>,
        getSpeech('welcomes') as Promise<string[]>
    ]);

    pushList('prompts', prompts);
    pushList('quotes', quotes);
    appendMap('reactions', reactions);
    appendMap('responses', responses);
    pushList('welcomes', welcomes);
};
