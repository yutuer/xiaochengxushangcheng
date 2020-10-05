// allCargoData.js
// 左侧标签内容数组
var typeArray = [{
    type: 1,
    "icon": "../../images/main/jdms_type.png",
    desc: "热搜推荐"
  }, {
    type: 2,
    "icon": "../../images/main/jdcs_type.png",
    desc: "手机数码"
  }, 
  {
    type: 3,
    icon: "../../images/main/sjcz_type.png",
    desc: "家用电器"
  },
  {
    type: 4,
    "icon": "../../images/main/dn_type.png",
    desc: "电脑"
  },
  {
    type: 5,
    "icon": "../../images/main/xb_type.png",
    desc: "箱包"
  },
  {
    type: 6,
    "icon": "../../images/main/jjjz_type.png",
    desc: "家居家装"
  },
  // "鞋靴箱包", "运动户外", "电脑办公", "美妆护肤", "个护清洁", "生活充值", "家具建材", "家居家纺", "母婴童装", "玩具乐器", "生活美食", "酒水饮料", "汽车生活", "时尚钟表", "珠宝饰品",
];

var allDatas = [{
  cargoid: "1",
  price: 0.01,
  "title": "手机",
  "icon": "../../images/getImages/5be6ebd8Nb07ef492.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: true,
  isLike: true,
}, {
  cargoid: "2",
  price: 12.2,
  "title": "耳机",
  "icon": "../../images/getImages/aef9581abcc85725.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: true,
  isLike: true,
}, {
  cargoid: "3",
  price: 12.3,
  "title": "电饭煲",
  "icon": "../../images/getImages/987962eb75bfe813.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "4",
  price: 12.1,
  "title": "手机",
  "icon": "../../images/getImages/5be6ebd8Nb07ef492.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: true,
  isLike: true,
}, {
  cargoid: "5",
  price: 12.2,
  "title": "耳机",
  "icon": "../../images/getImages/aef9581abcc85725.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "6",
  price: 12.3,
  "title": "电饭煲",
  "icon": "../../images/getImages/987962eb75bfe813.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "7",
  price: 12.1,
  "title": "手机",
  "icon": "../../images/getImages/5be6ebd8Nb07ef492.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "8",
  price: 12.2,
  "title": "耳机",
  "icon": "../../images/getImages/aef9581abcc85725.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "9",
  price: 12.3,
  "title": "电饭煲",
  "icon": "../../images/getImages/987962eb75bfe813.png",
  type: 1,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: true,
}, {
  cargoid: "21",
  price: 122,
  "title": "小米",
  "icon": "../../images/getImages/5a1692eeN105a64b4.png",
  type: 2,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: true,
  isLike: true,
}, {
  cargoid: "22",
  price: 222.3,
  "title": "华为",
  "icon": "../../images/getImages/5a1692e2Nbea6e136.jpg",
  type: 2,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "23",
  price: 1.1,
  "title": "荣耀",
  "icon": "../../images/getImages/5a1692e2N6df7c609.jpg",
  type: 2,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "24",
  price: 1,
  "title": "苹果",
  "icon": "../../images/getImages/5a1692ebN8ae73077.jpg",
  type: 2,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "31",
  price: 1212,
  "title": "电水壶",
  "icon": "../../images/getImages/5a17f1d2N8078d5e6.jpg",
  type: 3,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "32",
  price: 12,
  "title": "电压力锅",
  "icon": "../../images/getImages/5a17f21dN905aaf4c.jpg",
  type: 3,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "33",
  price: 111.1,
  "title": "电压力锅222",
  "icon": "../../images/getImages/5a17f224Nea1d3f59.jpg",
  type: 3,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "34",
  price: 12,
  "title": "电池炉",
  "icon": "../../images/getImages/5a17f1edN56abbe6e.jpg",
  type: 3,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, {
  cargoid: "35",
  price: 12,
  "title": "微波炉",
  "icon": "../../images/getImages/5a17f203N50016f64.jpg",
  type: 3,
  "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
  isBanner: false,
  isLike: false,
}, ];

// 输出数据
module.exports = {
  typeArray: typeArray,
  allDatas: allDatas
}