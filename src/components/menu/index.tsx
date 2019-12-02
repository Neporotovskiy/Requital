import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { Content } from 'components/content';
import { Button } from 'components/button';
import { COMPANY, EMAIL, TELEPHONE, HOURS } from 'common/fixtures/contacts';
import { NAVIGATION } from 'common/fixtures/navigation';

import s from './styles.scss';

export const Menu: React.FunctionComponent = (): React.ReactElement => (
    <div className={s.menu}>
        <div className={s.wrapper}>
            <Content className={s.contacts}>
                <a href={EMAIL.link} className={classNames(s.link, s.interactive)}>
                    {EMAIL.formatted}
                </a>
                <a href={TELEPHONE.link} className={classNames(s.link, s.interactive)}>
                    {TELEPHONE.formatted}
                </a>
                <a className={s.link}>{HOURS.full}</a>
            </Content>
        </div>
        <div className={s.wrapper}>
            <Content className={s.navigation}>
                <Link href="/">
                    <h3 className={s.company} title="Главная страница">
                        {COMPANY}
                    </h3>
                </Link>
                <div>
                    {NAVIGATION.map(
                        ({ href, content, title }): React.ReactElement => (
                            <Link href={href} key={content}>
                                <Button flat small className={s.link} title={title} key={content}>
                                    {content}
                                </Button>
                            </Link>
                        ),
                    )}
                </div>
            </Content>
        </div>
    </div>
);
