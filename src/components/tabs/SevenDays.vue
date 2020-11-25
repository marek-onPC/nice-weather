<template>
  <div>
    <div class="loading-screen" v-if="weatherData === ''">
      <div class="mdl-spinner mdl-js-spinner is-active"></div>
    </div>
    <main class="weather-week__outer" v-if="weatherData !== ''">
      <div class="weather-week__title">
        <h2>{{ city[0] }}</h2>
        <p>Lat: {{ city[1] }}</p>
        <p>Lon: {{ city[2] }}</p>
      </div>
      <div class="weather-week__inner">
        <div class="weather-week__cards">
          <section class="mdl-card-week-card-square" v-for="(day, index) in weatherData.daily" :key="index">
            <div class="mdl-card mdl-shadow--2dp">
              <div class="mdl-card__title mdl-card--expand" :style="{ backgroundImage: 'url(' + require('@/assets/images/' + day.weather[0].icon + '.jpg') + ')' }">
              </div>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 1">
                    <p class="--date"><strong>{{ formattedTodayTime[index] }}</strong></p>
                    <p class="--description"><strong>{{ day.weather.description }}</strong></p>
                    <div class="mdl-card__content">
                      <h5><strong>Temp:</strong></h5>
                      <div class="mdl-card__content-text"><small>morning: </small><strong>{{ day.temp.morn }} °C</strong></div>
                      <div class="mdl-card__content-text"><small>day: </small><strong>{{ day.temp.day }} °C</strong></div>
                      <div class="mdl-card__content-text"><small>evening: </small><strong>{{ day.temp.eve }} °C</strong></div>
                      <div class="mdl-card__content-text"><small>night: </small><strong>{{ day.temp.night }} °C</strong></div>
                    </div>
                    <div class="mdl-card__content">
                      <h5><strong>Feels like:</strong></h5>
                      <div class="mdl-card__content-text"><small>morning: </small><strong>{{ day.feels_like.morn }} °C</strong></div>
                      <div class="mdl-card__content-text"><small>day: </small><strong>{{ day.feels_like.day }} °C</strong></div>
                      <div class="mdl-card__content-text"><small>evening: </small><strong>{{ day.feels_like.eve }} °C</strong></div>
                      <div class="mdl-card__content-text"><small>night: </small><strong>{{ day.feels_like.night }} °C</strong></div>
                    </div>
                </div>
                </transition>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text" v-if="activeOption == 2">
                    <p><strong>{{ formattedTodayTime[index] }}</strong></p>
                    <p>Pressure: <br><strong>{{ day.pressure }} hPa</strong></p>
                    <p>Humidity: <br><strong>{{ day.humidity }} %</strong></p>
                    <p>Wind: <br><strong>{{ day.wind_speed }} m/s</strong></p>
                </div>
                </transition>
                <transition name="change" mode="out-in">
                <div class="mdl-card__supporting-text --rain" v-if="activeOption == 3">
                    <p><strong>{{ formattedTodayTime[index] }}</strong></p>
                    <p>Clouds: <br><strong>{{ day.clouds }} %</strong></p>
                    <p v-for="(rain, index) in day.rain" :key="index">Rain: <br><strong>{{ rain }} mm</strong></p>
                    <p v-for="(snow, index) in day.snow" :key="index">Snow: <br><strong>{{ snow }} mm</strong></p>
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
        <div class="weather-week__settings">
          <nav class="mdl-tabs__tab-bar mdl-tabs--week">
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
      return axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.city[1] + '&lon=' + this.city[2] + '&exclude=current,minutely,hourly&units=metric&appid=' + this.city[3])
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
          this.weatherData.daily = this.weatherData.daily.slice(0, 24)
          for (let i = 0; i < 24; i++) {
            var weekTime = new Date(data.daily[i].dt * 1000 + data.timezone_offset * 1000)
            var weekTimeMonth = weekTime.getMonth()
            switch (weekTimeMonth) {
              case 0:
                weekTimeMonth = 'January'
                break
              case 1:
                weekTimeMonth = 'February'
                break
              case 2:
                weekTimeMonth = 'March'
                break
              case 3:
                weekTimeMonth = 'April'
                break
              case 4:
                weekTimeMonth = 'May'
                break
              case 5:
                weekTimeMonth = 'June'
                break
              case 6:
                weekTimeMonth = 'July'
                break
              case 7:
                weekTimeMonth = 'August'
                break
              case 8:
                weekTimeMonth = 'September'
                break
              case 9:
                weekTimeMonth = 'October'
                break
              case 10:
                weekTimeMonth = 'November'
                break
              case 11:
                weekTimeMonth = 'December'
                break
            }
            var weekTimeDay = weekTime.getDate()
            this.formattedTodayTime[i] = weekTimeMonth + ' ' + weekTimeDay
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

.weather-week {
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

    .mdl-tabs--week {
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
      max-height: none;
      margin-bottom: 20px;

      @media (min-width: 992px) {
        min-height: 50px;
        flex-direction: row;
      }

      &-week-card-square {
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
        flex-wrap: wrap;
        align-items: center;
        min-height: 82px;
        max-height: none;
        width: auto;
        padding: 12px 0px;

        @media (min-width: 992px) {
         min-width: 75%;
         padding: 16px;
        }

        &.--rain {
          p {
            width: 33%;
          }
        }

        p, .mdl-card__content {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          // height: 100%;
          width: 50%;
          text-align: center;
          font-size: 12px;
          line-height: 16px;
          padding: 0 12px;
          margin-bottom: 0;
          border-right: 1px solid rgb(152, 152, 152);

          @media (min-width: 768px) {
            font-size: 14px;
            line-height: 24px;
          }

          &.--date, &.--description {
            width: 100%;
          }

          &:last-of-type {
            border-right: none;
          }
        }
      }

      &__content-text {
        display: flex;
        justify-content: space-between;
        max-width: 125px;
        width: 100%;
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
