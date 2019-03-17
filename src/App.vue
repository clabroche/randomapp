<template>
  <div id="app">
    <div class="banner" @click="clickBanner()">Randoms</div>
    <div class="router">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickBanner() {
      console.log('lkj')
      this.$router.push({name: 'randoms'})
    }
  },
}
</script>

<style lang="scss">
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

  * {
    box-sizing: border-box;
  }
</style>

<style scoped lang="scss">
  .banner {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #85a9b7;
    margin-bottom: 10px;
    flex-shrink: 0;
    color:white;
    font-weight: bold;
    font-size: 1.2em;
  }
  .router {
    overflow:auto;
  }
</style>
