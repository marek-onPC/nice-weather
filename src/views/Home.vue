<template>
  <HeroImage/>
  <div class="main-wrapper">
    <div class="main-inner">
      <Search @search-city="searchCity"/>
      <Tabs :city="visitorCity"/>
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
      visitorCity: ''
    }
  },
  methods: {
    getVisitorData () {
      return axios.get('http://api.ipstack.com/check?access_key=')
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setVisitorIp () {
      this.getVisitorData().then(data => {
        this.visitorCity = data.city
      })
    },
    searchCity (value) {
      this.visitorCity = value
    }
  },
  created () {
    this.setVisitorIp()
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
