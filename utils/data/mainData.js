// main.js
var bannerData = [{
    cargoid: 1,
    src: "../../images/getImages/f66061da227c1965.jpg!cr_1125x549_0_72!q70.jpg"
  },
  {
    cargoid: 2,
    src: "../../images/getImages/8618e8fdb2af1532.jpg!cr_1125x549_0_72!q70.jpg"
  },
  {
    cargoid: 3,
    src: "../../images/getImages/021ca5de2d4556db.jpg!cr_1125x549_0_72!q70.jpg"
  },
  {
    cargoid: 4,
    src: "../../images/getImages/9443b4f207804713.jpg!cr_1125x549_0_72!q70.jpg"
  },
  {
    cargoid: 5,
    src: "../../images/getImages/5beaa8f2N40122d10.jpg!cr_1125x549_0_72!q70.jpg"
  }
];
var itemArrayData = [{
    cargoid: "21",
    "icon": "../../images/getImages/ef747eda057cd778.jpg!q70.jpg",
    "detail": "华嘉 圆形塑料夹子18夹防风多功能折叠内衣袜子架加粗卧室阳台 12夹水蓝色",
    "price": "21.9"
  },
  {
    cargoid: "22",
    "icon": "../../images/getImages/dc2268445a844a54.jpg!q70.jpg",
    "detail": "三只松鼠营养早餐口袋面包网红零食乳酸菌小伴侣面包520g整箱装",
    "price": "49.9"
  },
  {
    cargoid: "23",
    "icon": "../../images/getImages/51b5a2cfa8c05634.jpg!q70.jpg",
    "detail": "TP-LINK TL-WDR5620 1200M 5G双频智能无线路由器 四天线智能wifi 稳定穿墙高速家用路由器",
    "price": "119"
  },
  {
    cargoid: "24",
    "icon": "../../images/getImages/5b70df92N31883eb2.jpg!q70.jpg",
    "detail": "三只松鼠坚果炒货干果零食每日坚果手剥巴旦木120g/袋",
    "price": "26.8"
  },
  {
    cargoid: "31",
    "icon": "../../images/getImages/8b4092de1f2353f0.jpg!q70.jpg",
    "detail": "蒂嗒嗒（Di.dada）【适合80-150斤胖MM穿】百褶阔腿裤女高腰夏季薄款裙裤宽松大码休闲女裤 【Z01随机1件装 可备注】 均码【1.8-2.8尺腰】 ",
    "price": "49"
  },
  {
    cargoid: "32",
    "icon": "../../images/getImages/ba60dc5fe3d66005.jpg!q70.jpg",
    "detail": "居家日用吸盘置物架 壁挂式素色挂物架 厨房浴室两用储物架215g 颜色随机发",
    "price": "10"
  },
  {
    cargoid: "33",
    "icon": "../../images/getImages/eb33d26d3de78787.jpg!q70.jpg",
    "detail": "短袖T恤男士2019夏季新款韩版宽松圆领潮流t恤打底衫大码男装休闲衣服半袖衫上衣体恤 BY短袖PARK黑+二哈白+鱼刺灰+大树蓝 XL",
    "price": "110"
  },
  {
    cargoid: "34",
    "icon": "../../images/getImages/eeb337534fc15733.jpg!q70.jpg",
    "detail": "探路蜂led手电筒强光远射超亮可变焦防身户外多功能骑行家用小型 XPE版 干电池套餐",
    "price": "49"
  },
  {
    cargoid: "35",
    "icon": "../../images/getImages/5bee7f2fNe06023a6.jpg!q70.jpg",
    "detail": "九阳（Joyoung）JYW-T03 1机4芯套装净水器水龙头台式净水机家用厨房过滤器自来水可视化可清洗滤芯  ",
    "price": "128"
  },
]

var typeData = {
  "onePage": [{
      fun: 1,
      "title": "京东秒杀",
      "icon": "../../images/main/jdms_type.png"
    },
    {
      fun: 2,
      "title": "京东超市",
      "icon": "../../images/main/jdcs_type.png"
    },
    {
      fun: 3,
      "title": "手机充值",
      "icon": "../../images/main/sjcz_type.png"
    },
    {
      fun: 4,
      "title": "电脑",
      "icon": "../../images/main/dn_type.png"
    },
    {
      fun: 5,
      "title": "数码",
      "icon": "../../images/main/sm_type.png"
    },
    {
      fun: 6,
      "title": "箱包",
      "icon": "../../images/main/xb_type.png"
    },
    {
      fun: 7,
      "title": "家居家装",
      "icon": "../../images/main/jjjz_type.png"
    },
    {
      fun: 8,
      "title": "运动",
      "icon": "../../images/main/yd_type.png"
    },
    {
      fun: 9,
      "title": "钟表",
      "icon": "../../images/main/zb_type.png"
    },
    {
      fun: 10,
      "title": "唯品会",
      "icon": "../../images/main/wph_type.png"
    },
  ],
  "twoPage": [{
      fun: 11,
      "title": "领优惠券",
      "icon": "../../images/main/lgwq_type.png"
    },
    {
      fun: 12,
      "title": "9.9元拼",
      "icon": "../../images/main/9.9yp_type.png"
    },
    {
      fun: 13,
      "title": "找折扣",
      "icon": "../../images/main/zzk_type.png"
    },
    {
      fun: 14,
      "title": "品牌特卖",
      "icon": "../../images/main/pptm_type.png"
    },
    {
      fun: 15,
      "title": "领京豆",
      "icon": "../../images/main/ljd_type.png"
    },
    {
      fun: 16,
      "title": "打卡领奖",
      "icon": "../../images/main/dkyj_type.png"
    },
    {
      fun: 17,
      "title": "京豆服饰",
      "icon": "../../images/main/jdfs_type.png"
    },
    {
      fun: 18,
      "title": "京东生鲜",
      "icon": "../../images/main/jdsx_type.png"
    },
    {
      fun: 19,
      "title": "京东手机",
      "icon": "../../images/main/jdsj_type.png"
    },
    {
      fun: 20,
      "title": "全部频道",
      "icon": "../../images/main/qbpd_type.png"
    }
  ]
}

// 输出数据
module.exports = {
  bannerData: bannerData,
  itemArrayData: itemArrayData,
  typeData: typeData,
}