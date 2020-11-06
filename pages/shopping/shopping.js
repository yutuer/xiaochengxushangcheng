// pages/shopping/shopping.js
//引入本地数据
const allCargoDatas = require('../../utils/data/allCargoData.js');
import {
    NumOpera
} from '../../utils/tools.js';

let numOpera = new NumOpera();

import {
    Pay
} from '../../utils/pay.js';

let pay = new Pay();

import {CargoCache} from "../../utils/cargoCache";

const cargoCache = new CargoCache();

import {
    YouhuiquanCache
} from "../../utils/youhuiquanCache";

let youhuiquanCache = new YouhuiquanCache();

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shoppingData: [],
        allIsSelect: false, //全选和全不选
        allPrice: 0.00, // 选中的商品总价格
        allCount: 0, // 选中的商品总个数
        chooseCargos: [], // 结算时候的物品,
        youhuiquan: null,
    },

    // 单击选中选项
    singleSelectClick(e) {
        let cargoId = e.currentTarget.dataset.cargoid;

        // 更新缓存中的选中状态
        let shoppingCargos = cargoCache.getShoppingCargoDataFromCache();
        if (shoppingCargos) {
            let findcargoIndex = -1;
            for (let i = 0; i < shoppingCargos.length; i++) {
                let shoppingCargo = shoppingCargos[i];
                if (shoppingCargo.cargoid == cargoId && shoppingCargo.num > 0) {
                    findcargoIndex = i;
                    break
                }
            }
            if (findcargoIndex >= 0) {
                let cargo = shoppingCargos[findcargoIndex];
                cargo.select = !cargo.select
            }

            cargoCache.saveShoppingCargoDataToCache(shoppingCargos);

            this.updateShow()
        }
    },

    // 全选, 把当前购物车中 数量>0的物品, 全部选中或反选
    allClick() {
        let setSelect = !this.data.allIsSelect;

        let shoppingCargos = cargoCache.getShoppingCargoDataFromCache();
        if (shoppingCargos) {
            for (let i = 0; i < shoppingCargos.length; i++) {
                let shoppingCargo = shoppingCargos[i];
                if (shoppingCargo.num > 0) {
                    shoppingCargo.select = setSelect
                }
            }
        }
        cargoCache.saveShoppingCargoDataToCache(shoppingCargos);

        this.updateShow()
    },

    // 点击结算按钮
    countNumTap(e) {
        console.log("countNumTap:", e);

        const allPrice = e.currentTarget.dataset.allprice;
        const chooseCargos = this.data.chooseCargos;
        const youhuiquan = this.data.youhuiquan;

        pay.countNumTap(allPrice, chooseCargos, youhuiquan)
    },

    // 将2个缓存的数据组合起来, 变成一个新的带有num的对象中
    getNumCargos() {
        let cargosData = [];
        // 所有的商品
        let classData = cargoCache.getSellCargosFromCache();
        // 购买的数量
        let shoppingCargos = cargoCache.getShoppingCargoDataFromCache();

        for (let i = 0; i < classData.length; i++) {
            let sellCargo = classData[i];

            if (shoppingCargos && shoppingCargos.length > 0) {
                for (let i = 0; i < shoppingCargos.length; i++) {
                    let shoppingCargo = shoppingCargos[i];
                    if (shoppingCargo.cargoid == sellCargo.cargoid) {
                        let numcargo = {
                            ...sellCargo,
                            num: shoppingCargo.num
                        };
                        numcargo.select = shoppingCargo.select;
                        cargosData.push(numcargo);
                        break
                    }
                }
            }
        }
        return cargosData;
    },

    //更新显示界面
    updateShow() {
        let allPrice = 0.00;
        let chooseCargos = [];
        let allIsSelect = true;
        let chooseNum = 0;

        let numCargos = this.getNumCargos();

        // 对数据进行初始化修改
        for (var i = 0; i < numCargos.length; i++) {
            // 获取单个商品
            let numCargo = numCargos[i];
            if (numCargo.num > 0) {
                //如果有一个数量大于0 , 但是没有选中, 全选就不亮
                // 所有数量 > 0的都是选中状态, 就是全选
                if (!numCargo.select) {
                    allIsSelect = false
                }
            }

            if (numCargo.select) {
                allPrice += (numCargo.price * 100 * numCargo.num);
                chooseCargos.push(numCargo);

                chooseNum += numCargo.num
            }
        }

        if (chooseCargos.length == 0) {
            allIsSelect = false
        }

        allPrice = allPrice / 100.0;

        // 计算满足的优惠券信息(注意开始时间和结束时间)
        // 满足的优惠券最大钱数
        let maxyouhuiquan = youhuiquanCache.calMaxYouhuiquan(allPrice);

        this.setData({
            shoppingData: numCargos,
            allPrice: allPrice,
            allIsSelect: allIsSelect,
            chooseCargos: chooseCargos,
            allCount: chooseNum,
            youhuiquan: maxyouhuiquan,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("shopping page onLoad");
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
        console.log("shopping page onShow");

        this.updateShow();

        numOpera.redDot();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("shopping  onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("shopping  onUnload")
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
        console.log("shopping plusOnClickFun");

        numOpera.redDot();

        this.updateShow()
    },

    reduceOnClickFun: function (e) {
        console.log("shopping reduceOnClickFun");

        numOpera.redDot();

        this.updateShow()
    },

})