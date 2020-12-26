<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Khoản chi" name="khoan_chi">
      <list :category-type="activeName" :category-list="category_list" />
    </el-tab-pane>
    <el-tab-pane label="Khoản thu" name="khoan_thu">
      <list :category-type="activeName" :category-list="category_list" />
    </el-tab-pane>
    <el-tab-pane label="Cho vay/Đi vay" name="cho_vay_di_vay">
      <list :category-type="activeName" :category-list="category_list" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import List from '../component/list'
import listCategory from '@/views/category/index/mixins/listCategory'

export default {
  name: 'Mobile',
  components: {
    List
  },
  mixins: [listCategory],
  data() {
    return {
      activeName: 'khoan_chi'
    }
  },
  created() {
    this.getListCategory()
  }
}
</script>

<style lang="scss">
@import '@/styles/element-variables.scss';

@media (max-width: 460px) {
  .content_category_list {
    position: relative;
    &__item {
      border-bottom: 1px dashed #909399;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
    &__name {
      font-size: 14px;
      word-break: break-word;
    }
    &__quota {
      font-size: 10px;
      text-align: right;
      word-break: break-word;
      margin-top: -8px;
    }
    &__link {
      position: absolute;
      right: 0;
      width: 40px;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: -10px;
    }
    &__icon {
      left: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-top: -10px;
      margin-right: 8px;
    }
    &__icon_item {
      width: 2em !important;
      height: 2em !important;
    }
  }
}
</style>
