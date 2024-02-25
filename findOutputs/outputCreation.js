const warehousesDailyWorkInfo = require("./warehousesDailyWorkInfo.js");

function outputCreation(allWarehouses){
 let dailyWorkInfo = warehousesDailyWorkInfo(allWarehouses);
let dailyWorkInfoForAllWaehouses = dailyWorkInfo.pop();

let textForEachWh = '';
for(let wh of dailyWorkInfo){
    
    if(wh.numOfOrders == 0){
        let textForZeroOrders = `The warehouse '${wh.whName}' had no orders for delivery.` + '\n';
        textForEachWh += textForZeroOrders;

    }else{
        let textInfoForThisWh =  `The warehouse '${wh.whName}' used ${wh.usedDrones} drones to deliver ${wh.numOfOrders} orders. Its average delivery time is ${wh.averageTimeForAnOrderForThisWh} minutes.` + '\n'
        textForEachWh += textInfoForThisWh;
    }
    
    
}

let finalText = `Total Used Drones for today: ${dailyWorkInfoForAllWaehouses.totalUsedDrones}` + '\n' + `Average time for all orders: ${dailyWorkInfoForAllWaehouses.totalAverageTime} minutes`

console.log(textForEachWh);
console.log(finalText);
}

module.exports = outputCreation;