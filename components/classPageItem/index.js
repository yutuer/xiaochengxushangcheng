import {NumOpera} from "../../utils/tools.js"
let numOpera = new NumOpera()

// components/classPageItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    desc: {
      type: String
    },
    price: {
      type: Number
    },
    imgSrc: {
      type: String
    },
    cargoId: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addClick(e) {
        numOpera.addClick(this.properties.cargoId)
    }
  }
})