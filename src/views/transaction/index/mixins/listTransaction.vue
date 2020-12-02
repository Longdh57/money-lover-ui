<script>
import { fetchListTransaction } from '@/api/transaction'
export default {
  data() {
    return {
      total: 0,
      transaction_list: null,
      filterSearch: {
        wallet_id: 1
      }
    }
  },
  methods: {
    getList() {
      fetchListTransaction(this.filterSearch).then(response => {
        this.transaction_list = response.data
        this.total = response.metadata.total_items
      })
    },
    convertNumber(number) {
      return number.toLocaleString()
    },
    convertOperator(type) {
      if (type === 'khoan_chi') {
        return '-'
      } else if (type === 'khoan_thu') {
        return '+'
      } else {
        return ''
      }
    }
  }
}
</script>
