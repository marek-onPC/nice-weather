<template>
  <div>
    <div class="loading-screen" v-if="weatherData === ''">
      <div class="mdl-spinner mdl-js-spinner is-active"></div>
    </div>
    <main class="weather-now__outer" v-if="weatherData !== ''">
      <div class="weather-now__wrapper-left">
        <div class="weather-now__title">
          <h2>{{ city[0] }}</h2>
          <p>Lat: {{ city[1] }}</p>
          <p>Lon: {{ city[2] }}</p>
        </div>
        <div class="weather-card-image mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand" :style="{ backgroundImage: 'url(' + require('@/assets/images/' + weatherData.weather[0].icon + '.jpg') + ')' }">
          </div>
          <div class="mdl-card__actions">
            <span class="weather-card-image__filename">
              <div class="weather-now__description">
                <p><strong>{{ weatherData.weather[0].description }}</strong></p>
              </div>
            </span>
          </div>
        </div>
        <div class="weather-now__temperature">
          <h4>Temperature: <strong>{{ weatherData.main.temp }} °C</strong></h4>
          <h4>Feels like: <strong>{{ weatherData.main.feels_like }} °C</strong></h4>
        </div>
      </div>
      <div class="weather-now__wrapper-right">
        <div class="weather-now__inner-right">
          <h5 class="weather-now__time">Current time: <strong>{{ formattedCurrentTime }} </strong></h5>
          <div class="weather-now__minmax-temp">
            <h5>Temp. min: <strong>{{ weatherData.main.temp_min }} °C</strong></h5>
            <h5>Temp. max: <strong>{{ weatherData.main.temp_max }} °C</strong></h5>
          </div>
          <h5>Humidity: <strong>{{ weatherData.main.humidity }} %</strong></h5>
          <h5>Pressure: <strong>{{ weatherData.main.pressure }} hPa</strong></h5>
          <h5>Wind: <strong>{{ weatherData.wind.speed }} m/s</strong></h5>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
const axios = require('axios').default

export default {
  name: 'Now',
  props: ['city'],
  data () {
    return {
      weatherData: '',
      formattedCurrentTime: ''
    }
  },
  methods: {
    getWeather () {
      return axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.city[0] + '&units=metric&appid=' + this.city[3])
        .then(function (response) {
          console.log(response.data)
          return response.data
        })
        .catch(function (error) {
          console.log(error)
          debounce(function () {
            this.setWeather()
          }, 500)
        })
    },
    setWeather () {
      this.getWeather().then(data => {
        if (data) {
          this.weatherData = data
          var currentTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000 + data.timezone * 1000)
          var currentTimeHours = currentTime.getHours()
          var currentTimeMinutes = '0' + currentTime.getMinutes()
          this.formattedCurrentTime = currentTimeHours + ':' + currentTimeMinutes.substr(-2)
        }
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
    city: debounce(function () {
      this.setWeather()
    }, 500)
  },
  mounted () {
    this.refreshMDL()
  }
}
</script>

<style lang="scss" scoped>
.loading-screen {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}

.weather-now {
  &__outer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;

    @media (min-width: 576px) {
      margin: 0;
    }

    @media (min-width: 768px) {
      flex-direction: row;
      margin: 0;
    }

    @media (min-width: 1200px) {
      margin: 0 125px;
    }

  }

  &__wrapper-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }
  }

  &__title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(0,0,0,.1);

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

  &__description {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      text-transform: capitalize;
    }

  }

  &__temperature {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__time {
    margin-bottom: 25px;
  }

  &__minmax-temp {
    width: 100%;
    margin-bottom: 25px;
    text-align: center;

    @media (min-width: 768px) {
      text-align: end;
    }
  }

  &__wrapper-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }

    h5 {
      width: 100%;
      text-align: center;

      @media (min-width: 768px) {
        text-align: end;
      }
    }
  }

  &__inner-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.weather-card-image {
  &.mdl-card {
    width: 250px;
    height: 150px;
    margin: 25px 0;
  }

  .mdl-card__title {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .mdl-card__actions {
    height: 52px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.05);
  }

  &__filename {
    color: #232323;
    font-size: 14px;
  }
}

</style>
