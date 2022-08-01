import { appendList, getList } from './redis';
import { getRandom } from './utils';

export const getQuote = async () => {
    try {
        const quotes = await getList('quotes');

        return quotes[getRandom(quotes.length) - 1];
    } catch (error) {
        throw error;
    }
};

export const addQuote = (quote: string, author: string) => {
    appendList('quotes', `> ${quote} *${author} ${new Date().getFullYear()}*`);
};
