import {
    DB
} from 'db.js';

import {
    CargoCache
} from "cargoCache.js";

const cargoCache = new CargoCache();

class CargoDB extends DB {
    // 加载商品
    loadCargos() {
        // let allCargos = allCargoDatas.allDatas;
        // cargoCache.saveSellCargosToCache(allCargos);

        const suc = (res) => {
            console.log("func:loadCargos, res:", res);

            let allCargos = res.result.data;
            cargoCache.saveSellCargosToCache(allCargos);
        };
        const fail = (err) => {
            console.error("func:loadCargos, err:", err);
        };
        this.callFunctionFromCloudy('queryAllData', 'cargo', suc, fail)
    }

    // 加载商品类型
    loadCargoTypes() {
        const suc = (res) => {
            console.log("func:loadCargoTypes, res:", res);

            let allCargoTypes = res.result.data;
            allCargoTypes.sort(function (a, b) {
                return a.type - b.type;
            });

            cargoCache.saveSellCargoTypesToCache(allCargoTypes);
        };
        const fail = (err) => {
            console.error("func:loadCargoTypes, err:", err);
        };
        this.callFunctionFromCloudy('queryAllData', 'cargoType', suc, fail)
    }

    subCargoUseCount(cargos) {
        console.log("func:loadCargoTypes, cargos:", cargos);

        if (cargos) {
            for (let i = 0; i < cargos.length; i++) {
                let cargo = cargos[i];
                this.subCargosNum({id: cargo._id, num: cargo.num});
            }
        }
    }

    addCargoUseCount(cargos) {
        console.log("func:addCargoUseCount, cargos:", cargos);

        if (cargos) {
            for (let i = 0; i < cargos.length; i++) {
                let cargo = cargos[i];
                this.addCargosNum({id: cargo._id, num: cargo.num});
            }
        }
    }

    subCargosNum(cargo) {
        console.log("func:subCargosNum, cargos:", cargos);

        let data = {
            dbName: 'cargo',
            cond: cargo.id,
            dataObj: {
                num: cargo.num,
            }
        };

        const suc = (res) => {
            console.log("func:subCargosNum, res:", res);
        };

        const fail = (err) => {
            console.error("func:subCargosNum, err:", err);
        };

        this.callFunctionFromCloudyByCond('updateOneCargoNum', data, suc, fail);
    }

    addCargosNum(cargo) {
        console.log("func:addCargosNum, cargo:", cargo);

        let data = {
            dbName: 'cargo',
            cond: cargo.id,
            dataObj: {
                num: cargo.num * -1,
            }
        };

        const suc = (res) => {
            console.log("func:addCargosNum, res:", res);
        };

        const fail = (err) => {
            console.error("func:addCargosNum, err:", err);
        };

        this.callFunctionFromCloudyByCond('updateOneCargoNum', data, suc, fail);
    }
}

export {
    CargoDB
}