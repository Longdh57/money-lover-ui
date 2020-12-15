import request from '@/utils/request'

export function fetchListCategory(query) {
  return request({
    url: '/category',
    method: 'get',
    params: query
  })
}

export function fetchCategoryDetail(categoryId) {
  return request({
    url: `/category/${categoryId}/`,
    method: 'get'
  })
}

