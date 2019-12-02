import React from 'react';
import Head from 'next/head';
import { Element, scroller } from 'react-scroll';

import { scrollToContactsSection } from 'common/utils';
import { Header } from 'nodes/header';
import { Directions } from 'nodes/directions';
import { About } from 'nodes/about';
import { Workflow } from 'nodes/workflow';
import { Contacts } from 'nodes/contacts';
import { Footer } from 'nodes/footer';

import { Button } from 'components/button';
import { Quiz } from 'components/quiz';

const Index: React.FunctionComponent = (): React.ReactElement => (
    <React.Fragment>
        <Head>
            <title>Главная | ООО "Делма"</title>
        </Head>
        <Header
            header="Строим дом вместе"
            title="Строительство современных деревянных домов"
            buttons={[
                <Quiz>
                    {openQuiz => (
                        <Button blue title="Рассчитать примерную стоимость строительства" onClick={openQuiz}>
                            Рассчитать стоимость
                        </Button>
                    )}
                </Quiz>,
                <Button blue title="Заказать звонок" onClick={scrollToContactsSection}>
                    Заказать звонок
                </Button>,
            ]}
        />
        <Directions />
        <About />
        <Workflow />
        <Element name="contacts">
            <Contacts />
        </Element>
        <Footer />
    </React.Fragment>
);

export default Index;
