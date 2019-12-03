import React, { useState } from 'react';
import Head from 'next/head';

import * as projects from 'common/fixtures/projects';
import * as promotions from 'common/fixtures/promotions';

import { Header } from 'nodes/header';
import { Project } from 'nodes/project';
import { Promotion } from 'nodes/promotion';
import { Footer } from 'nodes/footer';

import { Card } from 'components/card';
import { Button } from 'components/button';
import { Content } from 'components/content';
import { Popup } from 'components/popup';
import { Form, REQUEST_TYPE } from 'components/form';

import s from './styles.scss';

interface Entity extends projects.Preview, promotions.Preview {
    type: 'project' | 'promotion';
}

const getEntities = (): ReadonlyArray<projects.Preview | promotions.Preview> => {
    const result = [];
    let direction = true;
    projects.previews.forEach((preview: projects.Preview, index: number) => {
        const promotion = promotions.previews[index];
        if (direction) {
            result.push({ ...preview, type: 'project' });
            if (typeof promotion !== 'undefined') result.push({ ...promotion, type: 'promotion' });
        } else {
            if (typeof promotion !== 'undefined') result.push({ ...promotion, type: 'promotion' });
            result.push({ ...preview, type: 'project' });
        }
        direction = !direction;
    });
    return result;
};

const Projects: React.FunctionComponent = (): React.ReactElement => {
    const [isPopupVisible, changePopupVisibility] = useState(false);

    const openPopup = (): void => {
        changePopupVisibility(true);
    };

    const closePopup = (): void => {
        changePopupVisibility(false);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Проекты | ООО "Делма"</title>
            </Head>
            <Header header="Проекты" title="Популярные проекты загородных построек" />
            <div className={s.projects}>
                <Content className={s.content}>
                    {getEntities().map(
                        (entity: Entity, index: number): React.ReactNode => {
                            switch (entity.type) {
                                case 'project':
                                    return (
                                        <div className={s.entity} key={`${entity.type} ${index}`}>
                                            <Project {...(entity as projects.Preview)} />
                                        </div>
                                    );
                                case 'promotion':
                                    return (
                                        <div className={s.entity} key={`${entity.type} ${index}`}>
                                            <Promotion {...(entity as promotions.Preview)} />
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        },
                    )}
                </Content>
                <Content>
                    <Card className={s.proposial}>
                        <div className={s.proposialDescription}>
                            Расскажите о своем проекте, разместив его описание и фотографии на данной странице
                        </div>
                        <Button className={s.proposialButton} blue onClick={openPopup}>
                            Связаться с нами
                        </Button>
                    </Card>
                </Content>
            </div>
            <Footer />
            <Popup visible={isPopupVisible} onClose={closePopup}>
                <Popup.Header onClose={closePopup}>Разместить проект</Popup.Header>
                <Popup.Content className={s.popupContent}>
                    <p>Наш специалист свяжется с Вами чтобы получить данные проекта</p>
                    <Form type={REQUEST_TYPE.PROJECT_PLACEMENT_REQUEST} />
                </Popup.Content>
            </Popup>
        </React.Fragment>
    );
};

export default Projects;
