<template>
  <div class="hero-wrapper">
    <img class="hero-image" src="../assets/images/day.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'HeroImage'
}
</script>

<style lang="scss" scoped>
.hero {
  &-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%);
      width: 100%;
      height: 100%;
    }
  }

  &-image {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}
</style>
