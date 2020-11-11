<template>
  <div>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
  </div>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'Today',
  props: ['city'],
  methods: {
    getWeatherToday (city) {
      return axios.get('http://api.ipstack.com/check?access_key=')
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    console.log(this.city)
  }
}
</script>

<style>

</style>
