let app = getApp();

class OrderCache {

    saveOrdersToCache(allOrders) {
        wx.setStorageSync(app.globalData.ordersKey, allOrders)
    }

    getOrdersFromCache() {
        return wx.getStorageSync(app.globalData.ordersKey)
    }
}

export {
    OrderCache
}