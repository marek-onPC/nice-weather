<template>
<div class="mdl-tabs">
  <nav class="mdl-tabs__tab-bar">
    <router-link to="/" class="mdl-tabs__tab" @click="activeTab = 1" :class="{'is-tab-active': activeTab == 1}">World</router-link>
    <router-link to="europe" class="mdl-tabs__tab" @click="activeTab = 2" :class="{'is-tab-active': activeTab == 2}">Europe</router-link>
  </nav>
  <div class="mdl-tabs__panel">
    <router-view v-slot="{ Component }">
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
  data () {
    return {
      activeTab: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.mdl-tabs {
  margin-top: 50px;

  &__tab-bar {
    justify-content: flex-start;
    padding-left: 50px;
  }

  &__panel {
    min-height: 250px;
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.8);

    ul, ol {
      margin: 0;
      padding: 0;
    }
  }
}

.mdl-tabs__tab {
  color: #fff;
  font-weight: 800;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  transition: all 0.15s cubic-bezier(.4,0,1,1);

  &:first-of-type {
    border-left: none;
  }

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

.is-tab-active {
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
