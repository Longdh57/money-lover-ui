<template>
  <transaction
    header-name="Thêm giao dịch"
    :form-data.sync="formData"
    :transaction-id="transactionId"
  />
</template>

<script>
import Transaction from '../../component/transaction'

export default {
  name: 'Mobile',
  components: {
    Transaction
  },
  data() {
    return {
      formData: {
        amount: undefined,
        description: null,
        date: undefined,
        category: undefined,
        wallet: undefined
      },
      transactionId: 0
    }
  },
  created() {
    this.getDateTodayWithFormat()
  },
  methods: {
    getDateTodayWithFormat() {
      var today = new Date()
      this.formData.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
    }
  }
}
</script>

<style lang="scss">
@media (max-width: 460px) {
  .report {
    &__form-btn {
      margin-bottom: 15px;
      margin-right: 15px;
    }

    .el-input,
    .el-select,
    .el-textarea {
      width: 100%;

      &__inner {
        border: none !important;
        border-bottom: 1px solid #eeeeee !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        padding-left: 5px !important;
      }
    }

    & .el-form-item.is-error {
      & .el-input__inner {
        border-bottom: 1px solid #ff4949 !important;
      }
    }

    &__input {
      &--mobile {
        position: relative;
        margin-bottom: 38px;

        & label {
          position: absolute;
          top: -25px;
        }
      }
    }

    &__sub-header {
      font-weight: bold;
      border-bottom: 1px solid #ebebeb;
      padding-bottom: 10px;
      text-transform: uppercase;
    }

    &__btn-group {
      text-align: center;
      margin-top: 30px;
    }

    &__merchant-step {
      margin-top: 0;
      font-size: 13px;
      line-height: 24px;
    }

    &__additional {
      display: block;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 15px;
    }

    &__preview {
      display: none;
      margin-top: 15px;
      width: 220px;
      border: 1px solid #ebebeb;
      border-radius: 6px;
    }
  }
}
</style>
