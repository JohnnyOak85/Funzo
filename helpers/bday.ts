import { appendMap } from './redis';

const DATE_REGEX = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm;

const isValidDate = (date: string) => date.length === 4 || DATE_REGEX.test(date);

export const recordBirthday = (id = '', date = '') => {
    try {
        if (!id) {
            return 'User is invalid';
        }

        date = `${new Date().getFullYear()}-${date}`;

        if (!isValidDate(date)) {
            return 'Date is invalid';
        }

        appendMap('bdays', { [id]: new Date(date).toISOString() });

        return 'Birthday has been recorded';
    } catch (error) {
        console.log(error);
        return 'There was an error trying record the birthday';
    }
};
