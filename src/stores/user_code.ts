import { defineStore } from "pinia";
import {
  useLogin,
  useLoginSent,
  useLoginStatus,
  useLoginTourist,
  useLoginVerify,
  useQR_Change,
  useQR_img,
  useQR_Key,
} from "@/utils/api";
import type { UserProfile } from "@/models/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { watch } from "vue";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      cookie: "",
      showLogin: false,
      isQR_code: false,
      QR_Key: "",
      QR_base64: "",
      QR_Timeout: null as any,
      profile: {} as UserProfile,
    };
  },
  getters: {
    isLogin: (state) => {
      return state.profile?.userId > 0;
    },
  },
  actions: {
    async loginQR_Key() {
      const res = await useQR_Key();
      this.QR_Key = res.data.unikey;
    },
    async loginQR_image() {
      await this.loginQR_Key();
      const res = await useQR_img(this.QR_Key);
      this.QR_base64 = res.data.qrimg;
      await this.loginQR_change();
    },
    async loginQR_change() {
      const res = await useQR_Change(this.QR_Key);
      console.log(res);
      switch (res.code) {
        case 800:
          this.loginQR_image();
        case 801:
        case 802:
          this.QR_Timeout = setTimeout(() => this.loginQR_change(), 800);
          break;
        case 803:
          this.cookie = res.cookie;
          this.token = res.token;
          localStorage.setItem("USER-TOKEN", this.token);
          localStorage.setItem("USER-COOKIE", this.cookie);
          this.checkLogin();
          break;
        default:
          break;
      }
    },
    async QR_clearTimeout() {
      clearTimeout(this.QR_Timeout);
    },
    async login_tourist() {
      const res = await useLoginTourist();
      console.log(res);
      if (res.code == 200) {
        this.token = res.token;
        this.cookie = res.cookie;
        document.cookie = res.cookie;
        localStorage.setItem("USER-TOKEN", this.token);
        localStorage.setItem("USER-COOKIE", this.cookie);
        this.checkLogin();
      }
    },
    async login_Sent(phone: string) {
      const res = await useLoginSent(phone);
      if (res.code == 200) {
        ElMessage.success("发送成功,请查收!!!");
      }
    },
    async login_Verify(phone: string, password: string) {
      const res = await useLoginVerify(phone, password);
      console.log(res);
      if (res.code == 200) {
        this.token = res.token;
        this.cookie = res.cookie;
        for (const iterator of res.cookie.split("HTTPOnly;")) {
          document.cookie = iterator;
        }
        document.cookie = res.cookie;
        localStorage.setItem("USER-TOKEN", this.token);
        localStorage.setItem("USER-COOKIE", this.cookie);
        this.checkLogin();
      }
    },
    async checkLogin() {
      const { data } = await useLoginStatus();
      if (data.code === 200) {
        this.profile = data.profile;
        this.showLogin = false;
      }
    },
    login_after(fun:Function) {
    //   if (!!localStorage.getItem("USER-COOKIE")) {
        if (this.isLogin)
            fun();
            else
            watch(()=>this.isLogin,(newVal,oldVal)=>{
                if (newVal)
                    fun()
            })
    //   } else
    //     useRouter().push("/discover");
    },
  },
});
