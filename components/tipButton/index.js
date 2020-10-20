// components/tipButton/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgSrc: String,
        txt: String,
        imgWidth: {
            type: Number,
            value: 40
        },
        imgHeight: {
            type: Number,
            value: 40
        },
        alertShow: {
            type: Boolean,
            value: false
        },
        containerHeight: {
            type: Number,
            value: 200
        },
        containerWidth: {
            type: Number,
            value: 200
        },
        fontSize: {
            type: Number,
            value: 30
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        imgClick() {
            this.triggerEvent('imgClickEvent', {}, {})
        },
    }
})