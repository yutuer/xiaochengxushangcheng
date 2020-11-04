// pages/cargodetail/cargodetail.js
let allCargosData = require('../../utils/data/allCargoData.js');
import {
    NumOpera
} from "../../utils/tools.js"

let numOpera = new NumOpera()
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {},
        leftTime: 30,
    },

    addClick(e) {
        const cargoid = e.currentTarget.dataset.cargoid
        console.log(cargoid)

        let findcargoIndex = -1
        let cargos = wx.getStorageSync(app.globalData.cargosKey)
        console.log(cargos)
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("cargoDetail page onLoad");

        let cargoid = options.cargoid;
        // 遍历查找数据
        let cargodatas = allCargosData.allDatas;
        for (let i = 0; i < cargodatas.length; i++) {
            let cargo = cargodatas[i];
            if (cargo && cargo.cargoid == cargoid) {
                this.setData({
                    item: cargo
                });
                break
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("cargoDetail  onShow")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("cargoDetail  onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("cargoDetail  onUnLoad")
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
});