<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar id="page-nav-bar" title="登录" />
    <!-- 登录的表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        type="number"
        maxlength="11"
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRues.mobile"
      >
        <i slot="left-icon" class="iconfont toutiao-shouji"></i>
      </van-field>
      <van-field
        name="验证码"
        v-model="user.code"
        type="text"
        placeholder="请输入验证码"
        :rules="userFormRues.code"
      >
        <i slot="left-icon" class="iconfont toutiao-yanzhengma"></i>
        <template #button>
          <!-- 发送验证码 -->
          <van-button
            size="small"
            round
            class="send-sms-btn"
            @click="onSendSms"
            native-type="button"
            v-if="isCountDownshow"
          >
            发送验证码
          </van-button>
          <!-- 倒计时 -->
          <van-count-down
            :time="1000 * 60"
            format="sss 后重新发送"
            v-else
            @finish="isCountDownshow = true"
          >
          </van-count-down>
        </template>
      </van-field>

      <div style="margin: 16px" class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from '@/api/index'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      // 验证规则
      userFormRues: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 是否展示倒计时
      isCountDownshow: true
    }
  },

  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      // 1. 表单数据
      const user = this.user
      // 2.表单验证
      // 3.提交表单请求登录

      try {
        const { data } = await loginAPI(user)
        this.$toast.success('登录成功!')
        // res 登录成功以后的返回值
        // console.log(res);

        // console.log(data.data);
        this.$store.commit('setUser', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("手机号或验证码错误");
          this.$toast.fail('手机或验证码错误')
        } else {
          console.log('登录失败,请稍后再试', err)
          this.$toast.fail('登录失败,请稍后再试')
        }
      }
    },
    // 4.根据请求响应结果处理后续操作

    // 发送验证码
    async onSendSms () {
      console.log('点击了发送验证码按钮')
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // console.log(123);
      // 2.校验通过,显示倒计时
      this.isCountDownshow = false
      // 3.调用接口发送验证码
      try {
        await sendSmsAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownshow = true
        if (err.response.status && err.response.status === 429) {
          this.$toast('频繁发送,请稍后再试  ')
        } else {
          this.$toast('发送失败,请稍后再试  ')
        }
      }
    }
  },

  components: {},

  computed: {},

  created () {}
}
</script>
<style  scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    background-color: #eeeeee;
    line-height: 46px;
    font-size: 20px;
  }
  .login-btn-wrap {
    padding: 22px 10px;
    .login-btn {
      background-color: #66b1ff;
    }
  }
}
</style>
