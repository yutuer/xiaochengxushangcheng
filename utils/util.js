const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const db = wx.cloud.database({
  env: 'xiaochi-rlwg9'
})

function getCloudDB(name) {
  return db.collection(name)
}

// 跳转到详情页
function navigateToDetail(cargoid) {
  wx.navigateTo({
    url: '../cargodetail/cargodetail?cargoid=' + cargoid,
  })
}

module.exports = {
  formatTime: formatTime,
  getCloudDB: getCloudDB,
  navigateToDetail: navigateToDetail,
}