# Scroll Sync

Scroll synchronization (`scroll-sync`), which associates multiple elements with scroll properties (`overflow: scroll`). When a scroll event occurs in one of the elements, the scroll effect is mapped to all the elements associated with it. To achieve synchronization purposes. `scroll-sync` supports fixed synchronization (`px`) and relative synchronization (`%`).

## Acknowledgements
This is a rewrite of [`scroll-sync`](https://github.com/kiccer/scroll-sync) with `typescript` and added some new features liking scroll-sync only by x or y.

## INSTALL

```shell
npm install @171h/scroll-sync
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

### API
##### .add()
// add elements to scroll-sync.
```js
ss.add(document.documentElement)
// or use array.
ss.add(document.querySelectorAll('.other-scroll-container'))
```

#### .remove()
// remove elements to scroll-sync.
```js
ss.remove(document.documentElement)
// or use array.
ss.remove(document.querySelectorAll('.other-scroll-container'))
```

#### .set()
// reset elements to scroll-sync.
```js
ss.set(document.documentElement)
// or use array.
ss.set(document.querySelectorAll('.other-scroll-container'))
```

#### .clear()
// reset elements to scroll-sync.
```js
ss.clear()
```


## DOCUMENT
[Please click here for an online experience. (中文)](https://kiccer.github.io/scroll-sync/)
