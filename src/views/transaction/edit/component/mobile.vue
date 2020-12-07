<template>
  <transaction
    header-name="Sửa giao dịch"
    :form-data.sync="formData"
    :category-info="categoryInfo"
    :wallet-info="walletInfo"
    :transaction-id="transactionId"
  />
</template>

<script>
import Transaction from '../../component/transaction'
import { fetchTransactionDetail } from '@/api/transaction'

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
      categoryInfo: null,
      walletInfo: null,
      transactionId: this.$route.params.id
    }
  },
  created() {
    this.getTransactionDetail(this.$route.params.id)
  },
  methods: {
    getTransactionDetail(transactionId) {
      fetchTransactionDetail(transactionId).then(res => {
        this.transactionDetail = res.data
        this.formData.amount = this.transactionDetail.amount
        this.formData.description = this.transactionDetail.description
        this.convertStringToDate(this.transactionDetail.date_tran)
        this.formData.category = this.transactionDetail.category
        this.categoryInfo = this.transactionDetail.category.name
        this.formData.wallet = this.transactionDetail.wallet
        this.walletInfo = this.transactionDetail.wallet.name
      })
    },
    convertStringToDate(stringDate) {
      var repDate = new Date(stringDate)
      this.formData.date = repDate.getDate() + '/' + (repDate.getMonth() + 1) + '/' + repDate.getFullYear()
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
