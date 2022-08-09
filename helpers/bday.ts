import { appendMap } from './redis';
import { isValidDate } from './utils';

export const recordBirthday = (id = '', date = '') => {
    try {
        if (!id) {
            return 'User is invalid';
        }

        if (!isValidDate(date)) {
            return 'Date is invalid';
        }

        appendMap('bdays', { [id]: date });

        return 'Birthday has been recorded';
    } catch (error) {
        console.log(error);
        return 'There was an error trying record the birthday';
    }
};
