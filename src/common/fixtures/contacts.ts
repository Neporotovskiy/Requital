export const COMPANY = 'ООО "Делма"';

interface InteractiveItem {
    link: string;
    formatted: string;
}

export const TELEPHONE: InteractiveItem = {
    link: 'tel:+79272684485',
    formatted: '+7 (927) 268-44-85',
};

export const EMAIL: InteractiveItem = {
    link: 'mailto:delmatlt@gmail.com',
    formatted: 'delmatlt@gmail.com',
};

export const ADDRESS: {
    city: string;
    district: string;
    street: string;
    building: string;
} = {
    city: 'г. Тольятти',
    district: 'Автозаводской р-н',
    street: 'шоссе Тольятти-Ягодное',
    building: 'Строение 1',
};

export const PERSON: {
    firstName: string;
    middleName: string;
    lastName: string;
    full: string;
} = {
    firstName: 'Владимир',
    middleName: 'Иванович',
    lastName: 'Уколов',
    full: 'Уколов Владимир Иванович',
};

export const HOURS: { from: string; to: string; days: string; full: string } = {
    from: '8:00',
    to: '17:00',
    days: 'пн-пт.',
    full: 'пн-пт.: с 8:00 до 17:00',
};

export const LINK_TO_MAP: string = 'https://goo.gl/maps/wuEoj6ezzT9ghd3H9';
