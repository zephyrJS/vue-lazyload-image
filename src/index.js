Array.prototype.remove = function(item){
    if(!this.length) return
    const index = this.indexOf(item)
    if(index !== -1) {
        return this.splice(index, 1)
    }
}
export default {
    install(Vue, options = {}) {
        const IMG = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='
        const EVENTS = ['wheel', 'scroll', 'touchmove']

        const opt = {
            hasBind: false
        }

        const Listeners = []

        function throttle(action, delay) {
            let timeout = null
            let lastRun = 0
            return function () {
                if (timeout) {
                    return
                }
                let elapsed = Date.now() - lastRun
                let context = this
                let args = arguments
                let runCallback = function () {
                    lastRun = Date.now()
                    timeout = false
                    action.apply(context, args)
                }
                if (elapsed >= delay) {
                    runCallback()
                } else {
                    timeout = setTimeout(runCallback, delay)
                }
            }
        }

        const Tools = {
            on: (el, evt, callback) => {
                el.addEventListener(evt, callback, false)
            },
            off: (el, evt, callback) => {
                el.removeEventListener(evt, callback, false)
            }
        }

        function events(el, bindType) {
            if(bindType) {
                EVENTS.forEach((evt)=>{
                    Tools.on(el, evt, loadImg)
                })
            }else {
                EVENTS.forEach((evt)=>{
                    Tools.off(el, evt, loadImg)
                })
            }
        }

        function loadImg() {
            Listeners.forEach(listener => {
                checkImg(listener)
            })
        }

        function checkImg(listener) {
            if(isInView(listener)) {
                console.log('load')
                listener.el.src = listener.src
                Listeners.remove(listener)
                console.log(Listeners.length)
            }
        }

        function isInView(listener) {
            const rect = listener.el.getBoundingClientRect()
            return (rect.top < window.innerHeight && rect.bottom > 0) &&
            (rect.left < window.innerWidth && rect.right > 0)
        }

        function addListener(el, binding, vnode, oldVnode) {
            let hasBind = opt.hasBind

            Vue.nextTick(() => {
                Listeners.push({
                    src: binding.value,
                    el: el,
                })
                loadImg()
                if(Listeners.length > 0 && !hasBind) {
                    console.log('first listen scroll')
                    hasBind = true
                    events(window, true)
                }
                // EVENTS.forEach((event) => {
                //     throttle(
                //         el.addEventListener(event, (evt) => {
                //             const rect = evt.target.getBoundingClientRect()
                //             if (
                //                 (rect.top < window.innerHeight && rect.bottom > 0) &&
                //                 (rect.left < window.innerWidth && rect.right > 0)
                //             ) {
                //                 console.log(el)
                //                 console.log('inView')
                //                 el.src = binding.value
                //             }
                //         }, false)
                //     , 300)
                // })
            })
        }

        Vue.directive('lazy', {
            bind: addListener,
            unbind: () => {}
        })
    }
}