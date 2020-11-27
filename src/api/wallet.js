import request from '@/utils/request'

export function fetchListWallet() {
  return request({
    url: '/wallet',
    method: 'get'
  })
}

