<template>
  <div>
    <div class="weather-today__outer">
      <div class="weather-today__title">
        <h2>{{ city[0] }}</h2>
        <p>Lat: {{ city[1] }}</p>
        <p>Lon: {{ city[2] }}</p>
      </div>
      <div class="weather-today__inner">
        <div class="weather-today__cards">
          <section class="mdl-card-today-card-square" v-for="(hour, index) in weatherData.hourly" :key="hour">
            <div class="mdl-card mdl-shadow--2dp" v-if="(index % 3 == 0)">
              <div class="mdl-card__title mdl-card--expand" :style="{ backgroundImage: 'url(' + require('@/assets/images/' + hour.weather[0].icon + '.jpg') + ')' }">
              </div>
              <div class="mdl-card__supporting-text">
                <p>{{ hour.dt }}</p>
              </div>
            </div>
          </section>
        </div>
        <div class="weather-today__settings">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
            Temperature
          </button>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
            Wind
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'Now',
  props: ['city'],
  data () {
    return {
      weatherData: ''
    }
  },
  methods: {
    getWeather () {
      return axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.city[1] + '&lon=' + this.city[2] + '&exclude=current,minutely,daily&units=metric&appid=' + this.city[3])
        .then(function (response) {
          console.log(response.data)
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setWeather () {
      this.getWeather().then(data => {
        this.weatherData = data
      })
    },
    refreshMDL () {
      if (typeof componentHandler !== 'undefined') {
        window.componentHandler.upgradeAllRegistered()
      }
    }
  },
  created () {
    this.setWeather()
  },
  watch: {
    city: function () {
      this.setWeather()
    }
  },
  mounted () {
    this.refreshMDL()
  }
}
</script>

<style lang="scss" scoped>
.weather-today {
  &__title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(0,0,0,.1);
    margin-bottom: 35px;

    h2 {
      width: 100%;
      text-align: center;
      height: 48px;
      font-size: 38px;
      font-weight: 800;

      @media (min-width: 768px) {
        font-size: 45px;
      }
    }

    p {
      font-size: 12px;
    }
  }

  &__inner {
    display: flex;
    flex-direction: row;
  }

  &__settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    .mdl-card {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 50px;
      min-height: 50px;
      margin-bottom: 10px;

      &-today-card-square {
        width: 100%;
      }

      &__title {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 200px;
      }
    }
  }
}
</style>
