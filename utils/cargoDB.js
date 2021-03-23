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
            allCargoTypes.sort(function (a, b) {
                return a.type - b.type;
            });

            cargoCache.saveSellCargoTypesToCache(allCargoTypes);
        };
        const fail = (err) => {
            console.error(err)
        };
        this.callFunctionFromCloudy('queryAllData', 'cargoType', suc, fail)
    }

    subCargoUseCount(cargos) {
        if (cargos) {
            for (let i = 0; i < cargos.length; i++) {
                let cargo = cargos[i];
                this.subCargosNum({id: cargo._id, num: cargo.num});
            }
        }
    }

    addCargoUseCount(cargos) {
        if (cargos) {
            for (let i = 0; i < cargos.length; i++) {
                let cargo = cargos[i];
                this.addCargosNum({id: cargo._id, num: cargo.num});
            }
        }
    }

    subCargosNum(cargo) {
        let data = {
            dbName: 'cargo',
            cond: cargo.id,
            dataObj: {
                num: cargo.num,
            }
        };

        const suc = (res) => {
            console.log(res)
        };

        const fail = (err) => {
            console.error(err)
        };

        this.callFunctionFromCloudyByCond('updateOneCargoNum', data, suc, fail);
    }

    addCargosNum(cargo) {
        let data = {
            dbName: 'cargo',
            cond: cargo.id,
            dataObj: {
                num: cargo.num * -1,
            }
        };

        const suc = (res) => {
            console.log(res)
        };

        const fail = (err) => {
            console.error(err)
        };

        this.callFunctionFromCloudyByCond('updateOneCargoNum', data, suc, fail);
    }
}

export {
    CargoDB
}