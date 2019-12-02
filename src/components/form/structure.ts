import React from 'react';

import { Input, Props as InputProps } from 'components/input';

export interface Structure {
    name: string;
    component: React.FunctionComponent<InputProps>;
    label: string;
    required: boolean;
}

export const STRUCTURES: ReadonlyArray<Structure> = [
    {
        name: 'approach',
        component: Input,
        label: 'Как к Вам обращаться',
        required: true,
    },
    {
        name: 'phone',
        component: Input,
        label: 'Номер телефона',
        required: true,
    },
    {
        name: 'email',
        component: Input,
        label: 'Адрес электронной почты',
        required: false,
    },
];
