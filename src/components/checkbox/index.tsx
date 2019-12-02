import React from 'react';
import classNames from 'classnames';

import { Icon } from 'components/icon';

import s from './styles.scss';

export interface Props {
    checked: boolean;
    onChange?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    className?: string;
    children?: React.ReactNode;
}

export const Checkbox: React.FunctionComponent<Props> = ({
    checked,
    onChange,
    className,
    children,
}): React.ReactElement => (
    <div onClick={onChange}>
        <div className={classNames(s.checkbox, className)}>{checked && <Icon success />}</div>
        {children}
    </div>
);
