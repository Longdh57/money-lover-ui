<template>
  <div v-if="device === 'desktop'">
    <desktop />
  </div>
  <div v-else>
    <mobile />
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
