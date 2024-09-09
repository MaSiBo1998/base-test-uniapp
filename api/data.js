import {
    request
} from '@/util/request.js'

export const upload = (data) => request({
    url: '/gPjkvSR/wTcEL/hcXjEmWLOmIj/xPVTBzbCl',
    method: 'POST',
    data: {
        uuid: '9c3e5cda7efe455e99a5a212b38f0e34',
        deviceID: uni.getSystemInfoSync().deviceId,
        token: 'd30e1161328e4bd1a383e719a8493030',
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
        contactMobile: '1111222223',
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
export const live = (data) => request({
    url: '/SJRdDQj/WlkEdp/mvRvmieD/xgnKTFRJWE',
    method: 'POST',
    data: {
        uuid: 'd8c79056b21646418caf3f398be994ef',
        token: '2ee1067c1127440cae04c5fd6a87ba0c',
        ufcs:data.ufcs,
        imcs:data.imcs,
        liveSlinger: 'brainf',
        slinger:'advance',
        actionCode:'1',
        deviceOS: 'P1001',
        i18n: 'zh_CN',
        reqSource: 'Android',
        phoneName: uni.getSystemInfoSync().brand,
        appVersion: '1.0.0',
        androidversion: '14.1',
        webVersion: 'H5_A',
        deviceID: uni.getSystemInfoSync().deviceId,
    }
})
export const beforeLive = (data) => request({
    url: '/SJRdDQj/WlkEdp/mvRvmieD/qdhskjK',
    method: 'POST',
    data: {
        uuid: 'd8c79056b21646418caf3f398be994ef',
        token: 'b748400f16cc4a7e93c31c00dfc3eb5f'
    }
})