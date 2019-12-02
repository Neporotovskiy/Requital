const sass = require('@zeit/next-sass');
const images = require('next-images');
const path = require('path');

module.exports = images(
    sass({
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]',
            camelCase: 'dashesOnly',
        },
        webpack(config) {
            config.resolve.alias.components = path.join(__dirname, 'src/components');
            config.resolve.alias.nodes = path.join(__dirname, 'src/nodes');
            config.resolve.alias.common = path.join(__dirname, 'src/common');
            return config;
        },
    }),
);
