import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/file/upload/productImage?prefix=testUpFile',
    method: 'post',
    data
  })
}
