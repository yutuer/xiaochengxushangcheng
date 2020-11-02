import {
    DB
} from 'db.js';

let app = getApp()

class YouhuiquanDB extends DB {
    // 更新优惠券缓存值 bool
    updateYouhuiquanCacheUpdateKey(v) {
        if (v) {
            wx.setStorageSync(app.globalData.youhuiquanCacheUpdateKey, v)
        } else {
            wx.removeStorageSync(app.globalData.youhuiquanCacheUpdateKey)
        }
    }

    // 加载数据库中有效期限的优惠券
    loadYouhuiquan() {
        // let youhuiquanCacheUpdateKey = wx.getStorageSync(app.globalData.youhuiquanCacheUpdateKey);
        // if (youhuiquanCacheUpdateKey) {
        //     return
        // }
        //
        // this.updateYouhuiquanCacheUpdateKey(true);

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

            this.saveYouhuiquanToCache(youhuiquanC)
        };
        const fail = (err) => {
            console.error(err)
        };
        this.loadAllDataFromCloudy('queryAllData', 'youhuiquan', suc, fail)
    }

    // 存储优惠券对象到缓存
    saveYouhuiquanToCache(youhuiquanDatas) {
        wx.setStorageSync(app.globalData.youhuiquanKey, youhuiquanDatas)
    }

    // 获取优惠券缓存内容
    getYouhuiquanDataFromCache() {
        return wx.getStorageSync(app.globalData.youhuiquanKey)
    }

    // 在缓存中 是否有足够的数量
    isEnoughInCache(id) {
        let youhuiquanDataFromCache = this.getYouhuiquanDataFromCache();
        let data = youhuiquanDataFromCache.data;
        if (youhuiquanDataFromCache && data) {
            for (let i = 0; i < data.length; i++) {
                let youhuiquan = data[i];
                if (youhuiquan._id == id) {
                    return youhuiquan.leftUseCount > 0;
                }
            }
        }
        return false;
    }

}

export {
    YouhuiquanDB
}