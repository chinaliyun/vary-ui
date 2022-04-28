<template>
  <div class="v_sms_code">
    <Button
      primary
      :disabled="!validateMobile(mobile) || !smsAllowSend"
      @click="getSmsCode"
    >
      {{
        smsAllowSend
          ? smsResolved
            ? "重新获取验证码"
            : "获取验证码 "
          : timer + "s后重新获取"
      }}
    </Button>
  </div>
</template>
<script>
import { validateMobile } from "../../../utils"; // 验证码倒计时的定时器
import Button from "../../Button";
let timer = null;
export default {
  name: "AdmSmscode",
  components: {
    Button,
  },
  props: {
    range: {
      type: Number,
      default: 60,
    },
    mobile: {
      type: [String, Number],
      default: "",
      required: true,
    },
    api: {
      type: Function,
      required: true,
      default() {},
    },
  },
  data() {
    return {
      timer: 0, // 验证码倒计时
      smsAllowSend: true, // 是否允许发送验证码
      smsResolved: false, // 是否已经发送过验证码
      smsLoading: false,
    };
  },
  methods: {
    validateMobile,
    reset() {
      this.smsAllowSend = true;
      this.smsResolved = false;
      this.smsLoading = false;
    },
    async getSmsCode() {
      if (!this.smsAllowSend) {
        return;
      }
      this.smsLoading = true;
      try {
        await this.api({
          phone: this.mobile,
        });
        this.timer = this.range;
        this.smsResolved = true;
        this.smsAllowSend = false;
        timer = setInterval(() => {
          if (this.timer === 0) {
            clearInterval(timer);
            this.smsAllowSend = true;
            this.timer = null;
          } else {
            this.timer--;
          }
        }, 1000);
        this.$emit("success");
      } catch (e) {
        console.log(e);
        this.$emit("error", e.msg);
      } finally {
        this.smsLoading = false;
      }
    },
  },
};
</script>
