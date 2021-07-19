const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs/lib'),
        filename: 'scroll-sync.min.js',
        library: 'ScrollSync',
        libraryTarget: 'umd'
    },
    watch: true,
    watchOptions: {
        ignored: [
            '**/node_modules/',
            '.vscode',
            '.history',
            'dist',
            'docs'
        ],
        aggregateTimeout: 600,
        poll: 1000
    }
    // devServer: {
    //     contentBase: path.join(__dirname, './'),
    //     compress: true,
    //     port: 9000
    // }
}
