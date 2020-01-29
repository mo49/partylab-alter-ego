// Global imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Paths
const SRC = './src';
const DEST = './src/public';
const includePath = path.join(__dirname, SRC);
let outputPath = path.join(__dirname, DEST);
const nodeModulesPath = path.join(__dirname, 'node_modules');

// let outputPath = path.join(__dirname, 'src/public/js');

module.exports = env => {
  // Dev environment
  let devtool = 'eval';
  let mode = 'development';
  let stats = 'minimal';
  let plugins = [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(env.NODE_ENV)
    })
  ];

  // Prod environment
  if (env.NODE_ENV === 'prod') {
    devtool = 'hidden-source-map';
    mode = 'production';
    stats = 'none';
    outputPath = `${__dirname}/build/js`;
  }

  console.log('Webpack build -');
  console.log(`    - ENV: ${env.NODE_ENV}`);
  console.log(`    - outputPath  ${outputPath}`);
  console.log(`    - includePath ${includePath}`);
  console.log(`    - nodeModulesPath: ${nodeModulesPath}`);

  return {
    // Here the application starts executing
    // and webpack starts bundling
    entry: {
      'js/app.js': `${SRC}/js/app.js`,
      'css/app.css': `${SRC}/css/app.scss`
    },

    // options related to how webpack emits results
    output: {
      // the target directory for all output files
      // must be an absolute path (use the Node.js path module)
      path: outputPath,
      // the url to the output directory resolved relative to the HTML page
      publicPath: '',
      // the filename template for entry chunks
      filename: '[name]'
    },

    // Webpack 4 mode helper
    mode,

    // configuration regarding modules
    module: {
      // rules for modules (configure loaders, parser options, etc.)
      rules: [
        {
          test: /\.js?$/,
          use: {
            loader: 'babel-loader',
          },
          include: `${includePath}/js`,
          exclude: nodeModulesPath,
        },
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          use: [
            'raw-loader',
            'glslify-loader'
          ],
          exclude: nodeModulesPath
        },
        {
          test: /\.(s*)css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: `${DEST}/css`
              }
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
          include: `${includePath}/css`,
          exclude: nodeModulesPath,
        }
      ]
    },

    // options for resolving module requests
    // (does not apply to resolving to loaders)
    resolve: {
      // directories where to look for modules,
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ],

      // extensions that are used
      extensions: ['.js', '.json'],
    },

    performance: {
      hints: 'warning'
    },

    // lets you precisely control what bundle information gets displayed
    stats,

    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    devtool,

    devServer: {
      contentBase: 'src/public'
    },

    plugins: plugins.concat(
      new HtmlWebpackPlugin({
        title: 'Three.js Webpack ES6 Boilerplate',
        template: path.join(__dirname, 'src/html/index.html'),
        filename: '../index.html',
        env: env.NODE_ENV,
      }),
      new MiniCssExtractPlugin({
        filename: '../css/[name].css',
        chunkFilename: '../css/[id].css'
      }),
    ),

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\\/]node_modules[\\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  };
};
