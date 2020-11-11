<template>
  <div class="mdl-textfield mdl-js-textfield">
    <input class="mdl-textfield__input" type="text" id="sample1" v-model="searchCity" @keyup="searchNameInputed">
    <label class="mdl-textfield__label" for="sample1">City...</label>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'Search',
  data () {
    return {
      searchCity: ''
    }
  },
  methods: {
    searchNameInputed:
      debounce(function () {
        console.log(this.searchCity)
        this.$emit('search-city', this.searchCity)
      }, 500)
  }
}
</script>

<style lang="scss" scoped>
.mdl-textfield {
  max-width: 600px;
  width: 100%;
  height: 73px;
  margin-top: 75px;

  &__input {
    font-weight: 700;
    font-size: 20px;
    color: #fff;
    letter-spacing: 1px;
    border-bottom-color: #fff;

    &:focus {
      border: none;
    }
  }

  &__label {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>
