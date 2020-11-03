let app = getApp()

// 优惠券缓存
class YouhuiquanCache {

    // 更新优惠券缓存值 bool
    updateYouhuiquanCacheUpdateKey(v) {
        if (v) {
            wx.setStorageSync(app.globalData.youhuiquanCacheUpdateKey, v)
        } else {
            wx.removeStorageSync(app.globalData.youhuiquanCacheUpdateKey)
        }
    }

    // 存储优惠券对象到缓存
    saveYouhuiquanToCache(youhuiquanDatas) {
        wx.setStorageSync(app.globalData.youhuiquanKey, youhuiquanDatas)
    }

    // 获取优惠券缓存内容
    getYouhuiquanDataFromCache() {
        return wx.getStorageSync(app.globalData.youhuiquanKey)
    }

    // 在缓存中某个优惠券 是否有足够的数量
    isEnoughInCache(id) {
        let youhuiquanDataFromCache = this.getYouhuiquanDataFromCache();
        let data = youhuiquanDataFromCache.data;
        if (youhuiquanDataFromCache && data) {
            for (let i = 0; i < data.length; i++) {
                let youhuiquan = data[i];
                if (youhuiquan._id == id) {
                    return this.isYouhuiquanValid(youhuiquan);
                }
            }
        }
        return false;
    }

    isYouhuiquanValid(youhuiquan) {
        let now = Date.parse(new Date());
        return youhuiquan.startTime < now && now < youhuiquan.endTime && youhuiquan.leftUseCount > 2;
    }

    // 计算最大优惠券
    calMaxYouhuiquan(totalPrice) {
        let maxyouhuiquan = null;
        let youhuiquans = this.getYouhuiquanDataFromCache();
        if (!youhuiquans) {
            return;
        }

        if (youhuiquans.data && youhuiquans.data.length > 0) {
            for (let i = 0; i < youhuiquans.data.length; i++) {
                let youhuiquan = youhuiquans.data[i];
                if (totalPrice >= youhuiquan.needMoney) {
                    if (!this.isYouhuiquanValid(youhuiquan)) {
                        return
                    }
                    if (maxyouhuiquan == null) {
                        maxyouhuiquan = youhuiquan;
                    } else {
                        // 这是个更大额度的优惠券
                        if (youhuiquan.needMoney > maxyouhuiquan.needMoney) {
                            maxyouhuiquan = youhuiquan;
                        }
                    }
                }
            }
        }
        return maxyouhuiquan;
    }

}

export {
    YouhuiquanCache
}