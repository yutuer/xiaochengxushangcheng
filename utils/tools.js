const util = require('util.js');
let app = getApp()

class NumOpera {
  // 点击add按钮
  addClick(cargoid) {
    if (!util.checkLoginStatus()) {
      return
    }

    let findcargoIndex = -1
    let cargos = wx.getStorageSync(app.globalData.cargosKey)
    // 查找
    if (cargos) {
      for (let i = 0; i < cargos.length; i++) {
        let cargo = cargos[i]
        if (cargo.cargoid == cargoid) {
          findcargoIndex = i
          break
        }
      }
    }
    if (findcargoIndex >= 0) {
      let cargo = cargos[findcargoIndex]
      cargo.num += 1
    } else {
      cargos.push({
        cargoid: cargoid,
        num: 1
      })
    }
    wx.setStorageSync(app.globalData.cargosKey, cargos)
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
}

export {
  NumOpera
}