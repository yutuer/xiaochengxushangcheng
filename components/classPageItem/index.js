import {
  NumOpera
} from "../../utils/tools.js"
let numOpera = new NumOpera()

// components/classPageItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 整体高度
    heightRange: {
      type: Number,
      value: 180
    },
    // 描述
    desc: {
      type: String
    },
    // 价格显示
    price: {
      type: Number
    },
    // 物品id
    cargoId: {
      type: Number,
      value: 100
    },
    //图片链接
    imgSrc: {
      type: String
    },
    // 图片宽度
    imgWidth: {
      type: Number,
      value: 200
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
    showNum: {
      type: Number,
      value: 0
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
    plusOnClickFunc(e){
      console.log(e);
      
      numOpera.addClick(e.detail.cargoId)
    }
  }
})