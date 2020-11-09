<template>
  <HeroImage/>
  <div class="main-wrapper">
    <div class="main-inner">
      <Search/>
      <Tabs/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import HeroImage from '@/components/HeroImage.vue'
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'Home',
  components: {
    Search,
    HeroImage,
    Tabs
  }
}
</script>

<style lang="scss">
.main {
  &-wrapper {
    width: 100%;
    min-height: 100vh;
  }

  &-inner {
    z-index: 1;
  }
}
</style>
