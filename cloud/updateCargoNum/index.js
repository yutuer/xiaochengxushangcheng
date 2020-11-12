// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const db = cloud.database();
        const _ = db.command;

        let dbName = event.dbName;
        let dataObj = event.dataObj;

        console.log("dataObj:", dataObj);

        let suc = true;
        let cargoSend = dataObj.cargoSend;

        for(let i = 0; i < cargoSend.length; i++){
            let dataObjElement = cargoSend[i];
            let id = dataObjElement.id;
            let num = dataObjElement.num * -1;

            console.log(id, num);

            let record = db.collection(dbName).doc(id);
            await record.update({
                data: {
                    storageNum: _.inc(num)
                },
                fail: function(err){
                    suc = false;
                    console.error(err)
                }
            })
        }
        return suc;
    } catch (error) {
        console.log(error)
    }
};