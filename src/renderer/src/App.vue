<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { useDark, useToggle } from '@vueuse/core'
  import { ref, reactive, onMounted } from 'vue'

  const isDark = useDark()
  const toggleDark = () => useToggle(isDark)
  document.body.style.overflow = "hidden";

  //窗口控制
  function WinClose() { window.api.WinHandle("close") }
  function WinMini() { window.api.WinHandle("mini") }
  function WinMax() { window.api.WinHandle("max") }

  //设置代理
  const visible = ref(false)
  const form = reactive({
    status: false,
    type: '',
    host: '',
    port: 8080
  })
  function save() {
    window.api.SetProxyConfig(JSON.stringify(form))
    visible.value = false
  }
  onMounted(async () => {
    Object.assign(form, JSON.parse(await window.api.GetProxyConfig()))
  })

  //人机验证对话框
  const imageDialogVisible = ref(false)
  const reCaptchaDialogVisible_nyaa = ref(false)
  const reCaptchaDialogVisible_acgnx_a = ref(false)
  const reCaptchaDialogVisible_acgnx_g = ref(false)
  const imgSrc = ref('')
  const imgCaptcha = ref('')
  const reCaptcha = ref('')
  //图片验证码处理
  window.api.GetImageCaptcha(refreshImage)
  async function refreshImage() {
    imageDialogVisible.value = true
    imgSrc.value = 'https://www.dmhy.org/common/generate-captcha?code=' + Date.now()
  }
  //处理reCaptcha验证
  async function setReCaptcha(type: string) {
    if (type == 'nyaa') {
      reCaptchaDialogVisible_nyaa.value = true
    }
    if (type == 'acgnx_g') {
      reCaptchaDialogVisible_acgnx_g.value = true
    }
    if (type == 'acgnx_a') {
      reCaptchaDialogVisible_acgnx_a.value = true
    }
  }
  window.api.GetReCaptcha(setReCaptcha)
  window.addEventListener('message', e => {
    if (e.origin == 'https://nyaa.si' || e.origin == 'https://www.acgnx.se' || e.origin == 'https://share.acgnx.se') {
      reCaptcha.value = e.data
    }
  })
  //提交验证码
  async function submitCaptcha(type: string) {
    if (type == 'dmhy'){
      window.api.CheckLoginStatus('dmhy', imgCaptcha.value)
      imageDialogVisible.value = false
    }
    else {
      window.api.CheckLoginStatus(type, reCaptcha.value)
    }
  }
</script>

