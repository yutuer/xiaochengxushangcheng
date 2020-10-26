const app = getApp()
let verify = require("verify.js")

class Pay {
    // 点击结算按钮
    countNumTap(allPrice, chooseCargos, youhuiquan, order) {
        if (chooseCargos.length == 0) {
            verify.showToast('请选择购买物品')
            return
        }

        let priceObj = {
            allPrice: allPrice,
            cargos: chooseCargos,
            youhuiquan: youhuiquan,
            order: order
        }

        const s = encodeURIComponent(JSON.stringify(priceObj))
        wx.navigateTo({
            url: `/pages/prePay/prePay?orderDetail=${s}`,
        })
    }

    // 开始支付  TODO 修改, 暂时使用prepay里面的
    payStart(money) {
        let that = this
        const allPrice = this.data.orderDetail.allPrice
        const cargos = this.data.orderDetail.cargos
        const youhuiquan = this.data.orderDetail.youhuiquan

        let address = that.data.address
        // 订单号
        let orderNo = that.genOrderNo()

        // let nonceStr = that.nonceStr()

        let dataSend = {
            money: money,
            // nonceStr: nonceStr,
            order: orderNo,
        }
        console.log("dataSend:", dataSend)
        // 小程序代码
        wx.cloud.callFunction({
            name: 'paystart',
            data: {
                ...dataSend
            },
            success: res => {
                const payment = res.result.payment
                console.log("payment:", payment);

                // 插入数据库
                that.insertPaymentToDB(orderNo, address, cargos, payment, allPrice, youhuiquan)
                // 缓存设置为无效
                that.updateCache()
                // 清除掉购物车中所有选择的物品
                that.removeCargosBuy()
                // 轮询处理支付
                util.payForPayment(orderNo, payment, youhuiquan)
            },
            fail: console.error,
        })
    }

}

export {
    Pay
}