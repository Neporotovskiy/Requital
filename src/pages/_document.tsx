import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import './styles.scss';

export default class extends Document {
    render(): React.ReactElement {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <div id="popup-mounting-point" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
