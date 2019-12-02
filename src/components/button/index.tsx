import React from 'react';
import classNames from 'classnames';

import s from './styles.scss';

interface Props {
    children?: React.ReactNode;
    className?: string;
    blue?: boolean;
    gray?: boolean;
    flat?: boolean;
    disabled?: boolean;
    small?: boolean;
    medium?: boolean;
    [key: string]: any;
}

/**
 * Common button component
 * @param {React.ReactElement} children - Received children
 * @param {string} className - Additional class name for button
 * @param {boolean} [blue=false] - Button color parameter
 * @param {boolean} [gray=true] - Button color parameter
 * @param {boolean} [flat=false] - Button shadow parameter
 * @param {boolean} [disabled=false] - Button color and interactivity parameter
 * @param {boolean} [small=false] - Button size parameter
 * @param {boolean} [medium=true] - Button size parameter
 * @param {any} rest - Other additional properties that may be useful
 */
export const Button: React.FunctionComponent<Props> = React.forwardRef<HTMLButtonElement, Props>(
    ({ children, className, blue, gray, flat, disabled, small, medium, ...rest }, ref): React.ReactElement => (
        <button
            ref={ref}
            {...rest}
            className={classNames(s.btn, className, {
                [s.gray]: gray && !blue,
                [s.blue]: blue,
                [s.flat]: flat,
                [s.disabled]: disabled,
                [s.small]: small,
                [s.medium]: medium && !small,
            })}
            disabled={disabled}
        >
            {children}
        </button>
    ),
);

Button.defaultProps = {
    children: 'Подробнее',
    blue: false,
    gray: true,
    flat: false,
    disabled: false,
    small: false,
    medium: true,
};
