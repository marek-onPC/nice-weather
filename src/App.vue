<template>
  <HeroImage :city="cityToCheck"/>
  <nav class="app-nav__bar">
    <router-link to="/" class="app-nav__link" :class="{'router-link-exact-active' : weatherPageButton == 1}">
      <button class="mdl-button mdl-button--nav mdl-js-button mdl-js-ripple-effect">
        Weather
      </button>
    </router-link>
    <router-link to="/about" class="app-nav__link">
      <button class="mdl-button mdl-button--nav mdl-js-button mdl-js-ripple-effect">
        About
      </button>
    </router-link>
  </nav>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
</template>

<script>
import HeroImage from '@/components/HeroImage.vue'

export default {
  components: {
    HeroImage
  },
  data () {
    return {
      weatherPageButton: 0
    }
  },
  watch: {
    $route: function () {
      if (this.$route.path !== '/about') {
        this.weatherPageButton = 1
      } else {
        this.weatherPageButton = 0
      }
    }
  }
}
</script>

<style lang="scss">
* {
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  font-family: 'Montserrat', sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  color: #232323;
  margin: 50px 10px;
  max-width: 1000px;

  @media (min-width: 576px) {
    margin: 50px 40px;
  }

  @media (min-width: 768px) {
    margin: 50px 100px;
  }

  @media (min-width: 1200px) {
    margin: 50px auto;
  }
}

.app-nav {
  &__bar {
    position: absolute;
    top: -26px;
    right: 0;
  }

  &__link {
    height: 100%;

    .mdl-button--nav {
      color: #fff;
      font-weight: 800;
      height: 26px;
      line-height: 26px;
    }

    &.router-link-exact-active {
      display: none;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.25s;
  transition-property: all;
  transition-timing-function: ease-in;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter-from,
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(15px);
}
</style>
