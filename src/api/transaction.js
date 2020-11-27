import request from '@/utils/request'

export function fetchListTransaction() {
  return request({
    url: '/transaction',
    method: 'get'
  })
}

export function createTransaction(data) {
  return request({
    url: '/transaction',
    method: 'post',
    data
  })
}

