let app = getApp();

class CargoCache {

    // 从缓存中获取购物车数据
    getShoppingCargoDataFromCache() {
        return wx.getStorageSync(app.globalData.cargosKey)
    }

    // 存储购物车缓存数据
    saveShoppingCargoDataToCache(cargoCache) {
        wx.setStorageSync(app.globalData.cargosKey, cargoCache)
    }

    // 所有商品
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

    getShoppingCargoNum(cargoId) {
        let shoppingCargoDataFromCache = this.getShoppingCargoDataFromCache();
        for (let i = 0; i < shoppingCargoDataFromCache.length; i++) {
            let cargo = shoppingCargoDataFromCache[i];
            if (cargo.cargoid == cargoId) {
                return cargo.num;
            }
        }
        return 0;
    }

    findSellCargosByKeyword(keyword) {
        let ret = [];
        if (keyword) {
            let sellCargosFromCache = this.getSellCargosFromCache();
            for (let i = 0; i < sellCargosFromCache.length; i++) {
                let cargo = sellCargosFromCache[i];
                if (cargo.title.indexOf(keyword) != -1) {
                    ret.push(cargo);
                }
            }
        }

        if (ret.length == 0) {
            ret = this.notFindRandomCargos();
        }
        return ret;
    }

    // 没有找到关键字, 随机返回
    notFindRandomCargos() {
        let ret = [];
        let retNum = 3;
        let sellCargosFromCache = this.getSellCargosFromCache();
        for (let i = 0; i < sellCargosFromCache.length; i++) {
            let cargo = sellCargosFromCache[i];

            if (Math.random() > 0.5) {
                ret.push(cargo);
            }

            if (ret.length >= retNum) {
                break;
            }
        }
        return ret;
    }

    // 检查想要购买的物品的库存
    checkKucun(cargos) {
        let names = [];
        let desc = [];
        for (let i = 0; i < cargos.length; i++) {
            let cargo = cargos[i];
            let cargoInCache = this.findSellCargo(cargo.cargoid);

            if (!cargoInCache || cargoInCache.storageNum < cargo.num) {
                names.push(cargo.title);
                desc.push(cargo.title + " 剩余" + cargoInCache.storageNum + "个");
            }
        }

        if (names.length > 0) {
            return {
                errMsg: "没有足够的物品.当前" + desc.join(","),
                result: false,
            };
        }

        return {result: true};
    }

    // 从全部商品中找到id的对象
    findSellCargo(id) {
        let sellCargosFromCache = this.getSellCargosFromCache();
        for (let i = 0; i < sellCargosFromCache.length; i++) {
            let cargo = sellCargosFromCache[i];
            if (cargo.cargoid == id) {
                return cargo
            }
        }
        return null
    }

    // 删除购物车中物品
    deleteShoppingCargo(id) {
        let index = -1;
        let shoppingCargoData = this.getShoppingCargoDataFromCache();
        for (let i = 0; i < shoppingCargoData.length; i++) {
            let cargo = shoppingCargoData[i];
            if (cargo.cargoid == id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            shoppingCargoData.splice(index, 1);

            this.saveShoppingCargoDataToCache(shoppingCargoData);
        }
    }

}

export {
    CargoCache
}