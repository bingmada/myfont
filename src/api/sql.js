import request from '@/utils/request'

// export function getExportStatusApi (filename) {
//   return request({
//     url: '/api/export/info',
//     params: {
//       filename
//     }
//   })
// }

export function getFieldApi () {
  return request({
    url: '/api/field/info'
  })
}

export function setFieldApi (data) {
  return request({
    url: '/api/field/info',
    method: 'put',
    data: data
  })
}
export function getFieldTableApi () {
  return request({
    url: '/api/field/table'
  })
}

export function getIndexTableApi (searchContent, selectCountry) {
  return request({
    url: '/api/index/table',
    params: {
      searchContent,
      selectCountry
    }
  })
}

export function setIndexTableApi (data) {
  return request({
    url: '/api/index/table',
    method: 'put',
    data: data
  })
}

export function getSourceTypeApi () {
  return request({
    url: '/api/source/type'
  })
}

export function getAllCountryApi () {
  return request({
    url: '/api/all/country'
  })
}

export function getFieldIndexApi (index) {
  return request({
    url: '/api/all/field/index',
    params: { index }
  })
}
