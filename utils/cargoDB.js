import {
    DB
} from 'db.js';

import {CargoCache} from "./cargoCache";

const cargoCache = new CargoCache();

let app = getApp();

const allCargoDatas = require('data/allCargoData.js');

class CargoDB extends DB {
    // 加载商品
    loadCargos() {
        // let allCargos = allCargoDatas.allDatas;
        // cargoCache.saveSellCargosToCache(allCargos);

        const suc = (res) => {
            let allCargos = res.result.data;
            cargoCache.saveSellCargosToCache(allCargos);
        };
        const fail = (err) => {
            console.error(err)
        };
        this.callFunctionFromCloudy('queryAllData', 'cargo', suc, fail)
    }

    // 加载商品类型
    loadCargoTypes() {
        const suc = (res) => {
            let allCargoTypes = res.result.data;
            cargoCache.saveSellCargoTypesToCache(allCargoTypes);
        };
        const fail = (err) => {
            console.error(err)
        };
        this.callFunctionFromCloudy('queryAllData', 'cargoType', suc, fail)
    }
}

export {
    CargoDB
}