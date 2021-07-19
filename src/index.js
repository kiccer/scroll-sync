class ScrollSync {
    constructor (...e) {
        console.log(...e)
    }
}

function test () {}
test()

// function scrollSync () {
//     const products = []

//     this.$refs['product-price-card'].forEach((n, i) => {
//         const el = n.$el.querySelector('.list-scroll')
//         const event = e => {
//             if (!this.toggle.mini) return // 手机端时不进行滚动同步

//             products.filter(n => n.el !== e.target).forEach(n => {
//                 clearTimeout(n.timer)
//                 n.el.removeEventListener('scroll', n.event)
//                 n.el.scrollTo(0, e.target.scrollTop)
//                 n.timer = setTimeout(() => {
//                     n.el.addEventListener('scroll', n.event)
//                 }, 50)
//             })
//         }

//         products.push({ el, event })

//         el.addEventListener('scroll', event)
//     })
// }

// console.log(scrollSync)

module.exports = ScrollSync
