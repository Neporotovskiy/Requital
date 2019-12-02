import React from 'react';

import { Content } from 'components/content';

import s from './styles.scss';

export const About: React.FunctionComponent = (): React.ReactElement => (
    <section className={s.about}>
        <div className={s.background} />
        <div className={s.filter}>
            <Content>
                <h2>О компании</h2>
                <p>
                    Компания ООО "Делма" предоставляет услуги по производству и монтажу жилых и технических помещений из
                    деревянного бруса с использованием новейших технологий пожарной безопасности, а также различных
                    изделий ландшафтного дизайна.
                </p>
                <p>
                    Уже около десяти лет компания ООО "Делма" развивается и радует своих клиентов неизменно высоким
                    уровнем работ и выгодными ценами. Нас отличает индивидуальный подход и умение приятно удивить даже
                    самого требовательного клиента.
                </p>
                <div className={s.achievements}>
                    <h3 className={s.achievement}>10 лет на рынке</h3>
                    <h3 className={s.achievement}>Более 100 проектов</h3>
                    <h3 className={s.achievement}>Индивидуальный подход</h3>
                    <h3 className={s.achievement}>Лучшие цены</h3>
                </div>
            </Content>
        </div>
    </section>
);
