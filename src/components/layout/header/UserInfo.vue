<template>
  <div class="flex items-center cursor-pointer hover-text">
    <ElAvatar size="small" round class="bg-gray-200" :src="profile?.avatarUrl ?? ''"></ElAvatar>
    <span class="text-xs ml-1.5" v-if="isLogin">{{ profile.nickname }}</span>
    <span class="text-xs ml-1.5" @click="showLogin = true" v-else>点击登录</span>

  </div>
  <el-dialog v-model="showLogin" title="登录" width="330px" append-to-body>
    <div>
      <div v-if="!isQR_code">
        <el-input size="large" placeholder="手机号码" :prefix-icon="Phone" v-model="phone" />
        <el-input size="large" class="mt-5" placeholder="验证码" :prefix-icon="Lock" v-model="password">
          <template #append>
            <el-button @click="loginCode">验证码</el-button>
          </template>
        </el-input>
      <button @click="loginSubmit" class="button w-full mt-5 py-5" style="border-radius: 5px;">登录</button>
      </div>
      <div class="QR_code" v-else>
        <el-image :src="QR_base64">
          <template #error>
            <div class="image-slot">
              <el-icon>
                <Picture />
              </el-icon>
            </div>
          </template>
        </el-image>
      </div>
      <el-row justify="space-between" style="margin-top:20px">
        <El-col :span="8" align="center"><el-link :underline="false" type="info" size="small" @click.stop="QR_Change">{{ isQR_code?"短信登录":"扫二维码" }}</el-link></El-col>
        <El-col :span="8" align="center"><el-link :underline="false" type="info" size="small"
            @click="loginTourist()">游客登录</el-link></El-col>
        <El-col :span="8" align="center"><el-link :underline="false" type="info" size="small" @click="Registerref=true">注册帐号</el-link></El-col>
        <!-- <El-col :span="8" align="center"><el-link :underline="false" type="info" size="small">意见反馈</el-link></El-col> -->
      </el-row>
    </div>
  </el-dialog>
  <Register ref="Registerref"></Register>
</template>

<script setup lang="ts">
import { Lock, Phone, Picture } from '@icon-park/vue-next'
import { useRouter } from "vue-router";
import {  ref } from "vue";
import { useUserStore } from "@/stores/user_code";
import { storeToRefs } from "pinia";
import { ElMessage } from 'element-plus'
import Register from './register.vue';
const Registerref=ref()
const router = useRouter()
const phone = ref('')
const password = ref('')
const { checkLogin, login_Sent, login_Verify, login_tourist,loginQR_image } = useUserStore()
const { isLogin, profile, showLogin,isQR_code,QR_base64 } = storeToRefs(useUserStore())
// 没用
const loginCode = () => {
  /^1[3-9][0-9]{9}$/.test(phone.value) ? login_Sent(phone.value) :
    ElMessage.warning("手机号不符合规则")
}
const loginSubmit = () => {
  !/^1[3-9][0-9]{9}$/.test(phone.value) ? ElMessage.warning("手机号不符合规则") :
    !/^[0-9]{4,8}$/.test(password.value) ? ElMessage.warning("验证码不正确") :
      login_Verify(phone.value, password.value)
}
const QR_Change=()=>{
  isQR_code.value=!isQR_code.value;
  loginQR_image()
}
const loginTourist = () => { login_tourist() }
 checkLogin()


</script>

<style lang="scss">
.QR_code {
  width: 100%;
  height: 100%;
  --el-fill-color-light: #f5f7fa;
  display: flex;
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
    .el-icon {
      font-size: 30px;
    }
  }

  .el-image {
    padding: 0 5px;
    max-width: 200px;
    max-height: 200px;
    width: 100%;
    height: 200px;
    margin: 0 auto;
  }
}</style>
