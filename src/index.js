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
        const Listeners = []
        const opt = {
            preload: options.preload || 1.2,            
            errImg: options.errImg || IMG,
            loadingImg: options.loadingImg || IMG,
            try: options.try || 0,
            events: options.events || EVENTS,
            hasBind: false,
        }

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
                opt.events.forEach((evt)=>{
                    Tools.on(el, evt, loadImg)
                })
            }else {
                opt.events.forEach((evt)=>{
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
                load(listener)                
            }
        }

        function load(listener) {     
            if(listener.try > opt.try) return false
            listener.try++      
            const el = listener.el 
            const src = listener.src 
            asyncLoadImg(listener, ()=>{
                render(el, src, 'loaded')
                Listeners.remove(listener)
            }, (err)=>{
                render(el, opt.errImg, 'error')
            })
        }

        function asyncLoadImg(item, resolve, reject) {
            const img = new Image()
            img.src = item.src
            img.onload = function() {
                resolve({
                    src: img.src
                })
            }
            img.onerror = function(err) {
                reject(err)
            }
        }

        function render(el, src, status) {
            el.src = src
            el.setAttribute('status', status)            
        }

        function isInView(listener) {
            const rect = listener.el.getBoundingClientRect()
            return (rect.top < window.innerHeight && rect.bottom > 0) &&
            (rect.left < window.innerWidth && rect.right > 0)
        }       
        
        function isExist(el) {
            let isExist = false
            Listeners.forEach(listener => {
                if(listener.src == el.src) isExist = true
            })
            
            if(isExist) {
                Vue.nextTick(()=>{
                    loadImg()
                })
            }

            return isExist
        }

        function addListener(el, binding, vnode, oldVnode) {    
            if(isExist(el)) return
            
            const loadingImg = opt.loadingImg
            render(el, loadingImg, 'loading')

            Vue.nextTick(() => {
                Listeners.push({
                    src: binding.value,
                    try: 0,
                    el: el,
                })
                loadImg()
                if(Listeners.length > 0 && !opt.hasBind) {
                    console.log('first listen scroll')
                    opt.hasBind = true
                    events(window, true)
                }
            })
        }

        Vue.directive('lazy', {
            bind: addListener,
            unbind: () => {}
        })
    }
}