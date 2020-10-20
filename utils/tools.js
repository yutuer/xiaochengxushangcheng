const util = require('util.js');
let app = getApp()

class NumOpera {
    // 点击add按钮
    addClick(cargoId) {
        if (!util.checkLoginStatus()) {
            return
        }

        let findCargoIndex = -1
        let cargoCache = wx.getStorageSync(app.globalData.cargosKey)
        // 查找
        if (cargoCache) {
            for (let i = 0; i < cargoCache.length; i++) {
                let cargo = cargoCache[i]
                if (cargo.cargoid == cargoId) {
                    findCargoIndex = i
                    break
                }
            }
        }
        if (findCargoIndex >= 0) {
            let cargo = cargoCache[findCargoIndex]
            cargo.num += 1
        } else {
            cargoCache.push({
                cargoid: cargoId,
                num: 1
            })
        }
        wx.setStorageSync(app.globalData.cargosKey, cargoCache)
    }

    // 点击 减 按钮
    reduceClick(cargoid) {
        if (!util.checkLoginStatus()) {
            return
        }

        let findcargoIndex = -1
        let cargoCache = wx.getStorageSync(app.globalData.cargosKey)
        // 查找
        if (cargoCache) {
            for (let i = 0; i < cargoCache.length; i++) {
                let cargo = cargoCache[i]
                if (cargo.cargoid == cargoid && cargo.num > 0) {
                    findcargoIndex = i
                    break
                }
            }
        }
        if (findcargoIndex >= 0) {
            let cargo = cargoCache[findcargoIndex]
            cargo.num -= 1
            if (cargo.num == 0) {
                // 如果减到0 , 去掉选中状态
                cargo.select = false
                // 从cargoCache中移除
                cargoCache.splice(findcargoIndex, 1)
            }
        }
        wx.setStorageSync(app.globalData.cargosKey, cargoCache)
    }

    redDot() {
        let cargoCache = wx.getStorageSync(app.globalData.cargosKey)
        if (cargoCache && cargoCache.length > 0) {
            wx.showTabBarRedDot({index: 2})
        } else {
            wx.hideTabBarRedDot({index: 2})
        }
    }
}

export {
    NumOpera
}