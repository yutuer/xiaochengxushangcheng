import {
    NumOpera
} from "../../utils/tools.js"

let numOpera = new NumOpera();

import {
    CargoCache
} from "../../utils/cargoCache";

const cargoCache = new CargoCache();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: Number,
        pic: String,

        // 图片宽度
        imgWidth: {
            type: Number,
            value: 40,
        },
        //图片高度
        imgHeight: {
            type: Number,
            value: 40,
        },

        // 文本宽度
        textFont: {
            type: Number,
            value: 100
        },

        cargoId: Number,
    },

    ready: function () {
        let cargoId = this.properties.cargoId;
        let count = cargoCache.getShoppingCargoNum(cargoId);
        this.setData({
            count: count,
        });
    },
    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        add: function (e) {
            let cargoId = this.properties.cargoId;
            numOpera.addClick(cargoId);
            let count = cargoCache.getShoppingCargoNum(cargoId);
            this.setData({
                count: count,
            });

            this.triggerEvent('like', {
                cargoId: cargoId,
            });
        },
    }
});
