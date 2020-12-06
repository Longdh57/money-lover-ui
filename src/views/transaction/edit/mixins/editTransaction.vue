<script>
import { fetchListCategory } from '@/api/category'
import { fetchListWallet } from '@/api/wallet'
import { fetchTransactionDetail } from '@/api/transaction'

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
      },
      transactionDetail: undefined
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
    getTransactionDetail(transactionId) {
      fetchTransactionDetail(transactionId).then(res => {
        this.transactionDetail = res.data
        console.log(this.transactionDetail)
      })
    }
  }
}
</script>
