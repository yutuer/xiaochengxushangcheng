const util = require('util.js');
const verify = require('verify.js');
let app = getApp()

class DB {
    // 加载云端数据
    loadAllDataFromCloudy(funName, dbName, successFun, failFun) {
        wx.cloud.callFunction({
            name: funName,
            data: {
                dbName: dbName,
            },
            success: (res) => {
                if (successFun) {
                    successFun(res)
                }
            },
            fail: (err) => {
                if (failFun) {
                    failFun(err)
                }
            }
        })
    }
}

export {
    DB
}