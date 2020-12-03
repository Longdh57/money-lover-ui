import request from '@/utils/request'

export function fetchListCategory(query) {
  return request({
    url: '/category',
    method: 'get',
    params: query
  })
}

