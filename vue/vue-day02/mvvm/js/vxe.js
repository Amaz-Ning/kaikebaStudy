class Vxe {
  constructor(options) {
    // 保存设置选项
    this.$options = options
    // 保存data选项
    this.$data = options.data
    // 对data选项进行响应化处理 劫持
    this.observe(this.$data)
  }
  // 观察者 顾名思义 把data里面的属性全看一遍
  observe(data) {
    // 判断 如果data不存在 或者data不是对象的话 结束执行
    if (!data || typeof data !== 'object') {
      // 这里不能直接throw Error 后面还需要进行递归判断
      return
    }
    // 通过Object.keys将data对象的key值存在一个数组中
    // 开始观察 进行数据劫持
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      // 给key做一个代理 直接将key挂载到this对象上
      this.proxyData(key)
    })
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(val) {
        this.$data[key] = val
      }
    })
  }
  // 劫持者 劫持每个属性 做相应操作
  // obj 接收data
  defineReactive(obj, key, val) {
    // 递归判断
    this.observe(val)
    // 进行数据劫持
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      // 如果访问这个值
      get() {
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      // 如果修改这个值
      set(newVal) {
        if (newVal === val) {
          return
        }
        // 保存一下私有变量
        val = newVal
        // 如果新值是对象的话 就要在执行一遍observe
        if (typeof newVal === 'object') {
          this.observe(newVal)
        }
        dep.notify()
        console.log('更新数据')
      }
    })
  }
}

// 收集所有的依赖 在变化的时候通知更新
class Dep {
  constructor() {
    this.deps = []
  }
  // 添加依赖
  addDep(dep) {
    this.deps.push(dep)
  }
  // 通知更新
  notify() {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}

// 执行具体的更新操作
class Watcher {
  constructor(vm, key) {
    // 将Watcher实例放到Dep的静态属性上 依赖收集时会用到
    Dep.target = this
    this.vm = vm
    this.key = key
  }
  // 更新方法
  update() {
    console.log('属性更新了')
  }
}
