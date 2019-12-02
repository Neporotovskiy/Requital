import React from 'react';
import classNames from 'classnames';

import { Icon } from 'components/icon';

import s from './styles.scss';

export interface Props {
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    success?: boolean;
    [key: string]: any;
}

export const Input: React.FunctionComponent<Props> = ({
    type,
    value,
    onChange,
    onBlur,
    placeholder,
    className,
    error,
    success,
    ...rest
}): React.ReactElement => (
    <div className={classNames(s.field, className)}>
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            className={classNames(s.input, {
                [s.hasError]: Boolean(error),
                [s.hasSuccess]: success,
            })}
            {...rest}
        />
        {Boolean(error) && (
            <Icon className={s.icon} error>
                {error}
            </Icon>
        )}
        {success && <Icon className={s.icon} success />}
    </div>
);

Input.defaultProps = {
    type: 'text',
};
