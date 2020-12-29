<template>
  <div>
    <div>
      <el-row>
        <el-col :md="8" :sm="12" :xs="24">
          <el-input
            v-model="walletInfo"
            placeholder="--- Chọn ví ---"
            filterable
            clearable
            class="filter-item full-width"
            @focus="handleSearchWallet"
          />
        </el-col>
      </el-row>
    </div>
    <div v-if="loadedTotalAmount">
      <el-row style="margin-top: 12px">
        <el-col :xs="8" @click.native="filterTransaction('khoan_thu')">
          <el-col
            :xs="24"
            class="content_transaction__total content_transaction__success"
          >
            <p class="content_transaction__item">
              <strong v-if="walletType !== 'the_tin_dung'">Thu</strong>
              <strong v-else>Trả nợ thẻ</strong>
            </p>
            <p class="content_transaction__item">{{ convertTotalNumber(total_transaction.khoan_thu) }}K</p>
          </el-col>
        </el-col>
        <el-col :xs="8" @click.native="filterTransaction('khoan_chi')">
          <el-col
            :xs="24"
            class="content_transaction__total content_transaction__danger"
          >
            <p class="content_transaction__item">
              <strong>Chi</strong>
            </p>
            <p class="content_transaction__item">- {{ convertTotalNumber(total_transaction.khoan_chi) }}K</p>
          </el-col>
        </el-col>
        <el-col :xs="8">
          <el-col :xs="24" class="content_transaction__total content_transaction__warning">
            <p class="content_transaction__item">
              <strong v-if="walletType !== 'the_tin_dung'">Còn</strong>
              <strong v-else>Dư nợ</strong>
            </p>
            <p class="content_transaction__item">
              = {{ convertTotalTransactionRemain(total_transaction.khoan_thu, total_transaction.khoan_chi) }}K
            </p>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div
      v-if="total > 0"
      id="contentScroll"
      class="content"
    >
      <el-row v-for="(transaction, index) in transaction_list" :key="index" class="content__item">
        <el-col :xs="4">
          <el-col :xs="24" class="content__date">
            <span v-html="convertDateFromString(transaction.date_tran)" />
          </el-col>
          <el-col :xs="24" class="content__month">
            <span v-html="convertMonthFromString(transaction.date_tran)" />
          </el-col>
        </el-col>
        <el-col :xs="20">
          <el-col :xs="12" class="content__amount">
            <span v-html="convertOperator(transaction.category_type)" /><span v-html="convertNumber(transaction.amount)" />
          </el-col>
          <el-col :xs="24" class="content__category_name">
            <el-tag :type="convertTypeColor(transaction.category_type)">{{ transaction.category_name }}</el-tag>
            {{ transaction.description }}
          </el-col>
        </el-col>
        <a href="javascript:void(0)" class="content__link" @click="handleTransactionDetail(transaction.id)">
          <i class="el-icon-arrow-right" />
        </a>
      </el-row>
    </div>
    <div v-else>
      <no-data />
    </div>
    <el-tooltip content="Thêm giao dịch">
      <create-transaction transition-name="fade" />
    </el-tooltip>
    <el-dialog
      title="Chọn Ví"
      :visible.sync="listWalletDialogVisible"
      width="95%"
    >
      <el-row v-for="wallet in walletData" :key="wallet.id" style="margin-bottom: 10px">
        <el-col :span="24">
          <span @click="handleWalletClick(wallet)">{{ wallet.name }}</span>
          <hr style="border: 1px dashed #ddd">
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import listTransaction from '../mixins/listTransaction'
import { fetchListWallet } from '@/api/wallet'
import NoData from '@/components/NoData'
import CreateTransaction from '@/components/CreateTransaction'

export default {
  name: 'Mobile',
  components: {
    CreateTransaction,
    NoData
  },
  mixins: [listTransaction],
  data() {
    return {
      listWalletDialogVisible: false,
      walletInfo: null,
      walletType: null,
      usingFilterTransaction: false
    }
  },
  created() {
    this.getListWallet()
    this.getListTransaction()
    this.getTransactionTotalAmount()
  },
  methods: {
    handleSearchWallet() {
      this.listWalletDialogVisible = true
    },
    getListWallet() {
      fetchListWallet().then(res => {
        this.walletData = res.data
        this.walletInfo = this.walletData[0].name
        this.walletType = this.walletData[0].type
      })
    },
    handleWalletClick(wallet) {
      this.filterSearch.wallet_id = wallet.id
      this.walletInfo = wallet.name
      this.walletType = wallet.type
      this.listWalletDialogVisible = false
      this.getListTransaction()
      this.getTransactionTotalAmount()
    },
    handleTransactionDetail(transactionId) {
      this.$router.push({ path: `/edit/${transactionId}/` })
    },
    filterTransaction(transactionType) {
      if (this.usingFilterTransaction) {
        this.transaction_list = this.transactionListData
        this.usingFilterTransaction = false
      } else {
        this.usingFilterTransaction = true
        const filteredTransactionData = []
        this.transactionListData.forEach(function myFunction(item, index) {
          if (item.category_type === transactionType) {
            filteredTransactionData.push(item)
          }
        })
        this.transaction_list = filteredTransactionData
      }
    }
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
        text-align: center;
        font-size: 32px;
      }
      &__month{
        text-align: center;
        font-size: 12px;
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

    .content_transaction {
      &__item {
        margin: 12px 0;
      }
      &__total {
        border-style: dashed;
        border-radius: 2px;
        text-align: center;
        padding: 0 12px;
      }
      &__success {
        border: $--color-success 1px solid;
        background-color: #E0FBD9;
      }
      &__danger {
        border: $--color-danger 1px solid;
        background-color: #fbd9d9;
      }
      &__warning {
        border: $--color-warning 1px solid;
        background-color: #f1e7a6;
      }
    }
  }
</style>
