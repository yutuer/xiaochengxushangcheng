class DB {
    // 加载云端数据
    callFunctionFromCloudy(funName, dbName, successFun, failFun) {
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

    // 加载云端数据
    callFunctionFromCloudyByCond(funName, cond, successFun, failFun) {
        wx.cloud.callFunction({
            name: funName,
            data: {
                ...cond,
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