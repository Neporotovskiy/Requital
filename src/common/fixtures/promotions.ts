export interface Preview {
    id: number;
    title: string;
    description: string;
}

export interface Detailed {
    id: number;
    title: string;
    description: ReadonlyArray<string>;
}

export const previews: ReadonlyArray<Preview> = [
    {
        id: 1,
        title: 'Проект лестницы',
        description: 'В подарок к каждому заказу',
    },
    {
        id: 2,
        title: 'Скидка 5%',
        description: 'На все проекты летних домиков',
    },
];

export const details: ReadonlyArray<Detailed> = [
    {
        id: 1,
        title: 'Проект лестницы в подарок к каждому заказу',
        description: [
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
        ],
    },
    {
        id: 2,
        title: 'Скидка 5% на все проекты летних домов',
        description: [
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat distinctio aut voluptatem fuga praesentium asperiores cupiditate, quo perferendis optio nulla?',
        ],
    },
];
