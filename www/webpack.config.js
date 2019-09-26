module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
     contentBase: './',
      host: '0.0.0.0'
    },
};