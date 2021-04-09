<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{ rowData['_index'] }}</span>
            <span v-if="indexSelect[rowData['_index']]"> （{{ indexSelect[rowData['_index']] }}）</span>
        </div>
        <div class="left">
            <img v-if="rowData.country.flag" width="40" :src="rowData.country.flag" alt="中国" style="vertical-align: sub;">
            <span class="left-span">{{ rowData.country.country }}</span>
            <img class="photo" v-if="rowData.detail_data.Anh" :src="'data:image/jpg;base64,' + rowData.detail_data.Anh" alt="">
            <p class="left-p" v-for="(item, key, index) in base_data" :key="index">
                <span class="key-span">{{ fieldSelect[key] ? fieldSelect[key].target_field : key }}：</span>
                <span class="value-span">{{ item }}</span>
            </p>
        </div>
        <div class='right'>
            <el-radio-group class="el-radio" v-model="showStatus" size="mini">
                <el-radio-button label="默认"></el-radio-button>
                <el-radio-button label="json"></el-radio-button>
            </el-radio-group>
            <el-button v-if="rowData.detail_data.SOYEU_ID && rowData['_index'] == 'vn-communist-party-finally-person'" size="mini" class="this_button" @click="openDetail(rowData.detail_data.SOYEU_ID)">查看当前党员详情</el-button>
            <el-button v-else-if="rowData.detail_data.SOYEU_ID" size="mini" class="this_button" @click="openDetail(rowData.detail_data.SOYEU_ID)">查看关联党员详情</el-button>
            <div class='right-div' v-if="showStatus=='默认'">
                <p v-for="(item, key, index) in detail_data" :key="index" class="text-item text-item-select">
                    <span class="key-span">{{ fieldSelect[key] ? fieldSelect[key].target_field : key }}：</span>
                    <span class="value-span">{{ item }}</span>
                </p>
            </div>
            <pre v-else>{{ {"_index": rowData._index, "_id": rowData._id, "_source": Object.assign({}, base_data, detail_data)} }}</pre>
        </div>
    </el-card>
</template>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.box-card{
    height: 150px;
    background: transparent;
    color: $main_font_color;
    border: 0;
    margin-bottom: 20px;
    /deep/.el-card__header{
        // color: $success_color;
        border: 0;
        padding: 5px 20px 0 20px;
        font-weight: 800;
        // border-bottom: 1px solid $success_color;
    }
    /deep/.el-card__body{
        height: calc(100% - 30px);
        padding: 5px 20px;
    }
    .left{
        position: relative;
        float: left;
        width: 300px;
        height: 100%;
        margin-right: 20px;
        overflow: auto;
        @include webkit-scrollbar1;
        .left-p{
            margin: 0;
        }
        .key-span{
            // color: $level1_color
        }
        .left-span{
            top: -5px;
            position: relative;
        }
    }
    .value-span{
        color: $level1_color
    }
    .this_button{
        position: absolute;
        right: 20px;
        top: 30px;
    }
    .right{
        margin-left: 300px;
        position: relative;
        height: 100%;
        width: calc(100% - 320px);
        .right-div{
            overflow: auto;
            height: 100%;
            @include webkit-scrollbar1;
            p{
                margin: 0;
            }
        }
        /deep/.el-radio{
            position: absolute;
            right: 20px;
            .el-radio-button--mini .el-radio-button__inner{
                padding: 5px 3px;
            }
        }
        pre{
            overflow: auto;
            height: 100%;
            @include webkit-scrollbar1;
            margin: 0 0 40px 0;
        }
    }
    .photo{
        position: absolute;
        right: 0;
        width: 70px;
        top: 0;
    }
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['rowData'],
  data () {
    return {
      showStatus: '默认',
      base_data: {},
      detail_data: {}
    //   excludeArray: ['source', 'phoneNumber', 'email', 'cardId', 'phoneImsi']
    }
  },
  computed: {
    ...mapGetters([
      'sourceTypeDict',
      'indexSelect',
      'fieldSelect'
    ])
  },
  created () {
    // console.log(this.indexSelect)
    this.base_data = this.rowData.base_data
    this.detail_data = this.rowData.detail_data
    // console.log(this.rowData)
  },
  methods: {
    openDetail (detail) {
      const routeUrl = this.$router.resolve({ path: '/detail', query: { id: detail } })
      window.open(routeUrl.href, '_blank')
    }
  },
  watch: {}
}
</script>
