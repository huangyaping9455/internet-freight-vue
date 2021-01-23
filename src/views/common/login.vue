<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">vvvvvvvvvvvvvv</h2>
          <p class="brand-info__intro">后台管理前端功能，ghhfgfgfghhfghhfgg。</p>
        </div>
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:!loginType}" @click="loginType=false">密码登录</a>
            <a href="javascript:;" :class="{on:loginType}" @click="loginType=true">短信登录</a>
          </div>
          <div class="login-content">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                     status-icon>
              <!--账号密码登录-->
              <div v-if="!loginType">
                <el-form-item prop="userName">
                  <el-input v-model="dataForm.username" placeholder="帐号"></el-input>

                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                  <el-row :gutter="20">
                    <el-col :span="14">
                      <el-input v-model="dataForm.imageCode" placeholder="图形验证码">
                      </el-input>
                    </el-col>
                    <el-col :span="10" class="login-captcha">
                      <img :src="verifyCode" @click="getVerifyCode()" alt="">
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>

              <!--电话号码登录-->
              <div v-if="loginType">
                <el-form-item prop="userName">
                  <el-input v-model="dataForm.mobile" placeholder="电话号码"></el-input>
                  <button class="get-verification" @click.prevent="getCode" :disabled="!rightPhone"
                          :class="{right_phone:rightPhone}">
                    {{ computeTime > 0 ? `已发送(${computeTime}s)` : '获取验证码' }}
                  </button>
                </el-form-item>
                <el-form-item prop="captcha">
                  <el-input v-model="dataForm.smsCode" placeholder="短信验证码">
                  </el-input>
                </el-form-item>

                <section class="login_hint">
                  温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>

              </div>

              <el-form-item>
                <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getImageCode, getSmsCode, passwordLogin, mobileLogin } from '@/api/api'

export default {
  data () {
    return {
      dataForm: {
        username: '',
        password: '',
        imageCode: '',
        mobile: '',
        smsCode: ''
      },
      dataRule: {
        username: [
          { required: true, message: '帐号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        imageCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      verifyCode: '',
      loginType: true, // true:电话好登陆
      computeTime: 0
    }
  },
  created () {
    this.getVerifyCode()
  },

  computed: {
    rightPhone () {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.dataForm.mobile)
    }
  },
  methods: {
    // 发送短信验证码
    getCode () {
      // 如果当前没有计时才开始计时
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 10
        const endTime = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) { // 小于邓毅0 停止计时
            clearInterval(endTime)
          }
        }, 1000)
        // 请求后端发送短信验证码
        const params = {
          mobile: this.dataForm.mobile
        }
        getSmsCode(params).then(({ data }) => {
          console.log('已发送。。。')
        })
      }
    },
    // 提交表单
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (this.loginType) {
            const params = {
              mobile: this.dataForm.mobile,
              smsCode: this.dataForm.smsCode
            }
            mobileLogin(params).then(({ data }) => {
              if (data && data.code === 0) {
                this.$cookie.set('Authorization', 'bearer ' + data.data.access_token)
                this.$router.replace({ name: 'home' })
              } else {
                this.$message.error(data.msg || '用户名错误！')
              }
            }).catch(error => {
              this.$message.error(error.response.data.msg)
            })
          } else {
            const params = {
              username: this.dataForm.username,
              password: this.dataForm.password,
              imageCode: this.dataForm.imageCode
            }
            passwordLogin(params).then(({ data }) => {
              if (data && data.code === 0) {
                this.$cookie.set('Authorization', 'bearer ' + data.data.access_token)
                this.$router.replace({ name: 'home' })
              } else {
                this.$message.error(data.msg || '用户名错误！')
                this.getVerifyCode()
              }
            }).catch(error => {
              this.getVerifyCode()
              this.$message.error(error.response.data.msg)
            })
          }
        }
      })
    },

    // 获取验证码
    getVerifyCode () {
      getImageCode().then(res => {
        this.verifyCode = window.URL.createObjectURL(res.data)
      })
    }
  }
}
</script>

<style lang="scss">
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, .6);
  overflow: hidden;

  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/login_bg.jpg);
    background-size: cover;
  }

  .login_hint {
    margin-top: 5px;
    color: #999;
    font-size: 14px;
    line-height: 20px;

    > a {
      color: #17B3A3;

    }
  }

  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }

  .get-verification {
    position: absolute;
    top: 20%;
    right: 6px;
    transform: translateY(10%);
    border: 0;
    font-size: 15px;
    color: #ccc;
    background: transparent;

    &.right_phone {
      color: black;
    }

  }

  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }

  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }

  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }

  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: .6;
  }

  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }

  .login-title {
    font-size: 28px;
    text-align: center;
    font-weight: bold;
  }

  .login-content {
    margin-top: 10px;

  }

  .login_header_title {

    font-size: 16px;

    > a {
      color: #333333;
      padding-top: 40px;
      text-align: center;

      &:first-child {
        margin-left: 60px;
        margin-right: 60px;
      }

      &.on {
        color: #17B3A3;
        font-weight: 800;
        border-bottom: 1px solid #17B3A3;

      }

    }

  }

  .login-captcha {
    overflow: hidden;

    > img {
      width: 100%;
      height: 50%;
      cursor: pointer;
    }
  }

  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
</style>
