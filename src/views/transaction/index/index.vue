<template>
  <div class="app-container" :style=" device === 'desktop' ? '' : 'background-color: #f5f5f5 !important; min-height: 100vh; width:100%;' ">
    <div v-if="device === 'desktop'">
      <desktop />
    </div>
    <div v-else>
      <mobile />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import desktop from './component/desktop'
import mobile from './component/mobile'

export default {
  components: {
    desktop,
    mobile
  },
  computed: {
    ...mapGetters([
      'device'
    ])
  }
}
</script>

<style scoped>

</style>
