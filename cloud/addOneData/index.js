// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let dbName = event.dbName
    let dataObj = event.dataObj
    return await cloud.database().collection(dbName).add({
      data: dataObj
    })
  } catch (error) {
    throw error
  }
}