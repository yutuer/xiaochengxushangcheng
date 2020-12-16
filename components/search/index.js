// components/search/index.js

import {paginationBev} from '../behaviors/pagination.js'

const util = require("../../utils/util.js");
const app = getApp();

import {
    NumOpera
} from '../../utils/tools.js';

let numOpera = new NumOpera();

import {
    CargoCache
} from "../../utils/cargoCache";

let cargoCache = new CargoCache();

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
        preSearchResult: [], //预先查询结果
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击输入框后, 清除搜索到的结果, 展示预先搜索结果
        onSearchFocus: function (e) {
            if (e.detail.value) {
                this.preSearch(e.detail.value);
            }
        },

        // 点击确认后开始查询
        onSearchConfirm: function (event) {
            let q = event.detail.value || event.detail.text;
            this.searchCargoList(q)
        },

        // 开始根据关键字搜索列表
        searchCargoList(content) {
            this.setData({
                finished: true,
                loadingCenter: true,
                preSearchResult: [],
            });

            this.initPagination();

            let allDatas = cargoCache.getSellCargosFromCache();
            let result = [];
            if (content) {
                // 搜索
                for (let i = 0; i < allDatas.length; i++) {
                    let cargo = allDatas[i];
                    let title = cargo.title;

                    if (title.indexOf(content) >= 0) {
                        result.push(cargo)
                    }
                }

                this.setData({
                    dataArray: result,
                })
            }
        },

        // 点击取消按钮
        onCancel: function (event) {
            this.triggerEvent('cancel', {}, {})
        },

        onDelete: function (event) {
            this.setData({
                finished: false,
                empty: false,
                q: '',
                preSearchResult: [],
            })
        },

        // 点击了查看详情
        cargoDetailTap: function (e) {
            const cargoid = e.currentTarget.dataset.cargoid;
            // 跳转详情页
            util.navigateToDetail(cargoid)
        },

        plusOnClickFun: function (e) {
            numOpera.redDot()
        },

        // 搜索框输入文字, 开始预查询
        onSearchInput: function (e) {
            this.preSearch(e.detail.value);
        },

        // 根据关键字预先查询
        preSearch(v) {
            this.setData({finished: false});
            if (v) {
                let findSellCargosByKeyword = cargoCache.findSellCargosByKeyword(v);
                this.setData({preSearchResult: findSellCargosByKeyword});
            } else {
                this.setData({preSearchResult: []});
            }
        },

        // 点击了预先搜索的选项, 应该和点击了搜索一样的结果, 而不是跳转
        tapMatchItem: function (e) {
            console.log("tapMatchItem:", e);
            let tapSearchItem = e.currentTarget.dataset.item;
            if (tapSearchItem) {
                let title = tapSearchItem.title;
                this.searchCargoList(title);
            }
        }
    }
});
