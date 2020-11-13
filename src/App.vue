<template>
  <router-view/>
</template>

<style lang="scss">
* {
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  font-family: 'Montserrat', sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #232323;
  margin: 0 10px;
  max-width: 1200px;

  @media (min-width: 576px) {
    margin: 0 40px;
  }

  @media (min-width: 768px) {
    margin: 0 100px;
  }

  @media (min-width: 1200px) {
    margin: 0 auto;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
