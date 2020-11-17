import {
    NumOpera
} from "../../utils/tools.js"

let numOpera = new NumOpera();

Component({

    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
        },
    },

    /**
     * 组件的属性列表
     */
    properties: {
        // 文本宽度
        textWidth: {
            type: Number,
            width: 100
        },
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
        cargoId: Number,
        plusImg: {
            type: String,
            value: "images/加1.png",
        },
        plusImgShow: {
            type: Boolean,
            value: true
        },
        subImg: {
            type: String,
            value: "images/减1.png",
        },
        // 减号符是否显示
        subImgShow: {
            type: Boolean,
            value: true
        },
        // 数字符号是否显示
        numShow: {
            type: Boolean,
            value: true
        },
        // 显示数字
        showNum: Number,
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        addClick: function (e) {
            numOpera.addClick(this.properties.cargoId);

            this.triggerEvent("plusOnClickEvent", {
                cargoId: this.properties.cargoId
            }, {bubbles: true, composed: true})
        },

        subClick: function (e) {
            numOpera.reduceClick(this.properties.cargoId);

            this.triggerEvent("reduceOnClickEvent", {
                cargoId: this.properties.cargoId
            }, {bubbles: true, composed: true})
        },

    }
});