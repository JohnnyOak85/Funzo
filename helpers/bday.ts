import { existsSync, readJSONSync, writeJSONSync } from 'fs-extra';

const PATH = '../configurations/bdays.json';
const DATE_REGEX = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm;

const isValidDate = (date: string) =>
    !!date || DATE_REGEX.test(date) || parseInt(date.split('-')[0]) < new Date().getFullYear();

export const recordBirthday = (id = '', date = '') => {
    try {
        if (!id) {
            return 'User is invalid';
        }

        if (!isValidDate(date)) {
            return 'Date is invalid';
        }

        if (!existsSync(PATH)) {
            writeJSONSync(PATH, {});
        }

        const list = readJSONSync(PATH);

        list[id] = new Date(date).toISOString();

        writeJSONSync(PATH, list);

        return 'Birthday has been recorded';
    } catch (error) {
        console.log(error);
        return 'There was an error trying record the birthday';
    }
};
