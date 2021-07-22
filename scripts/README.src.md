# Scroll Sync

![](https://img.shields.io/badge/version-${package.version}-blue?style=flat-square&logo)
![](https://img.shields.io/badge/min%20%20size-${min.size}-brightgreen?style=flat-square&logo)
![](https://img.shields.io/badge/gzip%20%20size-${gzip.size}-brightgreen?style=flat-square&logo)
![](https://img.shields.io/github/issues/kiccer/scroll-sync?style=flat-square&logo)
![](https://img.shields.io/github/forks/kiccer/scroll-sync?style=flat-square&logo)
![](https://img.shields.io/github/stars/kiccer/scroll-sync?style=flat-square&logo)
![](https://img.shields.io/github/license/kiccer/scroll-sync?style=flat-square&logo)

Scroll synchronization (`scroll-sync`), which associates multiple elements with scroll properties (`overflow: scroll`). When a scroll event occurs in one of the elements, the scroll effect is mapped to all the elements associated with it. To achieve synchronization purposes. `scroll-sync` supports fixed synchronization (`px`) and relative synchronization (`%`).

## INSTALL

```shell
npm install -S scroll-sync
# OR
yarn add scroll-sync
```

## USAGE

```js
import ScrollSync from 'scroll-sync'

const ss = new ScrollSync({
    disabled: false, // [Boolean] Default value, allow to be empty.
    relative: true, // [Boolean] Default value, allow to be empty.
    doms: document.querySelectorAll('.scroll-container') // [Array] These elements must set scroll attributes.
})

// do sth....
// You can also find another opportunity to set related elements after instantiating the object.
ss.set(document.querySelectorAll('.scroll-container'))

// Or add or delete.
// ss.add([elements])
// ss.remove([elements])

// You can also actively clear the listener event and clear the cache.
// ss.clear()

```

## DOCUMENT
[Please click here for an online experience. (中文)](https://kiccer.github.io/scroll-sync/)

## ABOUT
This library is an additional product obtained from my actual work. Because I don’t use it frequently, I will not actively add any new functions except for necessary problem fixes. If you have any new function requirements, please Leave me a message in [`ISSUES`](https://github.com/kiccer/scroll-sync/issues) and I will help you achieve it in my spare time.
<!-- 这个库是我实际工作中得到的额外产物，因为我自身使用它的频率并不高，所以除了必要的问题修复外我不会积极增加任何新的功能，如果你有任何新的功能需求，请在 `ISSUES` 中给我留言，我会在闲暇时间帮助你实现它。 -->
