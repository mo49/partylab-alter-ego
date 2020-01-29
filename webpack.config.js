const path = require('path');
const readConfig = require('read-config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const SRC = './src';
const constants = readConfig(`./${SRC}/constants.yml`);
const SUB = constants.SUB_DIR ? `/${constants.SUB_DIR}` : '';
const DEST = `./public${SUB}`;

const htmlTemplates = Object.assign(
    {},
    constants,
    {
        meta: readConfig(`${SRC}/pug/meta.yml`)
    }
);

module.exports = {
    mode: 'development',
    entry: {
        'js/script.js': `${SRC}/js/script.js`,
        'js/about.js': `${SRC}/js/about.js`,
        'css/style.css': `${SRC}/scss/style.scss`,
        'css/about.css': `${SRC}/scss/about.scss`,
    },
    output: {
        filename: './[name]',
        path: path.resolve(__dirname, DEST),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                    cacheDirectory: true,
                }
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            root: path.resolve(`${SRC}/pug/`),
                            pretty: true,
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                            }
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [ `${SRC}/scss` ],
                                }
                            },
                        },
                    ]
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    devServer: {
        contentBase: './public',
        open: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            templateParameters: htmlTemplates,
            template: `${SRC}/pug/page/index.pug`,
            filename: 'index.html',
            inject: false,
        }),
        new HTMLWebpackPlugin({
            templateParameters: htmlTemplates,
            template: `${SRC}/pug/page/about.pug`,
            filename: 'about.html',
            inject: false,
        }),
        // css
        new ExtractTextPlugin(`./[name]`)
    ],
    cache: true,
    resolve: {
        extensions: ['.js', '.json', '.scss', '*'],
    },
}