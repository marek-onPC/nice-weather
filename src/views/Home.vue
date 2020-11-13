<template>
  <HeroImage :city="cityToCheck"/>
  <div class="main-wrapper">
    <div class="main-inner">
      <Search @search-city="searchCity"/>
      <Tabs :city="[visitorCity, visitorCityLat, visitorCityLon, weatherAPI]"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import HeroImage from '@/components/HeroImage.vue'
import Tabs from '@/components/Tabs.vue'
const axios = require('axios').default

export default {
  name: 'Home',
  components: {
    Search,
    HeroImage,
    Tabs
  },
  data () {
    return {
      visitorCity: '',
      visitorCityLat: '',
      visitorCityLon: '',
      ipAPI: '',
      weatherAPI: ''
    }
  },
  methods: {
    getVisitorData () {
      return axios.get('http://api.ipstack.com/check?access_key=' + this.ipAPI)
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setVisitorCity () {
      this.getVisitorData().then(data => {
        this.visitorCity = data.city
      })
    },
    getVisitorLatLon () {
      return axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.visitorCity + '&units=metric&appid=' + this.weatherAPI)
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setVisitorLatLon () {
      this.getVisitorLatLon().then(data => {
        this.visitorCityLat = data.coord.lat
        this.visitorCityLon = data.coord.lon
      })
    },
    searchCity (value) {
      this.visitorCity = value
    }
  },
  created () {
    this.setVisitorCity()
  },
  watch: {
    visitorCity: function () {
      this.setVisitorLatLon()
    }
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
