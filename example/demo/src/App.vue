<template>
  <div id="app">
    <img v-lazy="url">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      url: 'http://resource.cm233.com/img/201806/01/e4/0d4ca27cdd2a8d69dae67b684acdece4.jpg',
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
