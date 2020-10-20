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
        desc: String,
        // 价格显示
        price: Number,
        // 物品id
        cargoId: Number,
        //图片链接
        imgSrc: String,
        // 图片宽度
        imgWidth: {
            type: Number,
            value: 200
        },
        plusImgShow: {
            type: Boolean,
            value: true
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
    methods: {}
})