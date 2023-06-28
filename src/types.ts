export interface options {
  // 是否禁用同步滚动，默认为false
  disabled: boolean
  // 是否相对滚动，默认为true
  relative: boolean
  // 是否同步x轴滚动，默认为true
  x: boolean
  // 是否同步y轴滚动，默认为true
  y: boolean
  // 同步滚动的元素列表
  doms: HTMLElement[]
}

export type EvtParams = [
  string,
  EventListenerOrEventListenerObject,
]

export interface ScrollSyncInstance {
  constructor: (options: Partial<options>) => void
  // 增加同步元素
  add: (dom: HTMLElement | HTMLElement[]) => void
  // 删除同步元素
  remove: (dom: HTMLElement | HTMLElement[]) => void
  // 设置同步元素
  set: (dom: HTMLElement | HTMLElement[]) => void
  // 清除同步
  clearSync: () => void
  // 同步滚动方法
  autoSync: () => void
}
