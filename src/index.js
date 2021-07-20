const $el = function (el) {
    return [
        document,
        document.documentElement
    ].includes(el)
        ? document
        : el
}

const $on = function (el, ...evtParams) {
    $el(el).addEventListener(...evtParams)
}

const $off = function (el, ...evtParams) {
    $el(el).removeEventListener(...evtParams)
}

class ScrollSync {
    constructor (config = {}) {
        const {
            disabled = false,
            relative = true,
            doms = []
        } = config

        this.doms = [...doms]
        this.disabled = disabled
        this.relative = relative
        this.syncData = []
        this.autoSync()
    }

    // 增加同步元素
    add (els = []) {
        if (!els && !els.length) throw Error('Please enter the element or element group.')
        this.doms = this.doms.concat(els)
        this.autoSync()
    }

    // 删除同步元素
    remove (els = []) {
        if (!els && !els.length) throw Error('Please enter the element or element group.')
        const delList = [].concat(els)
        this.doms = this.doms.filter(n => !delList.includes(n))
        this.autoSync()
    }

    // 设置同步元素
    set (els = []) {
        if (!els && !els.length) throw Error('Please enter the element or element group.')
        this.doms = [].concat(els)
        this.autoSync()
    }

    // 清除同步
    clearSync () {
        this.syncData.forEach(n => {
            $off(n.el, 'scroll', n.event)
        })
        this.syncData = []
    }

    // 同步滚动方法
    autoSync () {
        this.clearSync()

        this.doms.forEach((el, i) => {
            const event = e => {
                if (this.disabled) return

                const {
                    scrollWidth,
                    scrollHeight,
                    scrollLeft,
                    scrollTop,
                    clientWidth,
                    clientHeight
                } = (e.target.documentElement || e.target)

                this.syncData.filter(n => n.el !== e.target).forEach(n => {
                    clearTimeout(n.timer)
                    $off(n.el, 'scroll', n.event)

                    if (this.relative) {
                        const progressW = scrollLeft / (scrollWidth - clientWidth)
                        const progressH = scrollTop / (scrollHeight - clientHeight)

                        const {
                            scrollWidth: _scrollWidth,
                            scrollHeight: _scrollHeight,
                            // scrollLeft: _scrollLeft,
                            // scrollTop: _scrollTop,
                            clientWidth: _clientWidth,
                            clientHeight: _clientHeight
                        } = (n.el.documentElement || n.el)

                        ;(n.el.documentElement || n.el).scrollTo(
                            (_scrollWidth - _clientWidth) * progressW,
                            (_scrollHeight - _clientHeight) * progressH
                        )
                    } else {
                        ;(n.el.documentElement || n.el).scrollTo(
                            e.target.scrollLeft,
                            e.target.scrollTop
                        )
                    }

                    n.timer = setTimeout(() => {
                        $on(n.el, 'scroll', n.event)
                    }, 50)
                })
            }

            this.syncData.push({ el, event })

            $on(el, 'scroll', event)
        })
    }
}

module.exports = ScrollSync
