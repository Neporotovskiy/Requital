import React from 'react';

import { Content } from 'components/content';
import { Card } from 'components/card';

import s from './styles.scss';

export const Directions: React.FunctionComponent = (): React.ReactElement => (
    <section className={s.directions}>
        <Content>
            <h2>Направления работы </h2>
            <div className={s.content}>
                <Card>
                    <h3>Архитектурное проектирование</h3>
                    <ul className={s.features}>
                        <li className={s.feature}>Доработка типового проекта под требования клиента</li>
                        <li className={s.feature}>Разработка эскизного проекта</li>
                        <li className={s.feature}>Разработка рабочего проекта</li>
                    </ul>
                </Card>
                <Card>
                    <h3>Производство и монтаж</h3>
                    <ul className={s.features}>
                        <li className={s.feature}>Коттеджи, дачные дома</li>
                        <li className={s.feature}>Бани, технические постройки</li>
                        <li className={s.feature}>Беседки, заборы, гаражи, детские домики</li>
                    </ul>
                </Card>
            </div>
        </Content>
    </section>
);
