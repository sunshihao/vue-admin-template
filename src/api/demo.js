
import request from '@/utils/request'

/**
 * 
 * */
export function getList(params) {
  return request({
    url: '/v1/dict/list',
    method: 'get',
    params
  })
}