<template>
  <div class="layout">
    <!--登录人机验证对话框-->
    <!-- 图形验证码 -->
    <el-dialog v-model="imageDialogVisible" destroy-on-close title="登录到动漫花园" width="220">
      <el-row>
        <img :src="imgSrc" style="width: 100px; margin-right: 10px;" />
        <el-button link type="primary" size="small" @click="refreshImage">换一张</el-button>
      </el-row>
      <el-row style="height: 20px;" />
      <el-row>
        <el-input v-model="imgCaptcha" style="width: 100px; margin-right: 10px;" />
        <el-button type="primary" @click="submitCaptcha('dmhy')">确认</el-button>
      </el-row>
    </el-dialog>
    <!-- reCaptcha验证码 -->
    <el-dialog v-model="reCaptchaDialogVisible_nyaa" destroy-on-close title="登录到Nyaa" width="360">
      <el-row>
        <iframe src="https://nyaa.si/grecaptcha" style="height: 500px;width: 350px;"></iframe>
      </el-row>
      <el-row style="height: 20px;" />
      <el-row>
        <el-button type="primary" @click="submitCaptcha('nyaa'); reCaptchaDialogVisible_nyaa = false">确认</el-button>
      </el-row>
    </el-dialog>
    <el-dialog v-model="reCaptchaDialogVisible_acgnx_g" destroy-on-close title="登录到AcgnX" width="360">
      <el-row>
        <iframe src="https://www.acgnx.se/grecaptcha" style="height: 500px;width: 350px;"></iframe>
      </el-row>
      <el-row style="height: 20px;" />
      <el-row>
        <el-button type="primary" @click="submitCaptcha('acgnx_g'); reCaptchaDialogVisible_acgnx_g = false">确认</el-button>
      </el-row>
    </el-dialog>
    <el-dialog v-model="reCaptchaDialogVisible_acgnx_a" destroy-on-close title="登录到末日动漫" width="360">
      <el-row>
        <iframe src="https://share.acgnx.se/grecaptcha" style="height: 500px;width: 350px;"></iframe>
      </el-row>
      <el-row style="height: 20px;" />
      <el-row>
        <el-button type="primary" @click="submitCaptcha('acgnx_a'); reCaptchaDialogVisible_acgnx_a = false">确认</el-button>
      </el-row>
    </el-dialog>
    <el-container style="height: 100%">
      <!-- 标题栏 -->
      <el-header class="header">
        &nbsp;EasyPublish
        <el-button text circle type="danger" 
        style="position: absolute; right: 10px;" @click="WinClose">
          <el-icon :size="30"><Close /></el-icon>
        </el-button>
        <el-button text circle type="info" 
        style="position: absolute; right: 50px;" @click="WinMax">
          <el-icon :size="25"><FullScreen /></el-icon>
        </el-button>
        <el-button text circle type="info" 
        style="position: absolute; right: 90px;" @click="WinMini">
          <el-icon :size="29"><Minus /></el-icon>
        </el-button>
        <el-switch v-model="isDark" style="position: absolute; right: 180px; 
        --el-switch-on-color: #2d2d2f; --el-switch-off-color: #E5EAF3" 
        inline-prompt size="large" @change="toggleDark">
          <template #active-action>
            <el-icon><Moon /></el-icon>
          </template>
          <template #inactive-action>
            <el-icon><Sunny /></el-icon>
          </template>
        </el-switch>
        <div style="position: absolute; right: 140px;">
          <el-popover :visible="visible" :width="300">
            <el-form :model="form" label-width="auto" style="max-width: 300px">
              <el-form-item label="启用代理">
                <el-switch v-model="form.status" />
              </el-form-item>
              <el-form-item label="代理类型">
                <el-select v-model="form.type" placeholder="选择一种协议">
                  <el-option label="HTTP" value="http" />
                  <el-option label="HTTPS" value="https" />
                  <el-option label="SOCKS5" value="socks" />
                </el-select>
              </el-form-item>
              <el-form-item label="代理主机">
                <el-input v-model="form.host" />
              </el-form-item>
              <el-form-item label="代理端口">
                <el-input-number v-model="form.port" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save()">保存</el-button>
                <el-button @click="visible = false">取消</el-button>
              </el-form-item>
            </el-form>
            <template #reference>
              <el-button @click="visible = !visible" circle>
                <el-icon><Operation /></el-icon>
              </el-button>
            </template>
          </el-popover>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical" :router="true">
            <el-menu-item index="/new">
              <el-icon><DocumentAdd /></el-icon>
              <span>创建新任务</span>
            </el-menu-item>
            <el-menu-item index="/localtask">
              <el-icon><FolderOpened /></el-icon>
              <span>管理本地任务</span>
            </el-menu-item>
            <el-menu-item index="/onlinetask" disabled>
              <el-icon><Memo /></el-icon>
              <span>管理线上任务</span>
            </el-menu-item>
            <el-menu-item index="/login">
              <el-icon><Key /></el-icon>
              <span>登录管理</span> 
            </el-menu-item>
            <el-menu-item index="/quickstart">
              <el-icon><CircleCheck /></el-icon>
              <span>快速开始</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

.header {
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: x-large;
  position: relative;
  height: 50px;
  -webkit-app-region: drag;
}

button, .el-switch {
  -webkit-app-region: no-drag;
}

.el-menu--horizontal {
  --el-menu-horizontal-height: 100px;
}

.layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-main {
  padding: 0%;
}
</style>