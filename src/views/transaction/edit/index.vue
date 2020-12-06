<template>
  <div v-if="device === 'mobile'">
    <mobile />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobile from './component/mobile'

export default {
  components: {
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
