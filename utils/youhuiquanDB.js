import {
    DB
} from 'db.js';


import {
    YouhuiquanCache
} from "./youhuiquanCache";

let youhuiquanCache = new YouhuiquanCache();

let app = getApp();

class YouhuiquanDB extends DB {

    // 加载数据库中有效期限的优惠券
    loadYouhuiquan() {
        // let youhuiquanCacheUpdateKey = wx.getStorageSync(app.globalData.youhuiquanCacheUpdateKey);
        // if (youhuiquanCacheUpdateKey) {
        //     return
        // }
        //
        // this.updateYouhuiquanCacheUpdateKey(true);

        console.log("func:loadYouhuiquan");

        let now = Date.parse(new Date());
        const suc = (res) => {
            let datas = res.result.data;
            let nowValids = [];

            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                if (now < data.endTime && data.leftUseCount > 1) {
                    nowValids.push(data)
                }
            }

            const youhuiquanC = {
                data: nowValids,
            };

            youhuiquanCache.saveYouhuiquanToCache(youhuiquanC);
        };
        const fail = (err) => {
            console.error("func:loadYouhuiquan, err:", err);
        };

        this.callFunctionFromCloudy('queryAllData', 'youhuiquan', suc, fail);
    }

    subYouhuiquanNum(youhuiquan, num) {
        let data = {
            dbName: 'youhuiquan',
            cond: youhuiquan._id,
            dataObj: {
                num: num
            }
        };

        const suc = (res) => {
            console.log("func:subYouhuiquanNum, res:", res);
        };

        const fail = (err) => {
            console.error("func:subYouhuiquanNum, err:", err);
        };

        this.callFunctionFromCloudyByCond('updateYouhuiquanNum', data, suc, fail);
    }
}

export {
    YouhuiquanDB
}