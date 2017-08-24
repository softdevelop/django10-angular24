const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');
const rootDist = 'static/dist/';
const absoluteRootDist = '/../'+rootDist;

const isProduction = process.env.NODE_ENV === 'production';

let plugins = [
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin([
        'public/js',
        'public/styles',
        'public/images/hashed',
        'public/fonts/hashed'
    ]),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        '__decorate': 'typescript-decorate',
        '__extends': 'typescript-extends',
        '__param': 'typescript-param',
        '__metadata': 'typescript-metadata'
    }),
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        __dirname
    ),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('styles/app-[hash].css'),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
	new HtmlWebpackPlugin({
		template: './public/index.html',
		chunksSortMode: 'dependency'
	}),
	/*
    new ManifestPlugin({
        fileName: 'rev-manifest.json'
    }),
	*/
];

if (isProduction) {
    plugins.push(
        new OptimizeCssAssetsPlugin(),
        /*new webpack.optimize.DedupePlugin(),*/
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    );
}

module.exports = {
    entry: {
        main: './src/typescript/main.ts',
        vendor: './src/typescript/vendor.ts',
        styles: './src/less/app.less'
    },
    devtool: isProduction ? 'source-map' : false,
    stats: {
        children: false
    },
    /*
    externals: {
        'jquery': 'jQuery'
    },
    */
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
                query: {
                    useForkChecker: true,
                    useBabel: true
                },
                /* exclude: /node_modules/ */
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?sourceMap',
                    publicPath: '/',
                    /* exclude: /node_modules/ */
                })
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?minimize?sourceMap!less-loader?minimize?sourceMap',
		    		/*loader: 'less?minimize?sourceMap',*/
                    publicPath: '/'
                    /* exclude: /node_modules/ */
                })
            }, {
                test: /\.(gif|png|jpg|jpeg|svg)($|\?)/,
                loaders: 'file-loader?limit=10000&name='+rootDist+'images/hashed/[name].[hash].[ext]',
                /* exclude: /node_modules/ */
            }, 
			{
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=10000&name='+rootDist+'fonts/hashed/[name].[hash].[ext]',
                /* exclude: /node_modules/ */
            }
        ]
    },
    plugins: plugins,
    output: {
        path: __dirname + absoluteRootDist,
    	publicPath : absoluteRootDist,
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/chunks/[name].[chunkhash].js'
    }
};
