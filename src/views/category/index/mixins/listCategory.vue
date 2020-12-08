<script>
import { fetchListCategory } from '@/api/category'

export default {
  data() {
    return {
      total: 0,
      category_list: null,
      filterSearch: {
        type: 'khoan_chi'
      }
    }
  },
  methods: {
    getListCategory() {
      fetchListCategory(this.filterSearch).then(response => {
        this.category_list = response.data
        this.total = response.metadata.total_items
      })
    }
  }
}
</script>
