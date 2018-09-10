export default {
    userProfile: {},  
    partQualities: [],
    qualities: {
      qualitiesMap: {}
    },
    wallet: {
        personalCXB: {
            bankCards: []
        },
        enterpriseCXB: {
            epAccountStatus: null,
            relatedAccout: null,
            openStatus: '未开通', // 默认未开通，满足条件后改成true并存储供后续使用
            clientAsset: null, // 总店/单店的企业橙信宝资产信息
        }
     }
}