export default {
    install(Vue, options={}) {
        const IMG = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='

        function addListener(el, binding, vnode, oldVnode) {            
            el.src = IMG            
            setTimeout(()=>{
                console.log(binding.value)
                el.src = binding.value
            }, 1000)
        }

        Vue.directive('lazy', {
            bind: addListener,
            unbind: () => {}
        })
    }
}