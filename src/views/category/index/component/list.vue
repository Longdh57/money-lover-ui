<template>
  <div
    v-if="total > 0"
    id="contentScroll"
    class="content"
  >
    <el-row v-for="(category, index) in categoryList" :key="index">
      <el-col v-if="category.type === categoryType" :xs="24" class="content_category_list__item">
        <el-col :xs="2" class="content_category_list__icon">
          <svg-icon :icon-class="generateCategoryIcon(category.icon)" class-name="content_category_list__icon_item" />
        </el-col>
        <el-col v-if="categoryType === 'khoan_chi'" :xs="12" class="content_category_list__name">
          {{ category.name }}
        </el-col>
        <el-col v-if="categoryType === 'khoan_chi'" :xs="8" class="content_category_list__quota">
          <el-tag :type="generateTagColor(category.total_amount, category.quota)">
            {{ convertNumber(category.total_amount) }} / {{ convertNumber(category.quota) }}
          </el-tag>
        </el-col>
        <el-col v-if="categoryType !== 'khoan_chi'" :xs="12" class="content_category_list__name">
          {{ category.name }}
        </el-col>
        <el-col v-if="categoryType !== 'khoan_chi'" :xs="8" class="content_category_list__quota">
          <el-tag type="success">{{ convertNumber(category.total_amount) }}</el-tag>
        </el-col>
      </el-col>
      <a
        v-if="category.type === categoryType"
        href="javascript:void(0)"
        class="content_category_list__link"
        @click="handleCategoryDetail(category.id)"
      >
        <i class="el-icon-arrow-right" />
      </a>
    </el-row>
  </div>
  <div v-else>
    <no-data />
  </div>
</template>

<script>
import NoData from '@/components/NoData'

export default {
  components: {
    NoData
  },
  props: {
    categoryType: {
      type: String,
      default: 'khoan_chi'
    },
    categoryList: {
      type: Array,
      default: null
    },
    total: {
      type: Number,
      default: 10
    }
  },
  methods: {
    convertNumber(number) {
      number = ~~(number / 1000)
      return number.toLocaleString() + 'K'
    },
    generateTagColor(total_amount, quota) {
      if (total_amount < quota * 0.75) {
        return 'success'
      } else if (quota * 0.75 <= total_amount && total_amount < quota) {
        return 'warning'
      } else {
        return 'danger'
      }
    },
    handleCategoryDetail(categoryId) {
      this.$router.push({ path: `/detail/${categoryId}/` })
    },
    generateCategoryIcon(categoryIcon) {
      if (categoryIcon) {
        return 'expense-' + categoryIcon
      } else {
        return 'expense-other'
      }
    }
  }
}
</script>
