<template>
  <div class="report">
    <el-card class="box-card" style="width:100%">
      <div class="clearfix">
        <h4 class="report__header">Thêm giao dịch</h4>
      </div>
      <el-form ref="createTransactionForm" :model="formData" :rules="rules" label-position="top">
        <el-row :gutter="20">
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item
              :label="formData.amount?'Giá trị giao dịch':''"
              prop="amount"
              class="report__input--mobile js-handle-input"
            >
              <el-input
                v-model="formData.amount"
                type="number"
                min="0"
                placeholder="Giá trị giao dịch"
              />
            </el-form-item>

            <el-form-item
              :label="formData.category?'Danh mục':''"
              prop="category"
              class="report__input--mobile js-handle-input"
            >
              <el-input
                v-model="categoryInfo"
                placeholder="--- Chọn Danh mục ---"
                filterable
                clearable
                class="filter-item full-width"
                @focus="handleSearchCategory"
                @clear="clearSearchCategory"
              />
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
              class="report__input--mobile js-handle-input"
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
                placeholder="--- Chọn Ví ---"
                filterable
                clearable
                class="filter-item full-width"
                @focus="handleSearchWallet"
                @clear="clearSearchWallet"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button
              v-waves
              class="full-width"
              style="width: 100% !important;"
              type="primary"
              icon="el-icon-edit-outline"
              @click="handleCreateTransaction"
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
    >
      <el-tabs v-model="activeTabName" @tab-click="handleClickTab">
        <el-tab-pane label="Chi" name="khoan_chi">
          <div v-if="categoryObj.notLoading">
            <el-row v-for="category in categoryData" :key="category.id" style="margin-bottom: 10px">
              <el-col :span="24">
                <span @click="handleCategoryClick(category)">{{ category.name }}</span>
                <hr style="border: 1px dashed #ddd">
              </el-col>
            </el-row>
          </div>
          <div v-else>
            Loading...
          </div>
        </el-tab-pane>
        <el-tab-pane label="Thu" name="khoan_thu">
          <div v-if="categoryObj.notLoading">
            <el-row v-for="category in categoryData" :key="category.id" style="margin-bottom: 10px">
              <el-col v-if="categoryObj.notLoading" :span="24">
                <span @click="handleCategoryClick(category)">{{ category.name }}</span>
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
              <el-col v-if="categoryObj.notLoading" :span="24">
                <span @click="handleCategoryClick(category)">{{ category.name }}</span>
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
import createTransaction from '../mixins/createTransaction'
import waves from '@/directive/waves'

export default {
  name: 'Mobile',
  directives: { waves },
  mixins: [createTransaction],
  data() {
    return {
      rules: {
        amount: [
          { required: true, message: 'Giá trị giao dịch không được bỏ trống', trigger: 'change' }
        ],
        date: [
          { required: true, message: 'Ngày giao dịch không được bỏ trống', trigger: 'change' }
        ]
      },
      categoryInfo: null,
      listCategoryDialogVisible: false,
      walletInfo: null,
      listWalletDialogVisible: false,
      activeTabName: 'khoan_chi'
    }
  },
  created() {
    this.getListCategory()
    this.getListWallet()
    this.getDateTodayWithFormat()
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
    clearSearchCategory() {
      this.formData.category = undefined
    },
    handleWalletClick(wallet) {
      this.formData.wallet = wallet
      this.walletInfo = wallet.name
      this.listWalletDialogVisible = false
    },
    handleSearchWallet() {
      this.listWalletDialogVisible = true
    },
    clearSearchWallet() {
      this.formData.wallet = undefined
    },
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
