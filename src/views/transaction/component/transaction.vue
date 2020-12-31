<template>
  <div class="report">
    <el-card class="box-card" style="width:100%">
      <div class="clearfix">
        <h4 class="report__header">{{ headerName }}</h4>
      </div>
      <el-form ref="createTransactionForm" :model="formData" :rules="rules" label-position="top">
        <el-row :gutter="20">
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item
              :label="inputAmount?'Giá trị giao dịch':''"
              prop="inputAmount"
              class="report__input--mobile js-handle-input"
            >
              <el-input
                v-model.lazy="inputAmount"
                v-money="money"
                type="tel"
                min="0"
                placeholder="Giá trị"
                inputmode="numeric"
                pattern="[0-9]*"
              />
            </el-form-item>

            <el-form-item
              :label="formData.category?'Danh mục':''"
              prop="category"
              class="report__input--mobile js-handle-input"
            >
              <el-input
                v-model="categoryInfo"
                placeholder="-- Chọn Danh mục --"
                filterable
                class="filter-item full-width"
                @focus="handleSearchCategory"
              >
                <template slot="prepend"><i class="el-icon-question" /></template>
              </el-input>
            </el-form-item>

            <el-form-item
              :label="formData.description?'Write note':''"
              prop="description"
              class="report__input--mobile js-handle-input"
            >
              <el-input
                v-model="formData.description"
                placeholder="Write note..."
              />
            </el-form-item>

            <el-form-item
              :label="formData.date?'Chọn ngày':''"
              prop="date"
              class="js-handle-input"
            >
              <el-date-picker
                v-model="formData.date"
                type="date"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
                class="filter-item full-width"
              />
            </el-form-item>

            <el-form-item
              :label="formData.wallet?'Chọn Ví':''"
              prop="wallet"
              class="report__input--mobile js-handle-input"
            >
              <el-input
                v-model="walletInfo"
                placeholder="-- Chọn Ví --"
                filterable
                class="filter-item full-width"
                @focus="handleSearchWallet"
              >
                <template slot="prepend"><i class="el-icon-s-finance" /></template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button
              v-waves
              class="full-width"
              style="width: 100% !important; padding: 20px 20px !important;"
              type="primary"
              icon="el-icon-edit-outline"
              @click="transactionId === 0 ? handleCreateTransaction() : handleUpdateTransaction()"
            >
              Lưu
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-dialog
      title="Chọn Danh mục"
      :visible.sync="listCategoryDialogVisible"
      width="95%"
      top="2vh"
    >
      <el-tabs v-model="activeTabName" @tab-click="handleClickTab">
        <el-tab-pane label="Khoản Chi" name="khoan_chi">
          <div v-if="categoryObj.notLoading">
            <el-row v-for="category in categoryData" :key="category.id" style="margin-bottom: 10px">
              <el-col :span="2">
                <svg-icon :icon-class="generateCategoryIcon(category.icon)" />
              </el-col>
              <el-col :span="22">
                <span class="text-select" @click="handleCategoryClick(category)">{{ category.name }}</span>
                <hr style="border: 1px dashed #ddd">
              </el-col>
            </el-row>
          </div>
          <div v-else>
            Loading...
          </div>
        </el-tab-pane>
        <el-tab-pane label="Khoản Thu" name="khoan_thu">
          <div v-if="categoryObj.notLoading">
            <el-row v-for="category in categoryData" :key="category.id" style="margin-bottom: 10px">
              <el-col :span="2">
                <svg-icon :icon-class="generateCategoryIcon(category.icon)" />
              </el-col>
              <el-col :span="22">
                <span class="text-select" @click="handleCategoryClick(category)">{{ category.name }}</span>
                <hr style="border: 1px dashed #ddd">
              </el-col>
            </el-row>
          </div>
          <div v-else>
            Loading...
          </div>
        </el-tab-pane>
        <el-tab-pane label="Cho Vay/Đi vay" name="cho_vay_di_vay">
          <div v-if="categoryObj.notLoading">
            <el-row v-for="category in categoryData" :key="category.id" style="margin-bottom: 10px">
              <el-col :span="2">
                <svg-icon :icon-class="generateCategoryIcon(category.icon)" />
              </el-col>
              <el-col :span="22">
                <span class="text-select" @click="handleCategoryClick(category)">{{ category.name }}</span>
                <hr style="border: 1px dashed #ddd">
              </el-col>
            </el-row>
          </div>
          <div v-else>
            Loading...
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog
      title="Chọn Ví"
      :visible.sync="listWalletDialogVisible"
      width="95%"
      top="2vh"
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
import transaction from '../mixins/transaction'
import waves from '@/directive/waves'
import { updateTransaction } from '@/api/transaction'
import { VMoney } from 'v-money'
import moment from 'moment'

