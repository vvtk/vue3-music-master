<template>
  <el-dialog v-model="showLogin" title="注册" width="330px" append-to-body>
    <div>
      <div>
        <el-input size="large" placeholder="名称" :prefix-icon="AddUser" v-model="form.nickname" />
        <el-input size="large" placeholder="密码" :prefix-icon="Lock" v-model="form.password" />
        <el-input size="large" placeholder="手机号码" :prefix-icon="Phone" v-model="form.phone" />
        <el-input size="large" class="mt-5" placeholder="验证码" :prefix-icon="Lock" v-model="form.captcha">
          <template #append>
            <el-button @click="loginCode">验证码</el-button>
          </template>
        </el-input>
      <button @click="loginSubmit" class="button w-full mt-5 py-5" style="border-radius: 5px;">注册</button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { AddUser, Lock, Phone, Picture } from '@icon-park/vue-next'
const showLogin=ref(false)
const form=ref({password:'',phone:'',captcha:'',nickname:''})
function loginCode(){}
function loginSubmit(){}
defineExpose(showLogin)
</script>
<style lang="less">
    
</style>