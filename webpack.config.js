const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scroll-sync.min.js'
    },
    watch: true,
    watchOptions: {
        ignored: [
            '**/node_modules/'
        ],
        aggregateTimeout: 600,
        poll: 1000
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}
