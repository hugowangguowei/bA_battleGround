/**
 * Created by wgw on 2016/7/23.
 */

exports.generateRandomObstacle = generateRandomObstacle;
/**
 * 生成指定数量的随机障碍
 * @param num
 * @returns {Array}
 */
function generateRandomObstacle(num){
    var dataList = [];
    var _x = parseInt(1000/num);
    var _y = parseInt(1000/num);
    var data;
    for(var i = 0;i<num;i++){
        data = {
            type:"line",
            node:[
                i*_x,
                100,
                i*_x,
                900
            ]};
        dataList.push(data);
    }
    return dataList;
}