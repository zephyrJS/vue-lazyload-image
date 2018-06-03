import Vue from 'vue'
import App from './App.vue'
import LazyLoad from '../../../src/index'

const loadingImg = require('./assets/loading.gif')

Vue.use(LazyLoad, {
  loadingImg: loadingImg  
})

new Vue({
  el: '#app',
  render: h => h(App)
})
