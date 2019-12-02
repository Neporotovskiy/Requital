import React from 'react';

import { Content } from 'components/content';
import { Menu } from 'components/menu';

import s from './styles.scss';

interface Props {
    buttons?: ReadonlyArray<React.ReactElement>;
    header?: React.ReactNode;
    title?: React.ReactNode;
    background?: string;
}

export const Header: React.FunctionComponent<Props> = ({ buttons, header, title, background }): React.ReactElement => (
    <React.Fragment>
        <Menu />
        <header className={s.header} {...(background ? { style: { backgroundImage: `url("/${background}")` } } : {})}>
            <div className={s.filter}>
                <Content>
                    {header && <h1 className={s.title}>{header}</h1>}
                    {title && <h3 className={s.title}>{title}</h3>}
                    {buttons &&
                        buttons.length > 0 && (
                            <div className={s.buttons}>
                                {buttons.map(
                                    (button: React.ReactNode, index: number): React.ReactNode => (
                                        <div key={`Button-${index}`} className={s.button}>
                                            {button}
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                </Content>
            </div>
        </header>
    </React.Fragment>
);
