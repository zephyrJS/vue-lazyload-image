<template>
  <div id="app">
    <template v-for="(item, index) in imgList">
      <img v-lazy="item.url" :key="index" :data-index="index">
    </template>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      imgList: [
        { url:'http://resource.cm233.com/chapter/b_197/cf208a15bbc12e5bdf6b314e666a0d58.jpg?size=900x2000' },
        { url:'http://resource.cm233.com/chapter/b_197/8f48058196f38959c85ae891a402329c.jpg?size=900x700' },
        { url:'http://resource.cm233.com/chapter/b_197/8f48058196f38959c85ae891a402329c.jpg?size=900x700' },
        { url:'http://resource.cm233.com/chapter/b_197/8f48058196f38959c85ae891a402329c.jpg?size=900x700' },
        { url: 'http://resource.cm233.com/chapter/b_197/20a2932858c81953b984e54fc4cfab0c.jpg?size=900x2000' },
        { url: 'http://resource.cm233.com/chapter/b_197/a202d20f7032bbe19b362bc011174402.jpg?size=900x700' },
        { url: 'http://resource.cm233.com/chapter/b_197/aea07b905b54c0c562281c3c0dadcaf8.jpg?size=900x2000' },
        { url: 'http://resource.cm233.com/chapter/b_197/33f57cb6fbc4fe1f7520975c20a08e7c.jpg?size=900x700' },
        { url: 'http://resource.cm233.com/chapter/b_197/efc53d281ca66b7a5b5135b018731630.jpg?size=900x2000' },
        { url: 'http://resource.cm233.com/chapter/b_197/e03cbca147f83f2eb8ac6126bf397f71.jpg?size=900x700' },
        { url: 'http://resource.cm233.com/chapter/b_197/d2b12b1d30a4d632dd23d2c888eb733a.jpg?size=900x2000' },
        { url: 'http://resource.cm233.com/chapter/b_197/1df2c9e6fc0e25721fe5c79bb43fa0c8.jpg?size=900x700' },
        { url: 'http://resource.cm233.com/chapter/b_197/57fd81bc03e58ec6b3faef65e69db14d.jpg?size=900x2000' },
        { url: 'http://resource.cm233.com/chapter/b_197/9d728dc2152260678a81590c274eb274.jpg?size=900x700' },
        { url: 'http://resource.cm233.com/chapter/b_197/09bfa66538f4746fbe62ff62a0e7d6c8.jpg?size=900x2000' },
        { url: 'http://resource.cm233.com/chapter/b_197/375e157937e9e5f25efcf9be037aa1af.jpg?size=900x2000' },
        { url: 'http://resource.cm233.com/chapter/b_197/00854dca6290cfbdc3be40517649562a.jpg?size=900x700' },
      ],
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
}

img {
  background: grey;
  width: 100%;
  min-height: 600px;
}
</style>
