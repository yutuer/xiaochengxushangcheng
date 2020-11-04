// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const dbName = event.dbName;
        const cond = event.cond;
        if (cond) {
            return await cloud.database().collection(dbName).where(cond).get()
        } else {
            return await cloud.database().collection(dbName).get()
        }
    } catch (error) {
        throw error
    }
};