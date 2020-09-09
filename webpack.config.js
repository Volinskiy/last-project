
const Encore = require('@symfony/webpack-encore'),

      path = require('path'),

      BUILD_MODE = process.env.BUILD_MODE || 'dev',
      IS_DEV_SERVER = process.env.NODE_DEV_SERVER || false,

      // Точки входа
      entries = require('./assets/conf/entries.js'),

      // Ресурсы для сборки
      pathToEntries = './assets/src/',

      SpriteLoaderPlugin = require('svg-sprite-loader/plugin'),

      dateTimeStamp = (new Date()).getTime();


Encore
    .configureRuntimeEnvironment(BUILD_MODE)

    // directory where compiled assets will be stored
    .setOutputPath('htdocs/assets/build/')

    // public path used by the web server to access the output path
    .setPublicPath('/assets/build')

    // Запрещаем файл runtime.js
    .disableSingleRuntimeChunk()

    // Подключаем less
    .enableLessLoader()

    // Очистка дирректории хранения скомпилированных файлов перед компиляцией
    .cleanupOutputBeforeBuild()

    // Создавать карты кода при режиме "Не prod"
    .enableSourceMaps(!Encore.isProduction())

    // Указываем куда и как класть скомпилированные файлы
    .configureFilenames({
        js: 'js/[name]' + '.js',
        css: 'css/[name]' + '.css',
        images: 'img/[name]' + dateTimeStamp + '.[ext]',
        fonts: 'fonts/[name].[ext]'
    })

    .disableImagesLoader()

    .addRule({
        test: /\.(png|jpg|jpeg|gif|ico|webp)$/,
        loader: 'file-loader',
        options: {
            name: 'img/[name]' + dateTimeStamp + '.[ext]'
        }
    })

    .addRule({
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
            emitFile: false,
            name: 'img/sprite' + dateTimeStamp + '.svg#[name]-usage'
        }
    })

    .addLoader({
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
            extract: true,
            spriteFilename: 'img/sprite' + dateTimeStamp + '.svg'
        }
    })

    .addPlugin(new SpriteLoaderPlugin({}))

    // .addLoader({
    //     test: /\.js$/,
    //     enforce: 'pre',
    //     loader: 'eslint-loader',
    //     exclude: /node_modules/,
    //     options: {
    //         configFile: './.eslintrc.js',
    //         emitWarning: true
    //     }
    // })


    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery'
    })


    .configureBabel(babelConf => {
        babelConf.presets = [['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 3
        }]];
        babelConf.plugins = ['@babel/plugin-proposal-class-properties'];
    },
    {
        includeNodeModules: ['swiper', 'dom7']
    });

if (IS_DEV_SERVER) {
    Encore
        .disableCssExtraction()
        .enableSourceMaps(false);
}

// Устанавливаем точки входа
for (let key in entries) {
    Encore.addEntry(key, pathToEntries + entries[key]);
}


// Получение объекта конфигурации Webpack
let webpackConf = Encore.getWebpackConfig();


webpackConf.devServer = {
    contentBase: path.join(__dirname, 'htdocs'),
    // publicPath: "http://localhost:8080",
    compress: true,
    hot: true,
    port: 9012
};
module.exports = webpackConf;
