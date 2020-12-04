<script>
import { fetchListCategory } from '@/api/category'
import { fetchListWallet } from '@/api/wallet'
import { createTransaction } from '@/api/transaction'

export default {
  data() {
    return {
      formData: {
        amount: undefined,
        description: null,
        date: undefined,
        category: undefined,
        wallet: undefined
      },
      listQueryCategory: {
        type: 'khoan_chi'
      },
      categoryData: [],
      walletData: [],
      categoryObj: {
        notLoading: true
      }
    }
  },
  methods: {
    getListCategory() {
      this.categoryObj.notLoading = false
      fetchListCategory(this.listQueryCategory).then(res => {
        this.categoryData = res.data
        this.categoryObj.notLoading = true
      })
    },
    getListWallet() {
      fetchListWallet().then(res => {
        this.walletData = res.data
      })
    },
    handleCreateTransaction() {
      this.$refs['createTransactionForm'].validate((valid) => {
        if (valid) {
          const createTransactionBody = {
            amount: this.formData.amount,
            description: this.formData.description,
            date_tran: this.formData.date,
            category_id: this.formData.category.id,
            wallet_id: this.formData.wallet.id
          }
          createTransaction(createTransactionBody).then(response => {
            this.$router.push({ path: '/' })
            this.$notify({
              title: 'Thành công',
              message: 'Tạo giao dịch thành công',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
