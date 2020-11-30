<template>
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
import Tabs from '@/components/Tabs.vue'
const axios = require('axios').default

export default {
  name: 'Home',
  components: {
    Search,
    Tabs
  },
  data () {
    return {
      visitorCity: '',
      visitorCityLat: '',
      visitorCityLon: '',
      ipAPI: '8a009f2246c5cce50f469dac05b69485',
      weatherAPI: '75f9685f116b28f3c9b5ad6246d906ae'
    }
  },
  methods: {
    getVisitorData () {
      return axios.get('https://api.ipstack.com/check?access_key=' + this.ipAPI)
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
      return axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.visitorCity + '&units=metric&appid=' + this.weatherAPI)
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
    },
    refreshMDL () {
      if (typeof componentHandler !== 'undefined') {
        window.componentHandler.upgradeAllRegistered()
      }
    }
  },
  created () {
    this.setVisitorCity()
  },
  mounted () {
    this.refreshMDL()
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
