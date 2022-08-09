const DATE_REGEX = /(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm;

export const isValidDate = (date: string) => date.length === 5 || DATE_REGEX.test(date);
export const getBool = () => Math.random() < 0.5;
export const getRandom = (max = 100, min = 1) => Math.floor(Math.random() * (max - min + 1) + min);
