let app = getApp()

class CargoCache {

    // 从缓存中获取购物车数据
    getShoppingCargoDataFromCache() {
        return wx.getStorageSync(app.globalData.cargosKey)
    }

    // 存储购物车缓存数据
    saveShoppingCargoDataToCache(cargoCache) {
        wx.setStorageSync(app.globalData.cargosKey, cargoCache)
    }

    saveSellCargosToCache(allCargos) {
        wx.setStorageSync(app.globalData.allSellItemKey, allCargos)
    }

    getSellCargosFromCache() {
        return wx.getStorageSync(app.globalData.allSellItemKey)
    }

    saveSellCargoTypesToCache(allCargos) {
        wx.setStorageSync(app.globalData.allSellItemTypeKey, allCargos)
    }

    getSellCargoTypesFromCache() {
        return wx.getStorageSync(app.globalData.allSellItemTypeKey)
    }
}

export {
    CargoCache
}