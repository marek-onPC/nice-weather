<template>
  <div>
    {{ weatherData }}
    <div class="weather-now__outer">
      <div class="weather-now__wrapper-left">
        <div class="weather-now__title">
          <h2>{{ city[0] }}</h2>
          <p>{{ city[1] }}</p>
          <p>{{ city[2] }}</p>
        </div>
        <div class="weather-now__description">
          <img v-if="weatherData.current.weather[0].icon !== ''" :src="'http://openweathermap.org/img/wn/' +  weatherData.current.weather[0].icon + '@2x.png'" alt="">
          <p>{{ weatherData.current.weather[0].description }}</p>
        </div>
        <div class="weather-now__temperature">
          <h4>Temperature: </h4>
          <h4>Feels like: </h4>
        </div>
      </div>
      <div class="weather-now__wrapper-right">

      </div>
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
        current: {
          weather: [
            {
              icon: '',
              description: ''
            }
          ]
        }
      }
    }
  },
  methods: {
    getWeather () {
      return axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.city[1] + '&lon=' + this.city[2] + '&exclude=minutely,hourly,daily&units=metric&appid=')
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
    debounce(function () {
      this.setWeather()
    }, 500)
  },
  watch: {
    city: debounce(function () {
      this.setWeather()
    }, 500)
  }
}
</script>

<style>

</style>
