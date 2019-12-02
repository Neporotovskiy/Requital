import React from 'react';
import classNames from 'classnames';

import s from './styles.scss';

interface Props {
    error?: boolean;
    success?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
    className?: string;
}

export const Icon: React.FunctionComponent<Props> = ({
    error,
    success,
    onClick,
    children,
    className,
}): React.ReactElement => {
    const withTooltip = typeof children !== 'undefined';
    return (
        <div
            className={classNames(s.icon, className, {
                [s.error]: error,
                [s.success]: success,
                [s.withTooltip]: withTooltip,
            })}
            onClick={onClick}
        >
            {withTooltip && <div className={s.tooltip}>{children}</div>}
        </div>
    );
};
