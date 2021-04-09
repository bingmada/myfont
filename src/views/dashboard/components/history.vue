<template>
    <div class="this_history">
        <div v-if="searchHistory.length > 0">
            <ul>
                <li v-for="(item, index) in searchHistory" :key="index">
                    <span class="content">{{ item }}</span> <i class="remove el-icon-close" @click="removeHistory(item)"></i>
                </li>
            </ul>
            <p class="this_history_p" @click="removeAllHistory">清空所有历史数据</p>
        </div>
        <div v-else class="null-data">
            暂无历史记录
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.this_history{
    color: $main_font_color1;
    background: rgba(#333333, .5);
    padding: 5px 0;
    margin-top: 10px;
    ul{
        list-style:none;
        padding: 0 20px;
        li{
            width: 100%;
            .content{
                display: inline-block;
                max-width: calc(100% - 15px);
                @include text-overflow-ellipsis;
                padding: 2px 0;
                cursor: pointer;
            }
            .remove{
                float: right;
                margin-top: 2px;
                cursor: pointer;
            }
        }
    }
    .this_history_p{
        text-align: right;
        padding-right: 20px;
    }
    .null-data{
        text-align: center;
    }
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'history',
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    removeHistory (item) {
      this.$store.commit('SET_SEARCH_HISTORY', { type: 'deleteOne', data: item })
    },
    removeAllHistory () {
      this.$store.commit('SET_SEARCH_HISTORY', { type: 'deleteAll', data: [] })
    }
  }
}
</script>
