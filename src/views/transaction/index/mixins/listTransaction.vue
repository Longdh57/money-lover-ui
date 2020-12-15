<script>
import { fetchListTransaction, fetchTransactionTotalAmount } from '@/api/transaction'

export default {
  data() {
    return {
      total: 0,
      areaInfo: null,
      transactionListData: null,
      transaction_list: null,
      filterSearch: {
        wallet_id: 1,
        category_id: undefined
      },
      total_transaction: null,
      walletData: [],
      loadedTotalAmount: false
    }
  },
  methods: {
    getListTransaction() {
      fetchListTransaction(this.filterSearch).then(response => {
        this.transactionListData = response.data
        this.transaction_list = response.data
        this.total = response.metadata.total_items
      })
    },
    getTransactionTotalAmount() {
      fetchTransactionTotalAmount(this.filterSearch).then(response => {
        this.total_transaction = response.data
        this.loadedTotalAmount = true
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
    },
    convertTotalTransactionRemain(khoanThu, khoanChi) {
      if (khoanThu >= khoanChi) {
        return this.convertNumber(khoanThu - khoanChi)
      } else {
        return '- ' + this.convertNumber(khoanChi - khoanThu)
      }
    },
    convertDateFromString(date) {
      var date_tran_data = new Date(date)
      return date_tran_data.getDate()
    },
    convertMonthFromString(date) {
      var date_tran_data = new Date(date)
      return 'Th ' + (date_tran_data.getMonth() + 1)
    },
    convertTypeColor(category_type) {
      if (category_type === 'khoan_chi') {
        return 'danger'
      } else if (category_type === 'khoan_thu') {
        return 'success'
      } else {
        return 'primary'
      }
    }
  }
}
</script>
