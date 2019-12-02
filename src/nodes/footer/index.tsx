import React from 'react';
import Link from 'next/link';

import { Content } from 'components/content';
import { NAVIGATION, NavigationItem } from 'common/fixtures/navigation';
import { EMAIL } from 'common/fixtures/contacts';

import s from './styles.scss';

export const Footer: React.FunctionComponent = (): React.ReactElement => (
    <footer className={s.footer}>
        <Content className={s.links}>
            <div className={s.column}>
                <div className={s.columnName}>Навигация</div>
                {NAVIGATION.map(
                    ({ href, title, content }: NavigationItem): React.ReactElement => (
                        <div className={s.linkWrapper} key={title}>
                            <Link href={href}>
                                <span title={title} className={s.link}>
                                    {content}
                                </span>
                            </Link>
                        </div>
                    ),
                )}
            </div>
            <div className={s.column}>
                <div className={s.columnName}>Дополнительная информация</div>
                <div className={s.linkWrapper}>
                    <a href={EMAIL.link} title="Сообщить об ошибке" className={s.link}>
                        Сообщить об ошибке
                    </a>
                </div>
            </div>
        </Content>
        <div className={s.signs}>
            <Content className={s.signsWrapper}>
                <span>ООО "Делма"</span>
                <span>2019</span>
                <span>Все права защищены</span>
            </Content>
        </div>
    </footer>
);
