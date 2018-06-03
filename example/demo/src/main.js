import Vue from 'vue'
import App from './App.vue'
import LazyLoad from '../../../src/index'

Vue.use(LazyLoad)

new Vue({
  el: '#app',
  render: h => h(App)
})
