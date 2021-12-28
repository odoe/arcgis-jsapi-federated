const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');

const deps = require('./package.json').dependencies;

module.exports = (_, arg) => {
    const config = {
        entry: ['./src/index.js'],
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'http://localhost:3001/',
            clean: true
        },
        mode: arg.mode,
        devServer: {
            // contentBase: path.resolve(__dirname, 'dist'),
            port: 3001,
            // writeToDisk: true,
            headers: {
                // cors
                'Access-Control-Allow-Origin': '*'
            }
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'arcgis',
                library: { type: 'var', name: 'arcgis' },
                // federated entry file
                filename: 'remoteEntry.js',
                exposes: {
                    // expose each component you want 
                    './components': './src/index',
                    // this could be expanded with layers, geometry, etc
                },
                shared: {
                    // this is just an aggressive way of sharing deps across apps
                    ...deps,
                    '@arcgis/core': { singleton: true }
                },
            }),
        ]
    };

    return config;
}