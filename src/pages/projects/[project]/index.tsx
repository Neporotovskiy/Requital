import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import { NextComponentType, NextPageContext } from 'next';

import { Detailed, details } from 'common/fixtures/projects';
import { divideByGroups } from 'common/utils';

import { Header } from 'nodes/header';
import { Footer } from 'nodes/footer';
import { Content } from 'components/content';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { Popup } from 'components/popup';
import { Checkbox } from 'components/checkbox';
import { Form, REQUEST_TYPE } from 'components/form';

import s from './styles.scss';

interface DescriptionFC extends React.FC {
    Characteristics: React.FC<any>;
    Options: React.FC<any>;
    Price: React.FC<any>;
}

export const Story = ({ children }) => (
    <section className={s.wrapper}>
        <Content>
            <Card className={s.description}>
                <h2>О проекте</h2>
                {children.map((description, index) => (
                    <p key={`paragraph-${index}`}>{description}</p>
                ))}
            </Card>
        </Content>
    </section>
);

export const Gallery = ({ children }) => {
    if (children.length === 0) return null;
    const defaultPopupData = {
        visible: false,
        src: '',
        description: '',
    };
    const [index, changeIndex] = useState(0);
    const [popup, setPopupData] = useState(defaultPopupData);

    const isPreviousUnavailable = index === 0;
    const isNextUnavailable = children.length <= 2 || index === children.length - 2;

    const switchToNextPhoto = () => {
        changeIndex(index + 1);
    };

    const switchToPreviousPhoto = () => {
        changeIndex(index - 1);
    };

    const openPopup = (src, description) => () => {
        setPopupData({
            visible: true,
            src,
            description,
        });
    };

    const closePopup = () => {
        setPopupData(defaultPopupData);
    };

    return (
        <div className={s.illustrations} style={{ backgroundImage: `url("/${children[0].src}")` }}>
            <div className={s.filter}>
                <Content>
                    <h2>Галерея изображений</h2>
                    <div className={s.content} style={{ transform: `translateX(-${index * 524}px)` }}>
                        {children.map(({ src, description }) => (
                            <img
                                className={s.illustration}
                                src={`/${src}`}
                                alt={description}
                                onClick={openPopup(src, description)}
                                key={description}
                            />
                        ))}
                    </div>
                    <div className={s.pagination}>
                        <Button
                            blue
                            small
                            disabled={isPreviousUnavailable}
                            className={s.paginationButton}
                            onClick={switchToPreviousPhoto}
                        >
                            Предыдущая фотография
                        </Button>
                        <Button
                            blue
                            small
                            disabled={isNextUnavailable}
                            className={s.paginationButton}
                            onClick={switchToNextPhoto}
                        >
                            Следующая фотография
                        </Button>
                    </div>
                </Content>
            </div>
            <Popup visible={popup.visible} onClose={closePopup}>
                <Popup.Header>{popup.description}</Popup.Header>
                <img className={s.openedIllustration} src={`/${popup.src}`} alt={popup.description} />
            </Popup>
        </div>
    );
};

export const Description: DescriptionFC = ({ children }) => (
    <div className={s.wrapper}>
        <Content>
            <Card className={s.details}>{children}</Card>
        </Content>
    </div>
);

Description.Characteristics = ({ characteristics }) => (
    <div className={s.section}>
        <h2>Характеристики постройки</h2>
        {characteristics.length ? (
            characteristics.map(({ name, value, units }) => (
                <div className={s.characteristic} key={`characteristic-${name}`}>
                    <div className={s.name}>{name}</div>
                    <b>
                        {value} {units}
                    </b>
                </div>
            ))
        ) : (
            <div className={s.empty}>Отсутствуют</div>
        )}
    </div>
);

Description.Options = ({ options }) => {
    return (
        <div className={s.section}>
            <h2>Дополнительные опции</h2>
            {options.length ? (
                options.map(({ name }, index) => <div key={name}>{name}</div>)
            ) : (
                <div className={s.empty}>Отсутствуют</div>
            )}
        </div>
    );
};

Description.Price = ({ price, openPopup }) => (
    <div className={s.section}>
        <h2>Начальная стоимость</h2>
        <h1>{divideByGroups(price)} ₽</h1>
        <Button blue onClick={openPopup}>
            Оформить заказ
        </Button>
    </div>
);

const Project: NextComponentType<NextPageContext, Detailed, Detailed> = ({
    id,
    name,
    shortDescription,
    detailedDescription,
    background,
    illustrations,
    characteristics,
    options,
    price,
}: Detailed): React.ReactElement => {
    const [isPopupVisible, changePopupVisibility] = useState(false);

    const openPopup = (): void => {
        changePopupVisibility(true);
    };

    const closePopup = (): void => {
        changePopupVisibility(false);
    };

    return (
        <Fragment>
            <Head>
                <title>{`Проект "${name}"`} | ООО "Делма"</title>
            </Head>
            <Header
                header={`Проект "${name}"`}
                title={shortDescription}
                background={background}
                buttons={[
                    <Button key="order" blue onClick={openPopup}>
                        Оформить заказ
                    </Button>,
                ]}
            />
            <Story>{detailedDescription}</Story>
            <Gallery>{illustrations}</Gallery>
            <Description>
                {characteristics.length > 0 && <Description.Characteristics characteristics={characteristics} />}
                {options.length > 0 && <Description.Options options={options} />}
                <Description.Price price={price} openPopup={openPopup} />
            </Description>
            <Footer />
            <Popup visible={isPopupVisible} onClose={closePopup}>
                <Popup.Header>Оформить заказ</Popup.Header>
                <Popup.Content className={s.popupContent}>
                    <p>Наш специалист свяжется с Вами и поможет оформить заявку на реализацию проекта "{name}"</p>
                    <Form type={REQUEST_TYPE.ORDER_VIA_PROJECT} meta={name} />
                </Popup.Content>
            </Popup>
        </Fragment>
    );
};

Project.getInitialProps = ({ query: { project } }: NextPageContext): Detailed =>
    details.find(({ id }: Detailed): boolean => project === id);

export default Project;
