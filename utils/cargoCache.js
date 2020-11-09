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

    // 检查想要购买的物品的库存
    checkKucun(cargos) {
        for (let i = 0; i < cargos.length; i++) {
            let cargo = cargos[i];
            let cargoInCache = this.findCargo(cargo.cargoid);

            if (!cargoInCache || cargoInCache.storageNum < cargo.num) {
                return {
                    cargoid: cargo.cargoid,
                    cargoName: cargo.title,
                    result: false,
                };
            }
        }
        return {result: true};
    }

    findCargo(id) {
        let sellCargosFromCache = this.getSellCargosFromCache();
        for (let i = 0; i < sellCargosFromCache.length; i++) {
            let cargo = sellCargosFromCache[i];
            if (cargo.cargoid == id) {
                return cargo
            }
        }
        return null
    }
}

export {
    CargoCache
}