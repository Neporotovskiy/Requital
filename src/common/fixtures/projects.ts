export interface Preview {
    name: string;
    description: string;
    background: string;
    slug: string;
}

export interface Detailed {
    id: string;
    name: string;
    shortDescription: string;
    detailedDescription: ReadonlyArray<string>;
    background: string;
    illustrations: ReadonlyArray<{ src: string; description: string }>;
    characteristics: ReadonlyArray<{
        name: string;
        value: string;
        units: string;
    }>;
    options: ReadonlyArray<{
        name: string;
        price: number;
    }>;
    price: number;
}

export const previews: ReadonlyArray<Preview> = [
    {
        name: 'Летний домик',
        description: 'Уютный жилой летний дом, способный вместить всю семью.',
        background: 'images/summer-house/1.jpg',
        slug: 'summer-house',
    },
];

export const details: ReadonlyArray<Detailed> = [
    {
        id: 'summer-house',
        name: 'Летний домик',
        shortDescription: 'Уютный жилой летний дом, способный вместить всю семью.',
        detailedDescription: [
            'Лаконичный проект одноэтажного летнего домика, отвечающий всем основным современным потребностям, рассчитан на семью из 4-6 человек.',
            'Квадратная форма плана предполагает простую и удобную планировку. Через открытую террасу и французские окна внутреннее пространство гостиной плавно перетекает в сад. ',
            'Благодаря своей компактной конфигурации данный проект максимально экономичный вариант как при строительстве, так и при эксплуатации.',
        ],
        background: 'images/summer-house/1.jpg',
        illustrations: [
            { src: 'images/summer-house/1.jpg', description: 'Иллюстрация 1' },
            { src: 'images/summer-house/2.jpg', description: 'Иллюстрация 2' },
            { src: 'images/summer-house/3.jpg', description: 'Иллюстрация 3' },
            { src: 'images/summer-house/4.jpg', description: 'Иллюстрация 4' },
            { src: 'images/summer-house/5.jpg', description: 'Иллюстрация 5' },
            { src: 'images/summer-house/6.jpg', description: 'Иллюстрация 6' },
            { src: 'images/summer-house/7.jpg', description: 'Иллюстрация 7' },
        ],
        characteristics: [
            { name: 'Площадь', value: '84', units: 'm²' },
            { name: 'Площадь застройки', value: '106', units: 'm²' },
            { name: 'Размеры', value: '19 X 9.5', units: 'm' },
            { name: 'Этажность', value: '1', units: '' },
            { name: 'Кол-во ванных комнат и/или с/у', value: '1', units: '' },
            { name: 'Фундамент', value: 'Сборный, ленточный', units: '' },
            { name: 'Перекрытия', value: 'Деревянные балки', units: '' },
            { name: 'Кровля', value: 'Металлочерепица, гибкая черепица, ондулин, др.', units: '' },
        ],
        options: [],
        price: 1800000,
    },
];
