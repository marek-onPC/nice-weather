<template>
<div class="mdl-tabs">
  <nav class="mdl-tabs__tab-bar">
    <router-link to="/" class="mdl-tabs__tab">Now</router-link>
    <router-link to="today" class="mdl-tabs__tab">Today</router-link>
    <router-link to="tomorrow" class="mdl-tabs__tab">Tomorrow</router-link>
    <router-link to="sevendays" class="mdl-tabs__tab">Next seven days</router-link>
  </nav>
  <div class="mdl-tabs__panel mdl-shadow--2dp">
    <router-view v-slot="{ Component }" :city="city">
      <transition name="fade" mode="out-in">
      <component :is="Component" />
      </transition>
    </router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'Tabs',
  props: ['city'],
  data () {
    return {
      activeTab: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.mdl-tabs {
  margin-top: 85px;

  @media (min-width: 768px) {
    margin-top: 50px;
  }

  &__tab {
    padding: 0 12px;

    @media (min-width: 768px) {
      padding: 0 24px;
    }
  }

  &__tab-bar {
    flex-wrap: wrap-reverse;

    @media (min-width: 576px) {
      flex-wrap: nowrap;
    }

    @media (min-width: 768px) {
      justify-content: flex-start;
      padding-left: 50px;
    }
  }

  &__panel {
    min-height: 250px;
    padding: 50px 25px;
    background-color: rgba(255, 255, 255, 0.7);

    ul, ol {
      margin: 0;
      padding: 0;
    }
  }
}

.mdl-tabs__tab {
  color: #fff;
  font-weight: 800;
  border: 1px solid #fff;
  border-bottom: none;
  transition: all 0.15s cubic-bezier(.4,0,1,1);

  &::after {
    height: 2px;
    width: 0%;
    display: block;
    content: " ";
    bottom: 0;
    left: 50%;
    position: absolute;
    background: rgb(0,188,212);
    transition: all 0.15s cubic-bezier(.4,0,1,1);
  }
}

.router-link-exact-active {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.25);

  &::after {
    height: 2px;
    width: 100%;
    display: block;
    content: " ";
    bottom: 0;
    left: 0;
    position: absolute;
    background: rgb(0,188,212);
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
