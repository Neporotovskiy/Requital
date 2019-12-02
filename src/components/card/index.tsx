import React from 'react';
import classNames from 'classnames';

import s from './styles.scss';

interface Props {
    children: React.ReactNode;
    className?: string;
    [property: string]: any;
}

export const Card: React.FunctionComponent<Props> = ({ children, className, ...rest }): React.ReactElement => (
    <div className={classNames(s.card, className)} {...rest}>
        {children}
    </div>
);
