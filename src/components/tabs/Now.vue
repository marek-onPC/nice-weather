<template>
  <div>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    {{ weatherData }}
  </div>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'Now',
  props: ['city'],
  data () {
    return {
      weatherData: 'x'
    }
  },
  methods: {
    getWeather () {
      return axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&appid=')
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
  watch: {
    city: function () {
      this.setWeather()
    }
  }
}
</script>

<style>

</style>
