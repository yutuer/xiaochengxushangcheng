// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        let dbName = event.dbName;
        let s = cloud.database().collection(dbName).where({
            noexist: null
        }).remove();

        // 这里要同步
        return s
    } catch (err) {
        throw err
    }

};