const app = getApp()

class Pay {
  // 点击结算按钮
  countNumTap(allPrice, chooseCargos, youhuiquan) {
    if (chooseCargos.length == 0) {
      wx.showToast({
        title: '请选择购买物品',
      })
      return
    }

    let priceObj = {
      allPrice: allPrice,
      cargos: chooseCargos,
      youhuiquan: youhuiquan,
    }

    let s = encodeURIComponent(JSON.stringify(priceObj))
    wx.navigateTo({
      url: '/pages/ordering/ordering?orderDetail=' + s,
    })
  }
}

export {
  Pay
}