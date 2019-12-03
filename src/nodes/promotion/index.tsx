import React, { useState, useEffect } from 'react';

import { Preview, details } from 'common/fixtures/promotions';
import { Card } from 'components/card';
import { Button } from 'components/button';
import { Popup } from 'components/popup';

import s from './styles.scss';

const PromotionPopup = ({ visible, onClose, detailsID }) => {
    const { title, description } = details.find(({ id }) => id === detailsID);
    return (
        <Popup visible={visible} onClose={onClose}>
            <div className={s.popup}>
                <Popup.Header onClose={onClose}>{title}</Popup.Header>
                <Popup.Content>
                    {description.map((paragraph: string, index: number) => (
                        <p key={`paragraph-${index}`}>{paragraph}</p>
                    ))}
                </Popup.Content>
            </div>
        </Popup>
    );
};

export const Promotion: React.FunctionComponent<Preview> = ({
    id,
    title,
    description,
}: Preview): React.ReactElement => {
    const [isPopupVisible, changePopupVisibility] = useState(false);

    const openPopup = () => {
        changePopupVisibility(true);
    };

    const closePopup = () => {
        changePopupVisibility(false);
    };

    return (
        <Card className={s.promotion}>
            <div className={s.special}>Акция</div>
            <div className={s.description}>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className={s.controls}>
                    <Button blue onClick={openPopup} />
                </div>
            </div>
            <PromotionPopup detailsID={id} visible={isPopupVisible} onClose={closePopup} />
        </Card>
    );
};
