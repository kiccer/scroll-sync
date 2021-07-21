const fs = require('fs')
const chalk = require('chalk')
// README.md 源文件
const mdSrc = fs.readFileSync('./scripts/README.src.md', 'utf-8')
// package.json 包信息
const packageJSON = JSON.parse(
    fs.readFileSync('./package.json', 'utf-8')
)
const startTime = Date.now()

console.log(chalk`{cyan.bold Start building README.md}
`)

// https://shields.io/category/social (-_ 这3个符号要特殊控制)
const shieldsFormat = v => v.replace(/[-_ ]?/g, s => s + s)

// 需要重写的键值对
const rewrites = {
    'package.version': packageJSON.version
}

// 重写内容
const README = Object.keys(rewrites)
    .reduce((md, key) => {
        const st = Date.now()
        const res = md.replace(new RegExp('[$]{' + key + '}', 'g'), shieldsFormat(rewrites[key]))

        // 输出重写信息
        console.log(chalk`Rewrite: {blue \$\{${key}\}} -> {blue ${rewrites[key]}} {gray (${Date.now() - st}ms)}`)

        return res
    }, mdSrc)

// 写出文件
fs.writeFileSync('./README.md', README, 'utf-8')

console.log(chalk`
{green README.md build finish.} {gray (${Date.now() - startTime}ms)}`)
