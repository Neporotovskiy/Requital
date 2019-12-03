import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

import s from './styles.scss';

interface Props {
    visible: boolean;
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
}

interface SubComponentProps {
    children: React.ReactNode;
    onClose?: (event: SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
}

export class Popup extends React.PureComponent<Props> {
    static Header = function Header({ children, className, onClose }: SubComponentProps): React.ReactElement {
        return (
            <div className={classNames(s.header, className)}>
                <h3 className={s.title}>{children}</h3>
                <div className={s.close} onClick={onClose} />
            </div>
        );
    };

    static Content = ({ children, className }: SubComponentProps): React.ReactElement => (
        <div className={classNames(s.content, className)}>{children}</div>
    );

    static Footer = ({ children, className }: SubComponentProps): React.ReactElement => (
        <div className={classNames(s.footer, className)}>{children}</div>
    );

    getMountingPoint = () => (typeof document !== 'undefined' ? document.getElementById('popup-mounting-point') : null);

    render(): React.ReactElement {
        const { visible, onClose, children } = this.props;
        const target = this.getMountingPoint();
        if (target !== null && visible) {
            return ReactDOM.createPortal(
                <div className={s.container}>
                    <div className={s.overlay} onClick={onClose} />
                    <div className={s.popup}>{children}</div>
                </div>,
                target,
            );
        }
        return null;
    }
}
