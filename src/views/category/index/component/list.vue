<template>
  <div
    v-if="total > 0"
    id="contentScroll"
    class="content"
  >
    <el-row v-for="(category, index) in category_list" :key="index" class="content__item">
      <el-col :xs="24">
        <el-col :xs="24" class="content__category_name">{{ category.name }}</el-col>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <no-data/>
  </div>
</template>

<script>
import NoData from '@/components/NoData'
import listCategory from '../mixins/listCategory'

export default {
  components: {
    NoData
  },
  mixins: [listCategory],
  props: {
    categoryType: {
      type: String,
      default: 'khoan_chi'
    }
  },
  created() {
    this.getListCategory({ type: this.categoryType })
  }
}
</script>
