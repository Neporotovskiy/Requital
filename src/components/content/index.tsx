import React from 'react';
import classNames from 'classnames';

import s from './styles.scss';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Content: React.FunctionComponent<Props> = ({ children, className }): React.ReactElement => (
    <div className={classNames(s.layout, className)}>{children}</div>
);
