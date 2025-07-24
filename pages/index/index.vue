<template>
  <view>
    <button @click="getSystem()">获取系统信息</button>
    <button @click="getDeviceInfo()">获取设备信息</button>
    <button @click="getDianLiang()">获取手机型号</button>
    <button @click="getNetWork()">获取网络信息</button>
    <button @click="tryOpenApp">打开App</button>
    <iframe :src="url"></iframe>
    <view class=""> {{ test }}----------------{{ test1 }} </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      test: "",
      test1: "",
      CONFIG: {
        iosScheme: "com.example.app://", // 替换成你的 iOS 应用 URL
        iosDownload: "https://apps.apple.com/app/example-app-id", // 替换成你的 iOS 下载页面 URL
        androidScheme: "com.example.app://", // 替换成你的 Android 应用 URL
        androidDownload:
          "https://play.google.com/store/apps/details?id=com.example.app", // 替换成你的 Android 下载页面 URL
      },
      url:''
    };
  },
  methods: {
    openApp() {},
    tryOpenApp() {
        this.url = "weixin://"
    //   var start = Date.now();
    //   window.location.href = "weixin://"; // 替换为你的App Scheme
    //   setTimeout(() => {
    //     if (Date.now() - start < 2100) {
    //       // 未安装App
    //       alert("未检测到App，可前往App Store下载");
    //       // 或 window.location.href = 'https://apps.apple.com/app/你的app-id';
    //     } else {
    //       alert("已安装");
    //     }
    //   }, 2000);
    },
    getSystem() {
      this.test = uni.getSystemInfoSync();
    },
    getDeviceInfo() {
      this.test = uni.getDeviceInfo();
    },
    getDianLiang() {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      console.log(gpu);
      this.test = gpu;
      this.test1 = this.detectIPhoneModel();
    },
    detectIPhoneModel() {
      const width = uni.getSystemInfoSync().screenWidth; // 逻辑宽度(pt)
      const height = uni.getSystemInfoSync().screenHeight; // 逻辑高度(pt)
      const dpr = window.devicePixelRatio; // 缩放因子

      const modelMap = {
        "320*480*1": "iPhone 2G/3G/3GS",
        "320*480*2": "iPhone 4/4S",
        "320*568*2": "iPhone 5/5s/SE(初代)",
        "375*667*2": "iPhone 6/7/8/SE(二代)",
        "414*736*3": "iPhone 6/7/8 Plus",
        "375*812*3": "iPhone X/XS/11 Pro",
        "414*896*2": "iPhone XR/11",
        "414*896*3": "iPhone XS Max/11 Pro Max",
        "360*780*3": "iPhone 12/13 mini",
        "390*844*3": "iPhone 12/13/14(标准版)",
        "428*926*3": "iPhone 12/13 Pro Max/14 Plus",
        "393*852*3": "iPhone 14 Pro/15/15 Pro",
        "430*932*3": "iPhone 14 Pro Max/15 Pro Max",
        "402*874*3": "iPhone 16 Pro",
        "440*956*3": "iPhone 16 Pro Max",
      };
      this.test = `${width}*${height}*${dpr}`;
      return modelMap[`${width}*${height}*${dpr}`] || "Unknown iPhone";
    },
    getNetWork() {
      uni.getNetworkType({
        success: function (res) {
          this.test = res;
        },
        complete(res) {
          this.test1 = res;
        },
      });
    },
  },
};
</script>

<style>
button {
  display: block;
  margin: 20px auto;
}
</style>
