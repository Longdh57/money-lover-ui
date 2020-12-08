<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Khoản chi" name="khoan_chi">
      <list :category-type="activeName"/>
    </el-tab-pane>
    <el-tab-pane label="Khoản thu" name="khoan_thu">
      <list :category-type="activeName"/>
    </el-tab-pane>
    <el-tab-pane label="Cho vay/Đi vay" name="cho_vay_di_vay">
      <list :category-type="activeName"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import List from '../component/list'

export default {
  name: 'Mobile',
  components: {
    List
  },
  data() {
    return {
      activeName: 'khoan_chi'
    }
  }
}
</script>
