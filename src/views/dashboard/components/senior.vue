<template>
    <div class="senior">
       <div class="drawer-div">
            <p class="littleTitle">索引设置
              <span class="title-span" @click="changeSenior">
                <i class="el-icon-question"></i>{{ seniorRemark ? '隐藏说明' : '显示说明' }}
              </span>
            </p>
            <el-form ref="form" label-width="100px">
                <el-form-item label="索引条件：">
                    <el-select class="my-select" v-model="selectCountry" placeholder="国家筛选" size="mini" style="width: 130px;margin-right: 5px;" filterable clearable @change="changeIndexSelect(selectCountry)" :popper-append-to-body='false'>
                        <el-option v-for="i in countrySelect" :key="i.english" :label="i.chinese" :value="i.english">
                          <img width='40' :src='i.flag' style='vertical-align: sub;'>
                          {{i.chinese + '(' + i.english + ')'}}
                       </el-option>
                    </el-select>
                    <el-select class="my-select" v-model="selectSource" placeholder="类型筛选" size="mini" style="width: 130px;margin-right: 5px;" filterable clearable @change="changeIndexSelect()" :popper-append-to-body='false'>
                        <el-option
                            v-for="i in sourceSelect"
                            :key="i.english"
                            :label="i.chinese + '(' + i.english + ')'"
                            :value="i.english">
                        </el-option>
                    </el-select>
                    <div class="detail-span" style="margin-left: 60px">缩小索引范围，方便索引查找，支持中文检索</div>
                </el-form-item>
                <el-form-item label="索引选择：">
                    <el-select class="my-select" v-model="selectIndex" placeholder="索引选择" size="mini" style="width: 265px;margin-right: 5px;" filterable clearable @change="changeSelectIndex(selectIndex)" :popper-append-to-body='false'>
                        <el-option
                            v-for="i in Object.keys(this.thisIndexSelect)"
                            :key="i"
                            :label="thisIndexSelect[i] ? thisIndexSelect[i] + '(' + i + ')': i"
                            :value="i">
                        </el-option>
                    </el-select>
                    <div class="detail-span" style="margin-left: 60px">选择索引后，下方会增加对应索引标签，标签内的索引代表要搜索的索引</div>
                </el-form-item>
                <el-form-item label="手动输入：">
                    <el-input class="my-input" size="mini" v-model="inputIndex" style="width: 208px; margin-right: 5px" @keyup.enter.native='changeSelectIndex(inputIndex)'></el-input>
                    <el-button type="success" size="mini" @click="changeSelectIndex(inputIndex)">添加</el-button>
                    <div class="detail-span" style="margin-left: 60px">可输入完整index，也可以使用*号模糊匹配,例：*index index* *index*；输入后可回车添加</div>
                </el-form-item>
                <el-form-item label="已选索引：">
                    <el-tag type="success" style="margin-right: 5px" v-for="tag in searchIndexList" :key="tag" closable @close="handleClose(tag)">{{ tag }}</el-tag>
                </el-form-item>
            </el-form>
        </div>
        <div class="drawer-div drawer-div1">
            <p class="littleTitle">字段设置
                <el-tooltip class="item" effect="dark" content="添加条件" placement="top">
                    <i width='20px' class="add-i el-icon-circle-plus" @click="addCondition" v-if="searchType === 'first'"></i>
                </el-tooltip>
            </p>
            <el-tabs v-model="searchType" class="my-tabs">
                <el-tab-pane label="精确字段查询" name="first">
                    <el-form ref="form" label-width="60px">
                        <el-form-item :label="'条件' + (index + 1) + ':'" v-for="(item, index) in firstForm" :key="index">
                            <!-- <el-input class="my-input" size="mini" v-model="item.field" placeholder="请输入字段名称" style="width: 110px;margin-right: 5px;"></el-input> -->
                            <el-select class="my-select" v-model="item.field" placeholder="字段名称" size="mini" style="width: 110px;margin-right: 5px;" filterable :popper-append-to-body='false'>
                              <div v-for="i in Object.keys(fieldSelect)" :key="i">
                                <el-option :label="fieldSelect[i].target_field ? i + '(' + fieldSelect[i].target_field + ')' : i" :value="i" v-if="fieldSelect[i].search"></el-option>
                              </div>
                            </el-select>
                            <el-select v-if="fieldSelect[item.field] && fieldSelect[item.field].type == 'date'" class="my-select" v-model="item.condition" placeholder="请选择条件" size="mini" style="width: 90px" :popper-append-to-body='false'>
                                <el-option v-for="i in dateConditionOptions" :key="i.value" :label="i.label" :value="i.value"></el-option>
                            </el-select>
                            <el-select v-else-if="fieldSelect[item.field] && fieldSelect[item.field].type == 'integer'" class="my-select" v-model="item.condition" placeholder="请选择条件" size="mini" style="width: 90px" :popper-append-to-body='false'>
                                <el-option v-for="i in numberConditionOptions" :key="i.value" :label="i.label" :value="i.value"></el-option>
                            </el-select>
                            <el-select v-else class="my-select" v-model="item.condition" placeholder="请选择条件" size="mini" style="width: 90px" :popper-append-to-body='false'>
                                <el-option v-for="i in conditionOptions" :key="i.value" :label="i.label" :value="i.value"></el-option>
                            </el-select>
                            <el-date-picker v-if="fieldSelect[item.field] && fieldSelect[item.field].type == 'date'" class="my-date-picker" size="mini" v-model="item.content" type="date" style="width: 110px;margin-left: 5px;margin-right: 10px;" placeholder="选择日期" :popper-append-to-body='false'></el-date-picker>
                            <el-input v-else-if="fieldSelect[item.field] && fieldSelect[item.field].type == 'integer'" type="number" class="my-input" size="mini" v-model="item.content" placeholder="请输入匹配内容" style="width: 110px;margin-left: 5px;"></el-input>
                            <el-input v-else class="my-input" size="mini" v-model="item.content" placeholder="请输入匹配内容" style="width: 110px;margin-left: 5px;"></el-input>
                            <i class="remove-i el-icon-remove" @click="removeCondition(index)"></i>
                            <span class="detail-span" style="margin-left: 29px">请选择或输入对应内容</span>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="secondForm" label-width="90px">
                        <el-form-item label="字段关系：">
                            <el-radio-group v-model="relationship">
                                <el-radio label="or">or</el-radio>
                                <el-radio label="and">and</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="模糊字段查询" name="second">
                    <el-form ref="form" :model="secondForm" label-width="160px">
                        <el-form-item label="匹配字段：">
                            <el-input class="my-input" size="mini" v-model="secondForm.field"></el-input>
                            <span class="detail-span" style="margin-left: 9px;">字段支持*号模糊匹配，并支持多个，中间用逗号隔开，例：*field, field*, *field*</span>
                        </el-form-item>
                        <el-form-item label="匹配内容：">
                            <el-input class="my-input" size="mini" v-model="secondForm.content"></el-input>
                            <span class="detail-span"></span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="自定义查询语句" name="third">
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" class="my-input" size="mini" v-model="selfContent" style="width: 400px"
                    :placeholder="'{\'query\':\n  {\'bool\':\n    {\'must\': []}\n  }\n}'"></el-input>
                    <span class="detail-span" style="margin-left: 20px;">可将es的search查询post参数填至文本框</span>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="drawer-bottom">
          <el-button slot="append" @click="submitRewrite">重置</el-button>
          <el-button type="success" slot="append" @click="submitForm">确定</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.senior{
    height: calc(100% - 180px);
    overflow-y: auto;
    overflow-x: hidden;
    @include webkit-scrollbar;
    .drawer-div{
        padding: 0 20px;
        .littleTitle{
            color: #ffffff;
        }
        .detail-span{
            width: calc(100% - 265px);
            color: $main_font_color;
            @include text-overflow-ellipsis;
            display: inline-block;
            position: absolute;
        }
        // .el-form-item__content{
        //   @include text-overflow-ellipsis;
        // }
        .title-span{
            float: right;
            // border-bottom: 1px solid $main_font_color;
            color: $main_font_color;
            &:hover{
            cursor: pointer;
            color: #FFD048;
            }
        }
    }
    .drawer-bottom{
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
    .drawer-div1{
      .littleTitle{
        border-top: 1px solid #545454;
        padding-top: 20px;
      }
    }
    .el-form-item {
        margin-bottom: 0px;
    }
    /deep/.el-form-item__label{
      color: $main_font_color;
    }
    /deep/.el-input__inner{
      padding: 0 5px;
      border:1px solid $main_font_color;
    }
    /deep/.el-textarea__inner{
        color: #ffffff;
        background-color: transparent;
        border:1px solid $main_font_color;
    }
    .remove-i{
        color: red;
    }
    .add-i{
        position: relative;
        left: 335px;
        top: 40px;
        font-size: 10px;
        color: #67C23A;
        z-index: 999;
    }
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'senior',
  props: ['seniorForm', 'showDetailVisible'],
  computed: {
    ...mapGetters([
      'countrySelect',
      'sourceSelect',
      'fieldSelect',
      'indexSelect'
    ])
  },
  data () {
    return {
      searchType: 'first',
      firstForm: [{ field: '', content: '', condition: '' }],
      secondForm: { field: '', content: '' },
      selfContent: '',
      relationship: 'or',
      seniorRemark: this.showDetailVisible,
      selectCountry: '',
      selectSource: '',
      selectIndex: '',
      inputIndex: '',
      thisIndexSelect: [],
      searchIndexList: [],
      conditionOptions: [{ value: 'equals', label: '等于' },
        { value: 'startsWith', label: '以...开始' },
        { value: 'endsWith', label: '以...结束' },
        { value: 'contain', label: '包含' },
        { value: 'not equals', label: '不等于' },
        { value: 'not startsWith', label: '不以...开始' },
        { value: 'not endsWith', label: '不以...结束' },
        { value: 'not contain', label: '不包含' }],
      dateConditionOptions: [{ value: 'date less', label: '小于' },
        { value: 'date less equal', label: '小于等于' },
        { value: 'date more', label: '大于' },
        { value: 'date more equal', label: '大于等于' }],
      numberConditionOptions: [{ value: 'number less', label: '小于' },
        { value: 'number less equal', label: '小于等于' },
        { value: 'number more', label: '大于' },
        { value: 'number more equal', label: '大于等于' }]
    }
  },
  created () {
    this.changeIndexSelect()
  },
  methods: {
    changeSelectIndex (item) {
      if (this.searchIndexList.indexOf(item) === -1 && item) {
        this.searchIndexList.push(item)
      }
      this.$emit('getFieldIndex', this.searchIndexList.join(','))
    },
    addCondition () {
      if (this.searchType === 'first') {
        this.firstForm.push({ field: '', content: '', condition: '' })
      }
    },
    handleClose (tag) {
      this.searchIndexList.splice(this.searchIndexList.indexOf(tag), 1)
      this.$emit('getFieldIndex', this.searchIndexList.join(','))
    },
    changeIndexSelect () {
      const array = {}
      console.log(this.indexSelect)
      const keys = Object.keys(this.indexSelect)
      keys.forEach(element => {
        let add = true
        if (this.selectCountry) {
          if (!element.startsWith(this.selectCountry.toLowerCase())) {
            add = false
          }
        }
        if (this.selectSource && add) {
          if (!element.endsWith(this.selectSource)) {
            add = false
          }
        }
        if (add) {
          array[element] = this.indexSelect[element]
        }
      })
      this.thisIndexSelect = array
      console.log(this.thisIndexSelect)
    },
    removeCondition (index) {
      // if (this.firstForm.length === 1) {
      //   this.$message.warning('请至少设置一条检索条件')
      //   return
      // }
      this.firstForm.splice(index, 1)
    },
    submitRewrite () {
      this.firstForm = [{ field: '', content: '', condition: '' }]
      this.secondForm = { field: '', content: '' }
      this.selectCountry = ''
      this.selectSource = ''
      this.selectIndex = ''
      this.inputIndex = ''
      this.changeIndexSelect()
      this.searchIndexList = []
    },
    submitForm () {
      const data = { searchIndexList: this.searchIndexList, inputIndex: this.inputIndex, selectIndex: this.selectIndex, selectSource: this.selectSource, selectCountry: this.selectCountry, relationship: this.relationship }
      if (this.searchType === 'first') {
        data.searchForm = this.firstForm
      } else if (this.searchType === 'second') {
        data.searchForm = this.secondForm
      } else {
        data.searchForm = this.selfContent
      }
      this.$emit('submitForm', data)
    },
    changeSenior () {
      this.seniorRemark = !this.seniorRemark
      this.$emit('changeSeniorDetail', this.seniorRemark)
    }
  }
}
</script>
