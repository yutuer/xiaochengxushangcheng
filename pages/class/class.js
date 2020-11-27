// pages/class/class.js
//引入本地数据
let classData = require('../../utils/data/classData.js');
const util = require('../../utils/util.js');

import {
    NumOpera
} from '../../utils/tools.js';

let numOpera = new NumOpera();

import {
    CargoCache
} from "../../utils/cargoCache";

const cargoCache = new CargoCache();

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 标题数据
        titleArray: [],
        content: [],
        selectType: 1,
    },

    upper(e) {
        console.log(e)
    },
    lower(e) {
        console.log(e)
    },

    // 根据当前点击对象, 设置数据
    updateOriginDatas(type) {
        // 显示数组
        let contentArr = [];
        // 所有数据
        let allDatas = cargoCache.getSellCargosFromCache();
        for (let i = 0; i < allDatas.length; i++) {
            let data = allDatas[i];
            if (data.type == type) {
                contentArr.push(data)
            }
        }

        // 设置当前选中的下标
        this.setData({
            content: contentArr,
            selectType: type
        })
    },

    // 点击了分类查看
    titleViewClick(e) {
        console.log(e);
        var type = e.currentTarget.dataset.index + 1;

        this.updateOriginDatas(type)
    },

    // 点击了查看详情
    cargoDetailTap(e) {
        // console.log(e)
        const cargoid = e.currentTarget.dataset.cargoid;
        // 跳转详情页
        wx.navigateTo({
            url: '../cargodetail/cargodetail?cargoid=' + cargoid,
        })
    },

    // 点击了加(目前是放进购物车的意思)
    addClick(e) {
        if (!util.checkLoginStatus()) {
            return
        }

        const cargoid = e.currentTarget.dataset.cargoid;
        console.log(cargoid);

        let findcargoIndex = -1;
        let cargos = wx.getStorageSync(app.globalData.cargosKey);
        console.log(cargos);
        // 查找
        if (cargos) {
            for (let i = 0; i < cargos.length; i++) {
                let cargo = cargos[i];
                if (cargo.cargoid == cargoid) {
                    findcargoIndex = i;
                    break
                }
            }
        }
        if (findcargoIndex >= 0) {
            let cargo = cargos[findcargoIndex];
            cargo.num += 1
        } else {
            cargos.push({
                cargoid: cargoid,
                num: 1
            })
        }
        wx.setStorageSync(app.globalData.cargosKey, cargos);
        wx.showToast({
            title: '添加成功',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("class Page onLoad");

        let cargoTypes = cargoCache.getSellCargoTypesFromCache();

        this.setData({
            typeArray: cargoTypes,
        })
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
        console.log("class Page onShow");
        let switchType = app.globalData.switchType;
        this.updateOriginDatas(switchType);
        app.globalData.switchType = 1
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("class Page onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("class Page onUnload")
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

    plusOnClickFun: function (e) {
        console.log("class page plusOnClickFun");
        numOpera.redDot()
    },
});