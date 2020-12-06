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

export function fetchTransactionDetail(transactionId) {
  return request({
    url: `/transaction/${transactionId}/`,
    method: 'get'
  })
}

export function updateTransaction(transactionId, data) {
  return request({
    url: `/transaction/${transactionId}/`,
    method: 'put',
    data
  })
}
