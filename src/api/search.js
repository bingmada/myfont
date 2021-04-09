import request from '@/utils/request'

export function searchDataApi (data) {
  return request({
    url: '/api/search/info',
    method: 'post',
    data: data
  })
}

export function exportFunctionApi (data) {
  return request({
    url: '/api/export/info',
    method: 'post',
    data: data
  })
}

export function getExportStatusApi (filename) {
  return request({
    url: '/api/export/info',
    params: {
      filename
    }
  })
}

export function getPortraitsApi (data) {
  return request({
    url: '/api/portraits/info',
    method: 'post',
    data: data
  })
}

export function searchDetailApi (data) {
  return request({
    url: '/api/detail/info',
    method: 'post',
    data: data
  })
}

export function downloadDetailApi (data) {
  return request({
    url: '/api/detail/download',
    method: 'post',
    data: data
  })
}
