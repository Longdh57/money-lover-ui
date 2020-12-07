<template>
  <transition :name="transitionName">
    <div :style="customStyle" class="back-to-ceiling" @click="redirectCreateTransaction">
      <i class="el-icon-plus" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CreateTransaction',
  props: {
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '50px',
          bottom: '50px',
          width: '60px',
          height: '60px',
          'border-radius': '30px',
          'line-height': '60px',
          background: '#13ce66'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  methods: {
    redirectCreateTransaction() {
      this.$router.push({ path: '/transaction/create' })
    }
  }
}
</script>

<style scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  background: #d5dbe7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
