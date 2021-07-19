const path = require('path')

module.exports = {
    port: 3000,
    files: [
        // './**/*.{html,htm,css,js}'
        path.resolve(__dirname, '**/*.{html,htm,css,less,js}')
    ],
    server: {
        baseDir: './docs'
    }
}
