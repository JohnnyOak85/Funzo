import moment from 'moment';

const DATE_REGEX = /(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm;

export const isValidDate = (date: string) => date.length === 5 || DATE_REGEX.test(date);

export const addYear = (date: number | moment.Moment) => moment(date).add(1, 'year').valueOf();

export const checkYear = (incomingDate: number | moment.Moment) => {
    const now = moment();
    const date = moment(incomingDate);

    if (now.isAfter(date)) {
        return addYear(date);
    }

    return date.valueOf();
};

export const setDateValue = (dateString: string) => {
    const splitDate = dateString.split('-');
    const date = moment()
        .set('month', Number(splitDate[0]) - 1)
        .set('date', Number(splitDate[1]));

    return checkYear(date);
};

export const getTimer = (id: string, cb: any, timeout: number) => setTimeout(() => cb(id), timeout);
