import request from '@/utils/request'

export function fetchListTransaction(query) {
  return request({
    url: '/transaction',
    method: 'get',
    params: query
  })
}

export function createTransaction(data) {
  return request({
    url: '/transaction',
    method: 'post',
    data
  })
}

