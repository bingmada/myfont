<template>
  <div class="login-container">
    <img class="top-img common_position" src="../../assets/img/top.png" alt="">
    <img class="bottom-img common_position" src="../../assets/img/bottom.png" alt="">
    <div class="center">
      <img class="center-img1" src="../../assets/img/logo2.png" alt="">
      <img class="center-img2" src="../../assets/img/logo3.png" alt="">
    </div>
    <span class="login-title common_position">社工库检索平台</span>
    <transition enter-active-class="animated fadeIn" v-if="!overtime">
      <el-form class="login-form common_position" autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
        <el-form-item prop="username">
          <div class="input-div">
            <fourBorder></fourBorder>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="off" placeholder="请输入用户名">
              <template slot="prepend"><i class="el-icon-s-custom"></i></template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="input-div">
            <fourBorder></fourBorder>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
              placeholder="请输入用户密码">
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
            <span class="show-pwd" @click="showPwd"><i :class="[pwdType === 'password' ? 'el-icon-more' : 'el-icon-view']"></i></span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </transition>
    <div v-else class="login-form common_position" style="width:500px">
      <span style="color: #ffffff" class="el-icon-warning">{{ overtime }}</span>
      <el-input size="mini" placeholder="请输入激活码" v-model="content" style="width: 460px"></el-input>
      <el-button type="primary" :loading="loading" @click.native.prevent="changeVerify" style="width: 384px;margin-top:15px;">提交</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  text-align: center;
  background: url('../../assets/img/9.jpg') center center;
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .common_position {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }
  .top-img {
    top: 0;
  }
  .bottom-img {
    bottom: 0;
  }
  .center{
    position: relative;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 600px;
    height: 600px;
    .center-img1{
      position: absolute;
      top: 0;
      left: 0;
      width: 600px;
      animation: rotation 15s linear infinite;
      -moz-animation: rotation 15s linear infinite;
      -webkit-animation: rotation 15s linear infinite;
      -o-animation: rotation 15s linear infinite;
    }
    @-webkit-keyframes rotation{
      from {-webkit-transform: rotate(0deg);}
      to {-webkit-transform: rotate(360deg);}
    }
    .center-img2{
      position: absolute;
      top: 100px;
      left: 100px;
      width: 400px;
      // animation: rotation1 15s linear infinite;
      // -moz-animation: rotation1 15s linear infinite;
      // -webkit-animation: rotation1 15s linear infinite;
      // -o-animation: rotation1 15s linear infinite;
    }
    @-webkit-keyframes rotation1{
      from {-webkit-transform: rotate(360deg);}
      to {-webkit-transform: rotate(0deg);}
    }
  }
  .login-title{
    top: 0;
    width: 500px;
    font-size: 50px;
    font-weight: 800;
    background-image: -webkit-gradient(linear, left 0, right 0, from(rgb(4, 94, 170)), to(rgb(1, 152, 216)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .login-form {
    top: 50%;
    transform: translate(-50%, -50%);
    .input-div{
      position: relative;
      display: inline-block;
      width: 25px;
      height: 50px;
      animation: WidthChange 1.2s;
      animation-fill-mode: forwards;
    }
    @keyframes WidthChange
    {
      from {width: 25px;}
      to {width: 300px;}
    }
    /deep/.el-input{
      top: 7px;
      .el-input__inner{
        // background: transparent;
        // color: #ffffff;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import fourBorder from './component/fourBorder'
import { changeVerifyApi } from '@/api/user'
export default {
  name: 'login',
  components: {
    fourBorder
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      content: '',
      loading: false,
      pwdType: 'password'
    }
  },
  computed: {
    ...mapGetters([
      'overtime'
    ])
  },
  methods: {
    showPwd () {
      this.pwdType = this.pwdType === 'password' ? '' : 'password'
    },
    handleLogin () {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message.error('用户名或密码不能为空')
        return
      }
      this.loading = true
      this.$store.dispatch('Login', this.loginForm).then(() => {
        this.loading = false
        this.$router.push('/')
      }).catch((e) => {
        this.loading = false
        // this.$message.error(e.msg)
      })
    },
    changeVerify () {
      this.loading = true
      changeVerifyApi(this.content).then(response => {
        this.loading = false
        this.content = ''
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
