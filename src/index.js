export default {
    install(Vue, options = {}) {
        const IMG = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='
        const EVENTS = ['wheel', 'scroll', 'touchmove']

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

        function addListener(el, binding, vnode, oldVnode) {
            // el.src = IMG
            Vue.nextTick(() => {
                EVENTS.forEach((event) => {
                    throttle(
                        el.addEventListener(event, (evt) => {
                            const rect = evt.target.getBoundingClientRect()
                            if (
                                (rect.top < window.innerHeight && rect.bottom > 0) &&
                                (rect.left < window.innerWidth && rect.right > 0)
                            ) {
                                console.log(el)
                                console.log('inView')
                                el.src = binding.value
                            }
                        }, false)
                    , 300)
                })
            })
        }

        Vue.directive('lazy', {
            bind: addListener,
            unbind: () => {}
        })
    }
}