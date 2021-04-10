<template>
  <div class="app-wrapper" id="app">
     <transition
      enter-active-class="animated fadeInTop"
      leave-active-class="animated fadeOutTop"
      mode="out-in">
      <div class="header" key="list">
        <!-- btn btn-primary btn-ghost btn-shine -->
        <span class="title">社工库检索平台</span>
        <el-menu :default-active="routeActive"  mode="horizontal" background-color="transparent" active-text-color="#ffd04b" router>
            <el-menu-item index="/">首页</el-menu-item>
            <template v-for="item in permission_routers">
                <el-menu-item v-if="!item.submenu && !item.hidden && item.children.length!==0" :index="item.path + '/' + item.children[0].path" :key="item.name">
                    <div>{{ item.children[0].meta.title }}</div>
                </el-menu-item>
                <el-submenu v-else-if="item.children.length!=0 && !item.hidden" :key="item.name" :index="item.path">
                    <template slot="title"><div>{{ item.title }}</div></template>
                    <el-menu-item v-for="v in item.children" :key="v.name" :index="item.path + '/' + v.path">
                    <div v-if=" v.meta.title == '系统日志'" style="position: relative">
                        {{ v.meta.title }}
                    </div>
                    <div v-else>
                        {{ v.meta.title }}
                    </div>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
        <span class="logout">
          {{ username }}
          <el-button type="danger" icon="el-icon-switch-button" circle @click="logout"></el-button>
        </span>
      </div>
    </transition>
    <el-main>
      <transition name="fade" enter-active-class="animated fadeIn" mode="out-in">
        <router-view />
      </transition>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import constantRouterMap from '@/router'
export default {
  name: 'myapp',
  data () {
    return {
      flow_select: false,
      strategy_select: false,
      system_select: false,
      routerList: []
    }
  },
  created () {
    window.addEventListener('beforeunload', () => { // 在页面刷新时将vuex里的信息保存到sessionStorage里
      sessionStorage.setItem('searchStore', JSON.stringify(this.$store.state))
    })
    this.routerList = constantRouterMap.options.routes
    console.log(this.$store)
  },
  computed: {
    routeActive () {
      return `/${this.$route.path.replace('/', '')}`
    },
    ...mapGetters([
      'username',
      'permission_routers'
    ])
  },
  methods: {
    // 登出操作
    logout () {
      this.$confirm('此操作将退出平台，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SET_IS_LOAD', 0)
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 重新实例化vue-router对象
        })
      })
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.app-wrapper{
  height: 100%;
  // background: url('../../assets/img/9.jpg') top center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  /deep/.header {
    height: 60px;
    line-height: 60px;
    background:  $top_background_color;
    box-shadow: 0 2px 5px $main-color;
    .title{
        float: left;
        width: 250px;
        font-size: 20px;
        text-align: center;
        color:  #ffffff;
    }
    .el-menu{
        display: inline-block;
        width: 600px;
        // margin-left: 250px;
        border-bottom: 0;
        .el-submenu__title{
            color: $main_font_color;
            &:hover {
                background-color: transparent !important;
                color: #FFD048;
            }
        }
        .el-menu-item{
          color: $main_font_color;
          &:hover {
            color: #FFD048 !important;
          }
        }
    }
    .logout{
        font-size: 18px;
        float: right;
        margin-right: 20px;;
    }
  }
  .el-main{
    width: 100%;
    height: calc(100% - 60px);
    background: rgba(#000000, 0.3);
    padding: 0;
  }
}
</style>
<style lang="scss">
@import '@/styles/common.scss';
.el-menu--horizontal{
  .el-menu{
    background-color: #000 !important;
  }
  .el-menu--popup>.el-menu-item {
      color: $main_font_color;
  }
  .el-menu-item {
    color: $main_font_color;
    &:hover {
        background-color: transparent !important;
        color: #FFD048 !important;
    }
  }
  .el-menu-item .is-active{
    color: #FFD048;
  }
}
</style>
