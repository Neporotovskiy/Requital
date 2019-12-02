import React from 'react';
import classNames from 'classnames';

import s from './styles.scss';

interface Props {
    small?: boolean;
    light?: boolean;
}

export const Loader: React.FunctionComponent<Props> = ({ small, light }): React.ReactElement => (
    <span className={classNames(s.loader, { [s.small]: small, [s.light]: light })} />
);
