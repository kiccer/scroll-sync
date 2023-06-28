import type { EvtParams, options } from './types'

const $el = function (el: HTMLElement) {
  return [
    document,
    document.documentElement,
  ].includes(el)
    ? document
    : el
}

const $on = function (el: HTMLElement, ...evtParams: EvtParams) {
  $el(el).addEventListener(...evtParams)
}

const $off = function (el: HTMLElement, ...evtParams: EvtParams) {
  $el(el).removeEventListener(...evtParams)
}

const $target = function (target: any) {
  return target.documentElement || target
}

export class ScrollSync {
  constructor(config: Partial<options>) {
    const {
      disabled = false,
      relative = true,
      x = true,
      y = true,
      doms = [],
    } = config

    this.doms = [...doms]
    this.disabled = disabled
    this.relative = relative
    this.x = x
    this.y = y
    this.syncData = []
    this.autoSync()
  }

  private doms: HTMLElement[]
  private disabled: boolean
  private relative: boolean
  private syncData: any[]
  private x: boolean
  private y: boolean

  // 增加同步元素
  add(els: HTMLElement | HTMLElement[]) {
    if (!els || (Array.isArray(els) && !els?.length))
      throw new Error('Please enter the element or element group.')
    this.clearSync()
    this.doms = this.doms.concat(els)
    this.autoSync()
  }

  // 删除同步元素
  remove(els: HTMLElement | HTMLElement[]) {
    if (!els || (Array.isArray(els) && !els?.length))
      throw new Error('Please enter the element or element group.')
    const delList = ([] as HTMLElement[]).concat(els)
    this.clearSync()
    this.doms = this.doms.filter(n => !delList.includes(n))
    this.autoSync()
  }

  // 设置同步元素
  set(els: HTMLElement | HTMLElement[]) {
    if (!els || (Array.isArray(els) && !els?.length))
      throw new Error('Please enter the element or element group.')
    this.clearSync()
    this.doms = ([] as HTMLElement[]).concat(els)
    this.autoSync()
  }

  // 清除同步
  clearSync() {
    this.syncData.forEach((n) => {
      $off(n.el, 'scroll', n.event)
    })
    this.syncData = []
  }

  // 同步滚动方法
  autoSync() {
    this.clearSync()

    this.doms.forEach((el, i) => {
      const event = (e: Event) => {
        if (this.disabled)
          return

        const {
          scrollWidth,
          scrollHeight,
          scrollLeft,
          scrollTop,
          clientWidth,
          clientHeight,
        } = $target(e.target)

        // 当前进度条滚动时，控制其他绑定元素的进度条
        this.syncData.filter(n => n.el !== $target(e.target)).forEach((n) => {
          // 连续滚动时清除其他绑定元素的绑定事件定时器
          clearTimeout(n.timer)
          // 首先清除其他元素的绑定事件，防止套娃
          $off(n.el, 'scroll', n.event)

          // 判断同步方式 是否是相对同步(按百分比)
          if (this.relative) {
            const progressW = scrollWidth - clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0
            const progressH = scrollHeight - clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0

            const {
              scrollWidth: _scrollWidth,
              scrollHeight: _scrollHeight,
              clientWidth: _clientWidth,
              clientHeight: _clientHeight,
            } = $target(n.el)

            const x = (_scrollWidth - _clientWidth) * progressW
            const y = (_scrollHeight - _clientHeight) * progressH
            if (this.x && this.y)
              $target(n.el).scrollTo(x, y)
            else if (this.x && !this.y)
              $target(n.el).scrollTo(x, $target(n.el).scrollTop)
            else if (!this.x && this.y)
              $target(n.el).scrollTo($target(n.el).scrollLeft, y)
          }
          else {
            if (this.x && this.y)
              $target(n.el).scrollTo(scrollLeft, scrollTop)
            else if (this.x && !this.y)
              $target(n.el).scrollTo(scrollLeft, $target(n.el).scrollTop)
            else if (!this.x && this.y)
              $target(n.el).scrollTo($target(n.el).scrollLeft, scrollTop)
          }

          // 滚动同步完成后为其他元素重新设置滚动监听事件 (延迟50ms，也就是说在一个元素上滚动后，在50ms内移动到其他绑定元素上进行滚动操作，滚动同步会不生效，但是这种概率极低。)
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
