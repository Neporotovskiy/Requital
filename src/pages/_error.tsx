import React, { Fragment } from 'react';
import Head from 'next/head';

import { Header } from 'nodes/header';
import { Footer } from 'nodes/footer';

interface Props {
    code?: string;
}

interface Message {
    header: string;
    title: string;
}

export default class extends React.PureComponent<Props> {
    static getInitialProps = ({ res, err }) => {
        const code = res ? res.statusCode : err ? err.statusCode : null;
        return { code };
    };

    getErrorMessage = (): Message => {
        const { code } = this.props;
        switch (String(code)) {
            case '404': {
                return {
                    header: 'Страница не найдена',
                    title: 'Страница, которую Вы ищете не найдена. Возможно, она была удалена или перемещена.',
                };
            }
            default: {
                return {
                    header: 'Что-то пошло не так',
                    title: 'На странице произошла ошибка. Вернитесь на главную и перезагрузите страницу.',
                };
            }
        }
    };

    render() {
        const { header, title } = this.getErrorMessage();
        return (
            <Fragment>
                <Head>
                    <title>Ошибка | ООО "Делма"</title>
                </Head>
                <Header header={header} title={title} />
                <Footer />
            </Fragment>
        );
    }
}
