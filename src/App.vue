<template>
  <v-app light>
    <main>
      <v-layout column align-center>
        <transition name="fade-transition">
          <router-view></router-view>
        </transition>
      </v-layout>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  }
}

</script>

<style lang="stylus">
  @import './stylus/main'
</style>

<style>
.full-screen {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.centered-progress {
  position: absolute; /* or absolute */
  top: calc(50% - 125px);
  left: calc(50% - 125px);
}

</style>