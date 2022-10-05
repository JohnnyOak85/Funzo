import PouchDB from 'pouchdb';
import { DB_ADDRESS } from '../config';
import { BlockDoc, Dictionary } from '../interfaces';
import { saveList } from './cache';

const db = new PouchDB(`${DB_ADDRESS}/story`);

export const getBlocks = async () => (await db.get<BlockDoc>('blocks')).blocks;
export const getDecorators = async () => {
    const doc = await db.get<Dictionary<string[]>>('decorators');

    return {
        burns: doc.burns,
        countries: doc.countries,
        currencies: doc.currencies
    };
};

export const startStoryDatabase = async () => {
    await db.info();

    const [blocks, decorators] = await Promise.all([getBlocks(), getDecorators()]);

    saveList('burns', decorators.burns);
    saveList('countries', decorators.countries);
    saveList('currencies', decorators.currencies);
    saveList(
        'blocks',
        blocks.map(block => JSON.stringify(block))
    );
};
