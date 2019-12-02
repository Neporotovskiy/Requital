export interface NavigationItem {
    href: string;
    content: string;
    title: string;
}

export const NAVIGATION: ReadonlyArray<NavigationItem> = [
    { href: '/', content: 'Главная', title: 'Главная страница' },
    { href: '/projects', content: 'Проекты', title: 'Галерея проектов' },
];
