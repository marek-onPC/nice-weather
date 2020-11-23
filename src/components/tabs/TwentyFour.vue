<template>
  <div>
    <div class="loading-screen" v-if="weatherData === ''">
      <div class="mdl-spinner mdl-js-spinner is-active"></div>
    </div>
    <main class="weather-today__outer" v-if="weatherData !== ''">
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
                    <p>Temp: <br><strong>{{ hour.temp }} °C</strong></p>
                    <p>Feels like: <br><strong>{{ hour.feels_like }} °C</strong></p>
                </div>
                </transition>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 2">
                    <p><strong><small>{{ formattedTodayTime[index] }}</small></strong></p>
                    <p>Pressure: <br><strong>{{ hour.pressure }} hPa</strong></p>
                    <p>Humidity: <br><strong>{{ hour.humidity }} %</strong></p>
                    <p>Wind: <br><strong>{{ hour.wind_speed }} m/s</strong></p>
                </div>
                </transition>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 3">
                    <p><strong><small>{{ formattedTodayTime[index] }}</small></strong></p>
                    <p>Clouds: <br><strong>{{ hour.clouds }} %</strong></p>
                    <p v-for="(rain, index) in hour.rain" :key="index">Rain: <br><strong>{{ rain }} mm</strong></p>
                    <p v-for="(snow, index) in hour.snow" :key="index">Snow: <br><strong>{{ snow }} mm</strong></p>
                </div>
                </transition>
                <!-- <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 4">
                    <p><strong><small>{{ formattedTodayTime[index] }}</small></strong></p>
                    <p>Clouds: <br><strong>{{ hour.humidity }}</strong></p>
                    <p v-for="(rain, index) in hour.rain" :key="index">Rain: <br><strong>{{ rain }} mm</strong></p>
                    <p v-for="(snow, index) in hour.snow" :key="index">Snow: <br><strong>{{ snow }} mm</strong></p>
                </div>
                </transition> -->
            </div>
          </section>
        </div>
        <div class="weather-today__settings">
          <nav class="mdl-tabs__tab-bar mdl-tabs--today">
            <div class="mdl-tabs__tab" @click="activeOption = 1" :class="{'mdl-tabs__tab--active' : activeOption == 1 }">Temp</div>
            <div class="mdl-tabs__tab" @click="activeOption = 2" :class="{'mdl-tabs__tab--active' : activeOption == 2 }">Air</div>
            <div class="mdl-tabs__tab" @click="activeOption = 3" :class="{'mdl-tabs__tab--active' : activeOption == 3 }"><small>Rain/snow</small></div>
            <!-- <div class="mdl-tabs__tab" @click="activeOption = 4" :class="{'mdl-tabs__tab--active' : activeOption == 4 }">Graphs</div> -->
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
const axios = require('axios').default

export default {
  name: 'TwentyFour',
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
          debounce(function () {
            this.setWeather()
          }, 250)
        })
    },
    setWeather () {
      this.getWeather().then(data => {
        if (data) {
          this.weatherData = data
          this.weatherData.hourly = this.weatherData.hourly.slice(0, 24)
          for (let i = 0; i < 24; i++) {
            var todayTime = new Date(data.hourly[i].dt * 1000 + data.timezone_offset * 1000)
            var todayTimeMonth = todayTime.getMonth()
            switch (todayTimeMonth) {
              case 0:
                todayTimeMonth = 'January'
                break
              case 1:
                todayTimeMonth = 'February'
                break
              case 2:
                todayTimeMonth = 'March'
                break
              case 3:
                todayTimeMonth = 'April'
                break
              case 4:
                todayTimeMonth = 'May'
                break
              case 5:
                todayTimeMonth = 'June'
                break
              case 6:
                todayTimeMonth = 'July'
                break
              case 7:
                todayTimeMonth = 'August'
                break
              case 8:
                todayTimeMonth = 'September'
                break
              case 9:
                todayTimeMonth = 'October'
                break
              case 10:
                todayTimeMonth = 'November'
                break
              case 11:
                todayTimeMonth = 'December'
                break
            }
            var todayTimeDay = todayTime.getDate()
            var todayTimeHours = todayTime.getHours()
            var todayTimeMinutes = '0' + todayTime.getMinutes()
            this.formattedTodayTime[i] = todayTimeMonth + ' ' + todayTimeDay + ' - ' + todayTimeHours + ':' + todayTimeMinutes.substr(-2)
          }
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
.loading-screen {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}

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
    flex-direction: column-reverse;

    @media (min-width: 992px) {
      flex-direction: row;
    }
  }

  &__settings {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #fff;

    @media (min-width: 992px) {
      width: 20%;
      margin-left: 10px;
      border-bottom: none;
      border-left: 1px solid #fff;
    }

    .mdl-tabs--today {
      display: flex;
      flex-direction: row;
      height: auto;
      width: 100%;
      border-bottom: none;

      @media (min-width: 992px) {
        flex-direction: column;
        margin-top: 50px;
        margin-left: -1px;

      }

      .mdl-tabs__tab {
        width: 100%;
        color: #fff;
        font-size: 14px;
        font-weight: 800;
        padding: 0;
        border: 1px solid #fff;
        // border-left: none;
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
    width: 100%;

    @media (min-width: 992px) {
      width: 80%;
    }

    .mdl-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 137px;
      max-height: 137px;
      margin-bottom: 20px;

      @media (min-width: 992px) {
        min-height: 50px;
        flex-direction: row;
      }

      &-today-card-square {
        width: 100%;
      }

      &__title {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        min-width: 25.5%;
        min-height: 80px;

        @media (min-width: 992px) {
          height: auto;
        }
      }

      &__supporting-text {
        display: flex;
        align-items: center;
        min-height: 50px;
        max-height: 82px;
        width: auto;
        padding: 12px 0px;

        @media (min-width: 992px) {
         min-width: 75%;
         padding: 16px;
        }

        p {
          width: 25%;
          text-align: center;
          font-size: 12px;
          line-height: 16px;
          padding: 0 12px;
          // margin: 0 6px;
          margin-bottom: 0;
          border-right: 1px solid rgb(152, 152, 152);

          @media (min-width: 768px) {
            font-size: 14px;
            line-height: 24px;
          }

          &:last-of-type {
            border-right: none;
          }
        }
      }
    }
  }
}

.change-enter-from,
.change-enter {
  opacity: 0;
  transform: none;
}

.change-enter-active {
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: ease-in-out;
}

.change-leave-active {
  display: none!important;
}
</style>