export default {
  directives: { waves, money: VMoney },
  mixins: [transaction],
  props: {
    headerName: undefined,
    formData: {
      type: Object,
      default: null
    },
    categoryInfo: {
      type: String,
      default: null
    },
    walletInfo: {
      type: String,
      default: null
    },
    transactionId: undefined
  },
  data() {
    return {
      rules: {
        inputAmount: [
          { required: true, message: 'Giá trị giao dịch không được bỏ trống', trigger: 'change' }
        ],
        date: [
          { required: true, message: 'Ngày giao dịch không được bỏ trống', trigger: 'change' }
        ]
      },
      listCategoryDialogVisible: false,
      listWalletDialogVisible: false,
      activeTabName: 'khoan_chi',
      money: {
        decimal: ',',
        thousands: '.',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      inputAmount: '0'
    }
  },
  created() {
    this.getListCategory()
    this.getListWallet()
  },
  methods: {
    handleClickTab(tab, event) {
      this.listQueryCategory.type = tab.name
      this.getListCategory()
    },
    handleCategoryClick(category) {
      this.formData.category = category
      this.categoryInfo = category.name
      this.listCategoryDialogVisible = false
    },
    handleSearchCategory() {
      this.listCategoryDialogVisible = true
    },
    handleWalletClick(wallet) {
      this.formData.wallet = wallet
      this.walletInfo = wallet.name
      this.listWalletDialogVisible = false
    },
    handleSearchWallet() {
      this.listWalletDialogVisible = true
    },
    handleCreateTransaction() {
      this.formData.amount = parseFloat(this.formData.amount.replace(/^\W|,/g, ''))
      console.log(this.formData)
      // this.$refs['createTransactionForm'].validate((valid) => {
      //   if (valid) {
      //     const createTransactionBody = {
      //       amount: this.formData.amount,
      //       description: this.formData.description,
      //       date_tran: this.formData.date,
      //       category_id: this.formData.category.id,
      //       wallet_id: this.formData.wallet.id
      //     }
      //     createTransaction(createTransactionBody).then(response => {
      //       this.$router.push({ path: '/' })
      //       this.$notify({
      //         title: 'Thành công',
      //         message: 'Tạo giao dịch thành công',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
    },
    handleUpdateTransaction() {
      this.$refs['createTransactionForm'].validate((valid) => {
        if (valid) {
          const createTransactionBody = {
            amount: this.formData.amount,
            description: this.formData.description,
            date_tran: this.formatDateData(this.formData.date),
            category_id: this.formData.category.id,
            wallet_id: this.formData.wallet.id
          }
          updateTransaction(this.transactionId, createTransactionBody).then(response => {
            this.$router.push({ path: '/' })
            this.$notify({
              title: 'Thành công',
              message: 'Sửa giao dịch thành công',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    formatDateData(dateString) {
      var mydate = moment(dateString, 'DD/MM/YYYY')
      return mydate.year() + '-' + (mydate.month() + 1) + '-' + mydate.date()
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

<style lang="scss">
  @media (max-width: 460px) {
    .text-select {
      font-size: large;
    }
  }
</style>
