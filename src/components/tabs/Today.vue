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
            <div class="mdl-card mdl-shadow--2dp" v-if="(index % 2 == 0)">
              <div class="mdl-card__title mdl-card--expand" :style="{ backgroundImage: 'url(' + require('@/assets/images/' + hour.weather[0].icon + '.jpg') + ')' }">
              </div>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 1">
                    <p><strong><small>{{ formattedTodayTime[index] }}</small></strong></p>
                    <p>Temperature: <br><strong>{{ hour.temp }}</strong></p>
                    <p>Feels like: <br><strong>{{ hour.feels_like }}</strong></p>
                </div>
                </transition>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 2">
                    <p><strong><small>{{ formattedTodayTime[index] }}</small></strong></p>
                    <p>Pressure: <br><strong>{{ hour.pressure }}</strong></p>
                    <p>Humidity: <br><strong>{{ hour.humidity }}</strong></p>
                    <p>Wind: <br><strong>{{ hour.wind_speed }}</strong></p>
                </div>
                </transition>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 3">
                    <p><strong><small>{{ formattedTodayTime[index] }}</small></strong></p>
                    <p>Clouds: <br><strong>{{ hour.humidity }}</strong></p>
                    <p v-for="(rain, index) in hour.rain" :key="index">Rain: <br><strong>{{ rain }}</strong></p>
                    <p v-for="(snow, index) in hour.snow" :key="index">Snow: <br><strong>{{ snow }}</strong></p>
                </div>
                </transition>
            </div>
          </section>
        </div>
        <div class="weather-today__settings">
          <nav class="mdl-tabs__tab-bar mdl-tabs--today">
            <div class="mdl-tabs__tab" @click="activeOption = 1" :class="{'mdl-tabs__tab--active' : activeOption == 1 }">Temperature</div>
            <div class="mdl-tabs__tab" @click="activeOption = 2" :class="{'mdl-tabs__tab--active' : activeOption == 2 }">Air</div>
            <div class="mdl-tabs__tab" @click="activeOption = 3" :class="{'mdl-tabs__tab--active' : activeOption == 3 }">Rain / snow</div>
            <div class="mdl-tabs__tab" @click="activeOption = 4" :class="{'mdl-tabs__tab--active' : activeOption == 4 }">Graphs</div>
          </nav>
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
      weatherData: '',
      formattedTodayTime: [],
      activeOption: 1
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
        this.weatherData.hourly = this.weatherData.hourly.slice(0, 24)
        for (let i = 0; i < 24; i++) {
          var todayTime = new Date(data.hourly[i].dt * 1000)
          var todayTimeMonth = todayTime.getMonth()
          switch (todayTimeMonth) {
            case 1:
              todayTimeMonth = 'January'
              break
            case 2:
              todayTimeMonth = 'February'
              break
            case 3:
              todayTimeMonth = 'March'
              break
            case 4:
              todayTimeMonth = 'April'
              break
            case 5:
              todayTimeMonth = 'May'
              break
            case 6:
              todayTimeMonth = 'June'
              break
            case 7:
              todayTimeMonth = 'July'
              break
            case 8:
              todayTimeMonth = 'August'
              break
            case 9:
              todayTimeMonth = 'September'
              break
            case 10:
              todayTimeMonth = 'October'
              break
            case 11:
              todayTimeMonth = 'November'
              break
            case 12:
              todayTimeMonth = 'December'
              break
          }

          var todayTimeDay = todayTime.getDate()
          var todayTimeHours = todayTime.getHours()
          var todayTimeMinutes = '0' + todayTime.getMinutes()
          this.formattedTodayTime[i] = todayTimeMonth + ' ' + todayTimeDay + ' - ' + todayTimeHours + ':' + todayTimeMinutes.substr(-2)
        }
        console.log(this.formattedTodayTime)
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
    align-items: flex-start;
    width: 20%;
    margin-left: 1rem;
    border-left: 1px solid #fff;

    .mdl-tabs--today {
      display: flex;
      flex-direction: column;
      height: auto;
      width: 100%;
      border-bottom: none;
      margin-left: -1px;

      .mdl-tabs__tab {
        width: 100%;
        color: #fff;
        font-size: 14px;
        font-weight: 800;
        padding: 0;
        border: 1px solid #fff;
        border-left: none;
        border-bottom: none;
        transition: all 0.15s cubic-bezier(.4,0,1,1);
        cursor: pointer;

        &:last-of-type {
          border-bottom: 1px solid #fff;
        }

        &::after {
          height: 0%;
          width: 2px;
          display: block;
          content: " ";
          bottom: 50%;
          left: 0;
          position: absolute;
          background: rgb(0,188,212);
          transition: all 0.15s cubic-bezier(.4,0,1,1);
        }

        &--active {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.25);

          &::after {
            height: 100%;
            width: 2px;
            display: block;
            content: " ";
            bottom: 0;
            left: 0;
            position: absolute;
            background: rgb(0,188,212);
          }
        }
      }

    }
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
      height: auto;
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

      &__supporting-text {
        display: flex;
        align-items: center;
        min-height: 50px;

        p {
          width: 20%;
          text-align: center;
          padding-right: 12px;
          margin-right: 12px;
          margin-bottom: 0;
          border-right: 1px solid rgb(152, 152, 152);

          &:last-of-type {
            border-right: none;
          }
        }
      }
    }
  }
}

.change-enter-active,
.change-leave-active {
  transition-duration: 10.25s;
  transition-property: all;
  transition-timing-function: ease-in;
}

.change-enter-active {
  transition-delay: 5s;
}

.change-enter-from,
.change-enter,
.change-leave-active {
  display: none;
  opacity: 0;
  transform: none;
}
</style>
