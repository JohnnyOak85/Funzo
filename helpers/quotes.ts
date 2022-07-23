import { readJsonSync } from 'fs-extra';
import { getRandom } from './utils';

const getQuotes = (): string[] => readJsonSync('./configurations/quotes.json');

export const getQuote = () => {
    const quotes = getQuotes();
    const index = getRandom(quotes.length);

    return quotes[index - 1];
};

export const addQuote = (quote: string, author: string) => {
    const quotes = getQuotes();

    quotes.push(`> ${quote} *${author} ${new Date().getFullYear()}*`);
};
