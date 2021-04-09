<template>
  <div class="user">
    <div class="top">
      <el-input size="mini" class="my-input" v-model="searchContent" clearable placeholder="用户名称、备注检索" style="width: 250px;" @keyup.enter.native="getUserListDef"></el-input>
      <el-button size="mini" type="primary" icon="el-icon-search" :loading="tableLoading" @click="getUserListDef">搜索</el-button>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAddUser">添加用户</el-button>
    </div>
    <div class="my-table-div">
      <Loading class="loading" v-if="tableLoading"></Loading>
      <el-table height="100%" :data="tableData" class="my-table">
        <el-table-column prop="username" label="用户名称"></el-table-column>
        <el-table-column show-overflow-tooltip  prop="role"  label="用户权限" width="80">
            <template slot-scope="scope">
                <span v-if="scope.row.role === 0" class="success-color">超级管理员</span>
                <span v-if="scope.row.role === 1" class="success-color">管理员</span>
                <span v-if="scope.row.role === 2">普通用户</span>
            </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="overtime" label="过期时间" width="140">
            <template slot-scope="scope">
              {{ scope.row.overtime ? scope.row.overtime : '永久' }}
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="online_time" label="上次在线时间" width="140"></el-table-column>
        <el-table-column show-overflow-tooltip prop="online_ip" label="上次在线ip" width="120"></el-table-column>
        <el-table-column prop="remark" show-overflow-tooltip min-width="80" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
        </el-table-column>
        <el-table-column  label="操作"  width="220" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" class="el-icon-edit-outline" @click="handleEditCase(scope.row)">编辑</el-button>
                <el-button :disabled="scope.row.username=='admin'" size="mini" type="waring" class="el-icon-delete" @click.stop="deleteUser(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination class="my-pagination1" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <el-dialog :title="addUserDialog? '添加用户': '修改用户'" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%">
      <el-form :model="userForm" size="mini" :rules="rules" ref="userForm" status-icon label-width="120px">
        <el-form-item label="用户名称" prop="username" :error="errorMsg">
          <el-input v-model="userForm.username" autocomplete="off" :disabled="!addUserDialog" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="userForm.password" autocomplete="off" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="userForm.checkPassword" autocomplete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" prop="role" v-if="role == 0">
          <el-select v-model="userForm.role" placeholder="请选择用户权限角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="截止时间" prop="overtime">
          <el-date-picker size="mini" v-model="userForm.overtime" type="datetime" placeholder="过期时间,为空表示永久有效"
           value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
            <el-switch v-model="userForm.state" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="userForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSubmitUser" size="mini" :loading="submitBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.user{
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  padding: 10px 20px 20px 20px;
  .top{
    margin-bottom: 5px;
  }
  .my-table-div{
    position: relative;
    height: calc(100% - 50px);
    // .loading{
    //   height: 100%;
    //   width: 100%;
    // }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/loading'
import { pickerOptions1 } from '@/utils/common'
import { getUserListApi, editUserApi, postUserListApi, deleteUserApi } from '@/api/user'
export default {
  name: 'User',
  components: {
    Loading
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (this.userForm.checkPassword !== '') {
        this.$refs.userForm.validateField('checkPassword')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      showTooltip: false,
      dialogTaskTypeVisible: false,
      taskTypeList: [],
      taskTypeIdList: [],
      addUserDialog: false,
      dialogFormVisible: false,
      userForm: { username: '', password: '', remark: '', checkPassword: '', overtime: '', role: 2, state: 1 },
      currentPage: 1,
      pageSize: 50,
      total: 0,
      searchContent: '',
      tableLoading: false,
      tableData: [],
      errorMsg: '',
      checkAll: false,
      roleOptions: [
        { label: '管理员', value: 1 },
        { label: '普通用户', value: 2 }
      ],
      rules: {
        username: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        role: [{ required: true, message: '请输入选择用户权限', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, message: '长度在至少为 5 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入登录密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      submitBtnLoading: false,
      pickerOptions: pickerOptions1
    }
  },
  created () {
    this.getUserList()
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  methods: {
    getUserListDef () {
      this.currentPage = 1
      this.getUserList()
    },
    getUserList () {
      this.tableLoading = true
      getUserListApi({ currentPage: this.currentPage, pageSize: this.pageSize, searchContent: this.searchContent }).then(response => {
        this.tableData = response.data.data.data
        this.tableLoading = false
        this.total = response.data.data.total
      }).catch(() => {
        this.tableLoading = false
      })
    },
    handleAddUser () {
      this.addUserDialog = true
      this.dialogFormVisible = true
      this.userForm = { username: '', password: '', remark: '', checkPassword: '', overtime: '', role: 2, state: 1 }
    },
    // 关闭弹窗重置表单
    handleDialogClose () {
      this.userForm = { username: '', password: '', remark: '', checkPassword: '', overtime: '', role: 2, state: 1 }
    },
    handleSubmitUser () {
      this.submitBtnLoading = true
      if (this.addUserDialog) {
        postUserListApi(this.userForm).then(response => {
          this.$message.success('添加成功')
          this.dialogFormVisible = false
          this.submitBtnLoading = false
          this.getUserList()
        }).catch(() => {
          this.submitBtnLoading = false
          this.getUserList()
        })
      } else {
        editUserApi(this.userForm).then(response => {
          this.$message.success('修改成功')
          this.dialogFormVisible = false
          this.submitBtnLoading = false
          this.dialogTaskTypeVisible = false
          this.getUserList()
        }).catch(() => {
          this.$message.warning('修改失败')
          this.submitBtnLoading = false
        })
      }
    },
    handleEditCase (row) {
      // this.currentUserid = row.id
      const temp = JSON.parse(JSON.stringify(row))
      temp.password = temp.checkPassword = 'password'
      this.userForm = temp
      this.dialogFormVisible = true
      this.addUserDialog = false
    },
    deleteUser (id) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserApi(id).then(response => {
          this.$message.success('删除成功')
          this.getUserList()
        }).catch(() => {
          this.$message.warning('删除失败')
        })
      })
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.getUserList()
    }
  }
}
</script>
