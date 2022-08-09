import { appendMap } from './redis';
import { isValidDate } from './utils';

export const recordReminder = (date = '', message = '') => {
    try {
        if (!isValidDate(date)) {
            return 'Date is invalid';
        }

        if (!message) {
            return 'Nothing to record';
        }

        appendMap('reminders', { [message]: date });

        return 'Reminder has been recorded';
    } catch (error) {
        console.log(error);
        return 'There was an error trying record the reminder';
    }
};
