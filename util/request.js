export const baseURL = 'http://mx-app-tgwb1.daikuns.com:8080' //test
// main 
export const request = (options) => {
    return new Promise((resolve, reject) => {

        uni.request({
            url: baseURL + options.url,
            method: 'POST',
            data: options.data,
            header: {
                'content-type': 'application/json;',
                'ownerShip': 'tgwb1',
                'encrypted': 0,
                'encryptType': 0,
                'disturbedUrl': 0,
                'disturbedPar':1
            },
            success: (res) => {
                console.log(options.data)
                 resolve(res.data)
            },
            // 
            fail: (err) => {
                reject(err)
            }
        })
    })
}
