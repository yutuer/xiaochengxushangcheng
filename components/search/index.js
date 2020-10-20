// components/search/index.js

import {paginationBev} from '../behaviors/pagination.js'

const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        finished: false,
        loadingCenter: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onConfirm: function (event) {
            this.setData({
                finished: true,
                loadingCenter: true
            })

            this.initPagination()

            let q = event.detail.value || event.detail.text

            console.log("q:", q)

            this.search(q)
        },

        search(content) {
            let allDatas = wx.getStorageSync(app.globalData.allSellItemKey)
            let result = []
            if (content) {
                // 搜索
                for (let i = 0; i < allDatas.length; i++) {
                    let cargo = allDatas[i]
                    let title = cargo.title

                    if (title.indexOf(content) >= 0) {
                        result.push(cargo)
                    }
                }

                this.setData({
                    dataArray: result,
                })
            }
        },

        onCancel: function (event) {
            this.triggerEvent('cancel', {}, {})
        },

        onDelete: function (event) {
            this.setData({
                finished: false,
                empty: false,
                q: ''
            })
        },
    }
})
