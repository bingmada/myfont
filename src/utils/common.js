/** 字段中文名称转换表 */
export const fieldNameDict = {
  phoneNumber: '手机号码',
  phoneCode: '手机区号',
  phoneImsi: '手机IMSI号',
  cardId: '证件号',
  registerTime: '注册时间',
  version: '版本',
  full_username: '名称',
  username: '姓名',
  email: '邮箱',
  birthday: '生日',
  sex: '性别',
  nickname: '昵称'
}

export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

export const pickerOptions1 = {
  disabledDate (time) {
    return time.getTime() < Date.now()
  },
  shortcuts: [{
    text: '一个月',
    onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
      picker.$emit('pick', date)
    }
  }, {
    text: '两个月',
    onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 60)
      picker.$emit('pick', date)
    }
  }, {
    text: '半年',
    onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 180)
      picker.$emit('pick', date)
    }
  }, {
    text: '一年',
    onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 365)
      picker.$emit('pick', date)
    }
  }, {
    text: '两年',
    onClick (picker) {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 2)
      picker.$emit('pick', date)
    }
  }]
}

export const logTypeOptions = [
  { value: 1, label: '登陆日志' },
  { value: 2, label: '添加日志' },
  { value: 3, label: '修改日志' },
  { value: 4, label: '删除日志' },
  { value: 5, label: '其他日志' }]
