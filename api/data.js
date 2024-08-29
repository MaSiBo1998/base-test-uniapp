import {
    request
} from '@/util/request.js'

export const upload = (data) => request({
    url: '/gPjkvSR/wTcEL/hcXjEmWLOmIj/xPVTBzbCl',
    method: 'POST',
    data: {
        uuid: '9c3e5cda7efe455e99a5a212b38f0e34',
        deviceID: uni.getSystemInfoSync().deviceId,
        token: '6559a5de897a4cfba10dfc66b9221308',
        uploadType: data.uploadType,
        jsonPayload: data.jsonPayload,
        isUploaded: '',
        i18n: 'zh_CN',
        reqSource: 'Android',
        phoneName: uni.getSystemInfoSync().brand,
        appVersion: '1.0.0',
        androidversion: '14.1',
        ownerShip: 'tgwb1',
        webVersion: 'H5_A'
    }
})
export const test = (data) => request({
    url: '/MLOVMyOLxSWb/ddfzGV/IzISHNlrcM/wWeejKXsf',
    method: 'POST',
    data: {
        deviceID: '9c3e5cda7efe455e99a5a212b38f0e34',
        telMobile: '1111222222',
        i18n: 'zh_CN',
        reqSource: 'Android',
        phoneName: 'vivo',
        appVersion: '1.0.0',
        androidversion: '14.1',
        ownerShip: 'tgwb1',
        webVersion: 'H5_A',
        file:data.file
    }
})
export const login = (data) => request({
    url: '/MLOVMyOLxSWb/ddfzGV/IzISHNlrcM/pVxouuRVD',
    method: 'POST',
    data: {
        contactMobile: '1111222222',
        captchaCode: '1234',
        deviceOS: 'P1001',
        i18n: 'zh_CN',
        reqSource: 'Android',
        phoneName: uni.getSystemInfoSync().brand,
        appVersion: '1.0.0',
        androidversion: '14.1',
        webVersion: 'H5_A',
        deviceID: uni.getSystemInfoSync().deviceId,
        // ownerShip: 'tgwb1',
    }
})