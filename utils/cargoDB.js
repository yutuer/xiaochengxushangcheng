import {
    DB
} from 'db.js';

import {CargoCache} from "./cargoCache";

const cargoCache = new CargoCache()

let app = getApp()

const allCargoDatas = require('data/allCargoData.js')


class CargoDB extends DB {
    // 加载商品
    loadCargos() {
        let allCargos = allCargoDatas.allDatas
        cargoCache.saveSellCargosToCache(allCargos)

        // const suc = (res) => {
        //     let allCargos = res.result.data
        //     wx.setStorageSync(app.globalData.allSellItemKey, allCargos)
        // }
        // const fail = (err) => {
        //     console.error(err)
        // }
        // this.loadAllDataFromCloudy('queryAllData', 'cargo', suc, fail)
    }

    // 加载商品类型
    loadCargoTypes() {
        let allCargoTypes = allCargoDatas.typeArray
        cargoCache.saveSellCargoTypesToCache(allCargoTypes)

        // const suc = (res) => {
        //     let allCargos = res.result.data
        //     wx.setStorageSync(app.globalData.allSellItemTypeKey, allCargos)
        // }
        // const fail = (err) => {
        //     console.error(err)
        // }
        // this.loadAllDataFromCloudy('queryAllData', 'cargo', suc, fail)
    }
}

export {
    CargoDB
}