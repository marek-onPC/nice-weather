<template>
  <div>
    <div class="weather-now__outer">
      <div class="weather-now__wrapper-left">
        <div class="weather-now__title">
          <h2>{{ city[0] }}</h2>
          <p>Lat: {{ city[1] }}</p>
          <p>Lon: {{ city[2] }}</p>
        </div>
        <div class="weather-card-image mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
            <img v-if="weatherData.weather[0].icon !== ''" :src="'http://openweathermap.org/img/wn/' +  weatherData.weather[0].icon + '@2x.png'" alt="">
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
        <h5 class="weather-now__time">Current time: <strong>{{ weatherData.main.humidity }} </strong></h5>
        <div class="weather-now__minmax-temp">
          <h5>Temp. min: <strong>{{ weatherData.main.temp_min }} °C</strong></h5>
          <h5>Temp. max: <strong>{{ weatherData.main.temp_max }} °C</strong></h5>
        </div>
        <h5>Humidity: <strong>{{ weatherData.main.humidity }} %</strong></h5>
        <h5>Pressure: <strong>{{ weatherData.main.pressure }} hPa</strong></h5>
        <h5>Wind: <strong>{{ weatherData.wind.speed }} m/s</strong></h5>
      </div>
    </div>
    <div class="weather-now__maps">
    </div>
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
      weatherData: {
        weather: [
          {
            icon: '',
            description: ''
          }
        ],
        main: {
          temp: '',
          feels_like: '',
          humidity: '',
          pressure: ''
        },
        wind: {
          speed: ''
        }
      }
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
        })
    },
    setWeather () {
      this.getWeather().then(data => {
        this.weatherData = data
      })
    }
  },
  created () {
    this.setWeather()
  },
  watch: {
    city: debounce(function () {
      this.setWeather()
    }, 500)
  }
}
</script>

<style lang="scss">
.weather-now {
  &__outer {
    display: flex;
    justify-content: space-between;
    margin: 0 150px;
  }

  &__wrapper-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }

  &__title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 25px;

    h2 {
      width: 100%;
      text-align: center;
      height: 48px;
      font-weight: 800;
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
    text-align: end;
    margin-bottom: 25px;

    h5 {
      width: 100%;
      text-align: end;
    }
  }

  &__wrapper-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;

    h5 {
      width: 100%;
      text-align: end;
    }
  }
}

.weather-card-image {
  &.mdl-card {
    width: 250px;
    height: 150px;
  }

  .mdl-card__title {
    justify-content: center!important;
    background: rgba(0, 0, 0, 0.15);
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
