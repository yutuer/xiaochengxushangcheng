// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        let dbName = event.dbName;
        let cond = event.cond; //id主键, 才能使用update
        let dataObj = event.dataObj;
        console.log(dataObj);
        let num = dataObj.num * -1;
        if (cond) {
            let record = cloud.database().collection(dbName).doc(cond);
            return await record.update({
                data: {
                    leftUseCount: _.inc(num)
                },
                success: console.log,
                fail: console.error
            })
        }
    } catch (error) {
        console.log(error)
    }
};