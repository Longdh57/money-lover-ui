<script>
import { fetchListCategory } from '@/api/category'
import { fetchListWallet } from '@/api/wallet'

export default {
  data() {
    return {
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
    }
  }
}
</script>
