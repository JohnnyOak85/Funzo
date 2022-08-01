import { readJsonSync } from 'fs-extra';
import { getValue } from './redis';
import { getRandom } from './utils';

const getQuotes = (): string[] => readJsonSync(`${__dirname}/configurations/quotes.json`);

const getQuotes2 = async (): Promise<string[]> => {
    const quotes = await getValue('quotes');

    if (!quotes) return [];

    return JSON.parse(quotes);
};

const getQuote2 = async () => {
    try {
        const quotes = await getQuotes2();
        const index = getRandom(quotes.length);

        return quotes[index - 1];
    } catch (error) {
        throw error;
    }
};

export const getQuote = () => {
    const quotes = getQuotes();
    const index = getRandom(quotes.length);

    return quotes[index - 1];
};

export const addQuote = (quote: string, author: string) => {
    const quotes = getQuotes();

    quotes.push(`> ${quote} *${author} ${new Date().getFullYear()}*`);
};
