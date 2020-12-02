<script>
import { fetchListCategory } from '@/api/category'
import { fetchListWallet } from '@/api/wallet'
import { createTransaction } from '@/api/transaction'

export default {
  data() {
    return {
      formData: {
        amount: 0,
        description: null,
        date: undefined,
        category: undefined,
        wallet: undefined
      },
      categoryData: [],
      walletData: []
    }
  },
  methods: {
    getListCategory() {
      fetchListCategory().then(res => {
        this.categoryData = res.data
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
