import React from 'react';
import App from 'next/app';

import './styles.scss';

export default class extends App {
    render() {
        const { Component, pageProps } = this.props;
        return <Component {...pageProps} />;
    }
}
