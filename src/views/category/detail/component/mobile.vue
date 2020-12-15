<template>
  <div>
    <el-container v-if="!loadingCategory">
      <el-main>
        <el-row v-if="categoryInfo.type === 'khoan_chi'" style="margin-bottom: 10px;">
          <el-progress
            :percentage="linearProgressData.percent"
            :color="linearProgressData.colo"
            :format="format"
          />
        </el-row>
        <el-row style="margin-bottom: 10px;">
          <el-col :xs="8">Danh mục:</el-col>
          <el-col :xs="16">
            <b>{{ categoryInfo.name }}</b>
          </el-col>
        </el-row>
        <el-row v-if="categoryInfo.type === 'khoan_chi'" style="margin-bottom: 10px;">
          <el-col :xs="8">Hạn mức:</el-col>
          <el-col :xs="16">
            <b>{{ convertNumber(categoryInfo.quota) }} VNĐ</b>
          </el-col>
        </el-row>
        <el-row v-if="categoryInfo.type === 'khoan_chi'" style="margin-bottom: 10px;">
          <el-col :xs="8">Đã chi:</el-col>
          <el-col :xs="16">
            {{ convertNumber(totalTransactionAmount) }} VNĐ
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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
      </el-row>
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
import listTransaction from '../../../transaction/index/mixins/listTransaction'
import { fetchListWallet } from '@/api/wallet'
import { fetchCategoryDetail } from '@/api/category'
import CreateTransaction from '@/components/CreateTransaction'
import { fetchListTransaction } from '@/api/transaction'

export default {
  name: 'Mobile',
  components: {
    CreateTransaction
  },
  mixins: [listTransaction],
  data() {
    return {
      listWalletDialogVisible: false,
      walletInfo: null,
      categoryInfo: undefined,
      loadingCategory: true,
      totalTransactionAmount: 0,
      linearProgressData: {
        percent: 0,
        colo: '#da6743',
        numberData: 0
      }
    }
  },
  updated() {
    if (this.totalTransactionAmount !== 0 && this.categoryInfo !== undefined) {
      const percentData = Math.ceil(this.totalTransactionAmount / this.categoryInfo.quota * 100)
      this.linearProgressData.percent = percentData < 100 ? percentData : 100
      if (percentData < 75) {
        this.linearProgressData.colo = '#13ce66'
      } else if (percentData >= 75 && percentData < 100) {
        this.linearProgressData.colo = '#ffba00'
      } else {
        this.linearProgressData.colo = '#ff4949'
      }
      this.linearProgressData.numberData = percentData
    }
  },
  created() {
    this.getListWallet()
    this.getCategoryDetail()
    this.getListTransactionByCategorryId()
  },
  methods: {
    format() {
      return this.linearProgressData.numberData + '%'
    },
    handleSearchWallet() {
      this.listWalletDialogVisible = true
    },
    getListWallet() {
      fetchListWallet().then(res => {
        this.walletData = res.data
        this.walletInfo = this.walletData[0].name
      })
    },
    getCategoryDetail() {
      fetchCategoryDetail(this.$route.params.id).then(res => {
        this.categoryInfo = res.data
        this.loadingCategory = false
      })
    },
    getListTransactionByCategorryId() {
      this.filterSearch.category_id = this.$route.params.id
      fetchListTransaction(this.filterSearch).then(response => {
        this.transactionListData = response.data
        this.transaction_list = response.data
        this.total = response.metadata.total_items
        let totalAmount = 0
        this.transactionListData.forEach(function myFunction(item, index) {
          totalAmount += item.amount
        })
        this.totalTransactionAmount = totalAmount
      })
    },
    handleWalletClick(wallet) {
      this.filterSearch.wallet_id = wallet.id
      this.walletInfo = wallet.name
      this.listWalletDialogVisible = false
      this.getListTransaction()
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/element-variables.scss';
  @media (max-width: 460px) {
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
  }
</style>
