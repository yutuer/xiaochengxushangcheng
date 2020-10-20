import {
    NumOpera
} from "../../utils/tools.js"

let numOpera = new NumOpera()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgSrc: String,
        price: Number,
        txt: String,
        cargoId: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        clickPlus() {
            let cargoId = this.properties.cargoId
            numOpera.addClick(cargoId)
        }
    }
})