import request from '@/utils/request'

export function fetchListCategory() {
  return request({
    url: '/category',
    method: 'get'
  })
}

