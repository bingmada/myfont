<template>
  <div class="main-div">
    <el-button class="export-button" v-if="inAnimation" size="mini" type="success" slot="append" icon="el-icon-download" @click="exportVisible=true">导出数据</el-button>
    <div class='dashboard' :class="inAnimation ? 'Anim': ''">
      <!-- <p class="logo-p">
        <img class="logo1" src="../../assets/img/logo3.png" alt="">
        <img class="logo2" src="../../assets/img/logo4.png" alt="">
      </p> -->
      <p>
        <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select" @keyup.enter.native="searchFunction">
          <el-select v-model="searchSelect" slot="prepend" placeholder="请选择" @change="selectChangeDef">
            <el-option label="全文检索" value="1"></el-option>
            <el-option label="高级检索" value="2"></el-option>
            <!-- <el-option label="人物画像" value="3"></el-option> -->
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchFunction" :loading="searchLoading">检索</el-button>
        </el-input>
        <!-- <el-input v-model="searchContent" @keyup.enter.native="searchFunction"></el-input> -->
        <!-- <el-button class="el-icon-search" ></el-button> -->
      </p>
      <p>
        <!-- <el-radio-group v-model="searchType">
          <el-radio label="dashboard" :disabled="searchSelect == 3">全部</el-radio>
          <el-radio label="phoneNumber">手机号</el-radio>
          <el-radio label="email">邮箱</el-radio>
          <el-radio label="phoneImsi">IMSI</el-radio>
          <el-radio label="username">姓名</el-radio>
          <el-radio label="cardId">身份证号</el-radio>
        </el-radio-group> -->
        <span v-if="searchSelect == 2" @click="showStatueChange" class="history">高级检索</span>
        <!-- <span @click="showStatueChange" class="history">历史记录</span> -->
        <!-- <history :class="[inAnimationTimes ? 'historyChangeEnd animated-bounce-in-right animated-bounce-out-left' : inAnimation ? 'historyChange':'']" v-if="showStatue"></history> -->
      </p>
    </div>
    <div class="detail" v-if="searchState">
      <div class="content" :class="!showStatue ? 'centent1' : ''">
        <Loading class="loading" v-if="searchLoading"></Loading>
          <div v-if="searchResult.length > 0 || searchLoading">
            <div v-for="(item, index) in searchResult" :key="index">
              <platform :rowData="item"></platform>
            </div>
          </div>
          <div class="null-content" v-else>
              <span>找不到和您查询的“ {{ searchContent }} ”相符的内容或信息。</span>
              <p>
                  <span>建议：</span>
                  <ul>
                      <li>请尝试其他查询词。</li>
                  </ul>
              </p>
          </div>
        </div>
    </div>
    <el-drawer
      class="my-drawer"
      :class="showDetailVisible?'my-drawer1':''"
      title="高级检索"
      :visible.sync="drawerVisible"
      :before-close="handleClose">
      <Senior :showDetailVisible='showDetailVisible' :seniorForm='seniorForm' @getFieldIndex='getFieldIndex' @submitForm='submitForm' @changeSeniorDetail='changeSeniorDetail'></Senior>
    </el-drawer>
    <div v-if="inAnimation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog class="my-dialog" title="导出数据" :visible.sync="exportVisible" width="40%">
      <el-form ref="form" :model="exportForm" label-width="100px">
        <el-form-item label="文件格式：">
          <el-radio-group v-model="exportForm.fileType">
            <el-radio label="json">json</el-radio>
            <el-radio label="csv">csv</el-radio>
            <el-radio label="zip">报告</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数据范围">
          <el-radio-group v-model="exportForm.size">
            <el-radio label="all">全部数据({{total}}条)</el-radio>
            <el-radio label="self">自选范围</el-radio>
          </el-radio-group>
          <p style="margin: 0" v-if="exportForm.size == 'self'">
            <el-input size="mini" v-model="exportForm.from" type="number" class="dialog-input"></el-input>
            <span style="margin: 0 10px">至</span>
            <el-input size="mini" v-model="exportForm.to" type="number" class="dialog-input"></el-input>
          </p>
        </el-form-item>
      </el-form>
      <div class="dialog-bottom">
        <el-button slot="append" @click="exportVisible=false">取消</el-button>
        <el-button type="success" slot="append" :loading="exportLoading" @click="exportFunction">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.main-div{
  --width: 290px;
  width: 1250px;
  height: 100%;
  left: 50%;
  margin-left: -625px;
  position: relative;
  .export-button{
    position: absolute;
    right: 20px;
    top: 30px;
  }
  .loading{
    width: calc(100% - 40px);
    height: calc(100% - 190px);
    // position: relative;
  }
  // background: rgba($color: $left_background_color, $alpha: .5)
  .my-drawer{
    height: 100%;
    .el-drawer-body {
      height: 100%;
    }
    /deep/.el-drawer__open .el-drawer.rtl{
      width: 450px !important;
      transition:width .5s;
    }
  }
  .my-drawer1{
    /deep/.el-drawer__open .el-drawer.rtl{
      width: 1150px !important;
      transition:width .5s;
    }
  }
}
.Anim{
  animation: showMsg 1s;
  animation-fill-mode: forwards;
}
@keyframes showMsg
{
  from {left: 175px; top: 30%;}
  to {left: 20px; top: 10px;}
}
.historyChange{
  animation: history_change 1s;
  animation-fill-mode: forwards;
}
@keyframes history_change
{
  from {width: 900px; position: absolute; top: calc(30% + 50px); left: 175px;}
  to {width: var(--width); position: absolute; top: 51px; left: 922px;}
}
.historyChangeEnd{
  width: var(--width); position: absolute; top: 51px; left: 922px;
  // transition: width .5s;
}
/deep/.dashboard{
    position: absolute;
    top: 35%;
    left: 175px;
    // transform: translateX(-50%);
    width: 900px;
    .logo-p{
      position: relative;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -khtml-user-select: none;
      user-select: none;
      .logo1{
        width: 200px;
        position: absolute;
        top: -233px;
        left: 350px;
        animation: rotation 15s linear infinite;
        -moz-animation: rotation 15s linear infinite;
        -webkit-animation: rotation 15s linear infinite;
        -o-animation: rotation 15s linear infinite;
      }
      .logo2{
        width: 250px;
        position: absolute;
        top: -260px;
        left: 325px;
        // transform: translateX(-50%);
        // -webkit-transform: rotate(360deg);
        animation: rotation1 15s linear infinite;
        -moz-animation: rotation1 15s linear infinite;
        -webkit-animation: rotation1 15s linear infinite;
        -o-animation: rotation1 15s linear infinite;
      }
      @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
      }
      @-webkit-keyframes rotation1{
        from {-webkit-transform: rotate(360deg);}
        to {-webkit-transform: rotate(0deg);}
      }
    }
    .el-radio{
      color: $main_font_color;
    }
    .el-select{
      .el-input__inner{
        width: 110px;
      }
    }
    p{
      .history{
        color: $main_font_color;
        float: right;
        position: relative;
        top: -2px;
        border-bottom: 1px solid $main_font_color;
        &:hover{
          cursor: pointer;
        }
      }
      // text-align: center;
    }
}
.detail_top{
    margin-bottom: 20px;
    .el-input{
        width: 500px;
        margin-right: 10px;
    }
    .el-radio{
        color: $main_font_color;
    }
}
.detail{
    padding: 0 20px;
    padding-top: 100px;
    height: calc(100% - 100px);
    background: rgba(#000000, .9);
    .content{
        width: 900px;
        transition:width .5s;
        height: calc(100% - 100px);
        overflow: auto;
        // backgeroun
        &::-webkit-scrollbar {
            width: 6px; // 横向滚动条
            height: 6px; // 纵向滚动条 必写
        }
        &::-webkit-scrollbar-thumb {
            background-color: #ddd;
            border-radius: 3px;
        }
    }
    .centent1{
      width: 1190px;
      transition:width .5s;
    }
    .null-content{
      padding-top: 100px;
      color: $main_font_color;
      font-size: 20px;
    }
}
.el-pagination{
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.el-dialog{
  .dialog-input{
    width: 100px;
  }
  .dialog-bottom{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import Senior from './components/senior'
import Platform from '@/components/platform'
import Loading from '@/components/loading'
import { searchDataApi, exportFunctionApi, getExportStatusApi } from '@/api/search'
import { getSourceTypeApi, getAllCountryApi, getFieldIndexApi } from '@/api/sql'
export default {
  data () {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 50,
      searchContent: '',
      searchState: false,
      searchType: 'dashboard',
      searchLoading: false,
      searchSelect: '1',
      inAnimation: false,
      // inAnimationTimes: 0,
      showStatue: false,
      searchResult: [],
      seniorSearch: {},
      exportVisible: false,
      exportForm: { fileType: 'json', size: 'all', from: 0, to: 0 },
      drawerVisible: false,
      seniorForm: { searchIndexList: '', inputIndex: '', selectIndex: '', selectSource: '', selectCountry: '', relationship: 'or', searchForm: [{ field: '', content: '', condition: '' }] },
      timeTook: 0,
      showDetailVisible: false,
      exportLoading: false
    }
  },
  components: {
    Platform,
    Loading,
    Senior
  },
  computed: {
    ...mapGetters([
      'searchHistory',
      'requestLoading',
      'fieldDict',
      'indexDict',
      'sourceTypeDict',
      'indexSelect',
      'fieldSelect',
      'sourceSelect',
      'countrySelect'
    ])
  },
  created () {
    this.getFieldIndex()
    if (!this.countrySelect.length) {
      getAllCountryApi().then(response => {
        this.$store.commit('SET_COUNTRY_SELECT', response.data.data)
      })
    }
    // getFieldTableApi().then(response => {
    //   this.fieldDict = response.data.data
    // })
    // getIndexTableApi().then(response => {
    //   this.indexDict = response.data.data
    // })
    // if (!this.sourceTypeDict) {
    getSourceTypeApi().then(response => {
      this.$store.commit('SET_SOURCE_TYPE_DICT', response.data.data.source_type_dict)
      this.$store.commit('SET_SOURCE_SELECT', response.data.data.source_select)
    })
  },
  methods: {
    getFieldIndex (index = '*') {
      getFieldIndexApi(index).then(response => {
        this.$store.commit('SET_FIELD_SELECT', response.data.data.field_dict)
        this.$store.commit('SET_INDEX_SELECT', response.data.data.index_dict)
      })
    },
    searchFunction () {
      // this.$router.push({ path: '/detail' })
      if (!this.searchContent) {
        this.$message.warning('请输入搜索内容')
        return
      }
      if (this.searchSelect === '3') {
        this.searchPersonDef(this.searchType, this.searchContent)
        return
      }
      this.inAnimation = true
      this.searchLoading = true
      // setTimeout(() => {
      //   this.inAnimationTimes = 1
      // }, 1000)
      this.searchResult = []
      this.searchState = true
      this.$store.commit('SET_SEARCH_HISTORY', { type: 'add', data: this.searchContent })
      searchDataApi({ searchType: this.searchType, searchContent: this.searchContent, pageSize: this.pageSize, start: this.pageSize * (this.currentPage - 1), searchSelect: this.searchSelect }).then(response => {
        this.searchLoading = false
        this.searchResult = response.data.data.res_data
        console.log(this.searchResult)
        this.total = response.data.data.total
        this.timeTook = response.data.data.took
      }).catch(() => {
        this.searchLoading = false
      })
    },
    exportFunction () {
      this.exportLoading = true
      exportFunctionApi({ searchForm: { searchType: this.searchType, searchContent: this.searchContent, searchSelect: this.searchSelect }, exportForm: this.exportForm }).then(response => {
        this.getExportStatus(response.data.data, this.exportForm.fileType)
      })
    },
    getExportStatus (filename, fileType) {
      getExportStatusApi(filename).then(response => {
        console.log(response.data.data)
        if (response.data.data === 100) {
          this.exportLoading = false
          const a = document.createElement('a')
          a.setAttribute('download', '')
          a.setAttribute('href', '/uploadLzguwangback/' + filename + '.' + fileType)
          a.click()
        } else if (response.data.data > 100) {
          this.$message.warning('导出出现问题，请重新提交导出请求')
        } else {
          setTimeout(() => {
            this.getExportStatus(filename, fileType)
          }, 2000)
        }
      })
    },
    selectChangeDef () {
      console.log(this.searchSelect)
      if (this.searchSelect === '2') {
        this.drawerVisible = true
        this.searchContent = JSON.stringify(this.seniorForm)
      }
      if (this.searchSelect === '3') {
        if (this.searchType === 'dashboard') {
          this.searchType = 'phoneNumber'
        }
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.searchFunction()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.searchFunction()
    },
    showStatueChange () {
      // this.showStatue = !this.showStatue
      this.drawerVisible = !this.drawerVisible
    },
    handleClose (done) {
      this.drawerVisible = false
    },
    searchPersonDef (field, uin) {
      const { href } = this.$router.resolve({ path: '/person', query: { field: field, content: uin } })
      window.open(href, '_blank')
    },
    submitForm (seniorForm) {
      this.currentPage = 1
      this.drawerVisible = false
      this.searchContent = JSON.stringify(seniorForm)
      this.searchFunction()
    },
    changeSeniorDetail (state) {
      this.showDetailVisible = state
    }
  },
  watch: {
  }
}
</script>
