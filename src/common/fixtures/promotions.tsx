import React from 'react';

import { TELEPHONE } from 'common/fixtures/contacts';

export interface Preview {
    id: number;
    title: string;
    description: string;
}

export interface Detailed {
    id: number;
    title: string;
    description: ReadonlyArray<React.ReactNode>;
}

export const previews: ReadonlyArray<Preview> = [
    {
        id: 1,
        title: 'Скидка 10%',
        description: 'На проект лестницы',
    },
];

export const details: ReadonlyArray<Detailed> = [
    {
        id: 1,
        title: 'Скидка 10% на проект лестницы',
        description: [
            'Скидка на проект межэтажной лестницы из древесины предоставляется каждому клиенту оформившему заказ на проекты летних домов и некоторых других построек.',
            <p>
                Подробности уточняйте по телефону <a href={`tel:${TELEPHONE.link}`}>{TELEPHONE.formatted}</a>
            </p>,
        ],
    },
];
