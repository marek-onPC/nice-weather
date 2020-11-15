<template>
  <div class="about__container">
    <h1 class="about__title">About</h1>
    <div class="about__inner">
      <p>This site has been built as a Single Page Application in Vue.js framework <img class="about__image" src="../assets/Vue_Logo.png" alt="" srcset=""> and Material Design Lite framework  <img class="about__image" src="../assets/Google_Material_Design_Logo.png" alt="" srcset="">.</p>
      <p>All weather data comes from Open Weather API.</p>
      <p>Initial area for weather searching is based on client's IP comes from ipstack API.</p>
      <p>All photos comes from unsplash.com</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  &__container {
    color: #fff;
  }

  &__title {
    text-align: center;

    @media (min-width: 576px) {
      text-align: left;
      margin-bottom: 75px;
    }

  }

  &__inner {
    padding: 50px;
    background-color: rgba(0, 0, 0, 0.7);

    p {
      font-size: 18px;
      padding-bottom: 15px;
      margin-bottom: 25px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  &__image {
    height: 26px;
  }
}
</style>
