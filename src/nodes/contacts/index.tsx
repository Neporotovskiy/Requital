import React from 'react';

import { PERSON, TELEPHONE, EMAIL, ADDRESS, LINK_TO_MAP } from 'common/fixtures/contacts';
import { Content } from 'components/content';
import { Card } from 'components/card';
import { Form, REQUEST_TYPE } from 'components/form';

import s from './styles.scss';

export const Contacts = () => (
    <section className={s.contacts} id="contacts">
        <Content>
            <h2>Контакты</h2>
            <div className={s.wrapper}>
                <Card>
                    <h3>Заказать звонок</h3>
                    <p>Компетентный специалист ответит на любые Ваши вопросы и поможет оформить заявку.</p>
                    <Form type={REQUEST_TYPE.CALL_REQUEST} />
                </Card>
                <Card>
                    <div className={s.label}>Контактное лицо</div>
                    <h3>{PERSON.full}</h3>
                    <div className={s.label}>Адрес электронной почты</div>
                    <h3>
                        <a href={EMAIL.link} className={s.link}>
                            {EMAIL.formatted}
                        </a>
                    </h3>
                    <div className={s.label}>Телефон</div>
                    <h3>
                        <a href={TELEPHONE.link} className={s.link}>
                            {TELEPHONE.formatted}
                        </a>
                    </h3>
                    <div className={s.label}>Адрес офиса</div>
                    <div className={s.map}>
                        <a target="_blank" href={LINK_TO_MAP} title="Показать на карте" className={s.filter}>
                            <span className={s.addressComponent}>{ADDRESS.city}</span>
                            <span className={s.addressComponent}>{ADDRESS.district}</span>
                            <div className={s.addressComponent}>{ADDRESS.street}</div>
                            <div className={s.addressComponent}>{ADDRESS.building}</div>
                        </a>
                    </div>
                </Card>
            </div>
        </Content>
    </section>
);
