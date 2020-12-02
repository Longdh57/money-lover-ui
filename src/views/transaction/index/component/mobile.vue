<template>
  <div>
    <div
      v-if="total > 0"
      id="contentScroll"
      class="content"
    >
      <el-row v-for="(transaction, index) in transaction_list" :key="index" class="content__item">
        <el-col :xs="12" class="content__amount">
          <span v-html="convertOperator(transaction.category_type)" /><span v-html="convertNumber(transaction.amount)" />
        </el-col>
        <el-col :xs="12" class="content__date">{{ transaction.date_tran }}</el-col>
        <el-col :xs="24" class="content__description">{{ transaction.description }}</el-col>
        <el-col :xs="24" class="content__category_name">{{ transaction.category_name }}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import listTransaction from '../mixins/listTransaction'
export default {
  name: 'Mobile',
  mixins: [listTransaction],
  created() {
    this.getList()
  }
}
</script>

<style lang="scss">
  @import '@/styles/element-variables.scss';

  @media (max-width: 460px) {

    .total {
      font-size: 15px;
      font-weight: 600;
      color: $--color-primary;
    }

    .merchant-mobile {
      & .el-collapse-item__header {
        color: $--color-primary !important;
        font-size: 14px;
        font-weight: 600;
      }
    }

    .content {
      position: relative;
      &__item {
        border-bottom: 2px dashed #909399;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
      &__amount {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 18px;
        color: $--color-primary;
      }
      &__date{
        text-align: right;
        font-size: 14px;
      }
      &__description {
        font-size: 14px;
        line-height: 20px;
        word-break: break-word;
        margin-bottom: 5px;
        width: 90%;
      }
      &__category_name {
        font-size: 14px;
        line-height: 20px;
        word-break: break-word;
        width: 90%;
      }
      &__link {
        position: absolute;
        right: 0;
        width: 40px;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
</style>
