const util = require('util.js');
const verify = require('verify.js');

import {CargoCache} from "./cargoCache";

const cargoCache = new CargoCache();

let app = getApp();

class NumOpera {
    // 点击add按钮
    addClick(cargoId) {
        if (!util.checkLoginStatus()) {
            return
        }

        let findCargoIndex = -1;
        let cargos = cargoCache.getShoppingCargoDataFromCache();
        // 查找
        if (cargos) {
            for (let i = 0; i < cargos.length; i++) {
                let cargo = cargos[i];
                if (cargo.cargoid == cargoId) {
                    findCargoIndex = i;
                    break
                }
            }
        } else {
            cargos = [];
        }

        if (findCargoIndex >= 0) {
            let cargo = cargos[findCargoIndex];
            cargo.num += 1;
        } else {
            cargos.push({
                cargoid: cargoId,
                num: 1
            });
        }
        cargoCache.saveShoppingCargoDataToCache(cargos);

        verify.showToast("添加成功,请到购物车查看")
    }

    // 点击 减 按钮
    reduceClick(cargoid) {
        if (!util.checkLoginStatus()) {
            return
        }

        let findcargoIndex = -1;
        let cargos = cargoCache.getShoppingCargoDataFromCache();
        // 查找
        if (cargos) {
            for (let i = 0; i < cargos.length; i++) {
                let cargo = cargos[i];
                if (cargo.cargoid == cargoid && cargo.num > 0) {
                    findcargoIndex = i;
                    break
                }
            }

            if (findcargoIndex >= 0) {
                let cargo = cargos[findcargoIndex];
                cargo.num -= 1;
                if (cargo.num == 0) {
                    // 如果减到0 , 去掉选中状态
                    cargo.select = false;
                    // 从cargoCache中移除
                    cargos.splice(findcargoIndex, 1)
                }
            }
            cargoCache.saveShoppingCargoDataToCache(cargos)
        }
    }

    redDot() {
        let cargos = cargoCache.getShoppingCargoDataFromCache();
        if (cargos && cargos.length > 0) {
            wx.setTabBarBadge({
                index: 2,
                text: cargos.length + '',
            })
        } else {
            wx.removeTabBarBadge({index: 2})
        }
    }
}

export {
    NumOpera
}