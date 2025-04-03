export const config = (date: Date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

export const stringToIso = (datestring: string) => {
    const date = config(new Date(datestring));
    return date.toISOString();
}

export const dateIsWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
}

export const toPayloadFormat = (date: Date, time: string): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${time}:00`;
}

export const getTime = (datestring: string) => {
    const date = new Date(datestring);
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
}

export default {
    config,
    stringToIso,
    dateIsWeekend,
    toPayloadFormat,
    getTime
}