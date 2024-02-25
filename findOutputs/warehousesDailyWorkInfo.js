function warehousesDailyWorkInfo(allWarehouses){
    let finalInfo = [];

    let totalTimeNeeded = 0;
    let totalUsedDrones = 0;
    let totalOrdersNum = 0;
    let totalAverageTime = 0;
    for(let [whName, whData] of Object.entries(allWarehouses)){
        let totalDistance = 0;
        let timeNeededForAllOrders = 0;
        let usedDrones = 0;
        let numOfOrders = 0;

        totalDistance = whData.totalDistance;
        timeNeededForAllOrders = whData.timeNeededForAllOrders;
        usedDrones = whData.numOfTotalUsedDrones + whData.haveIdeliveredOrderFromThisWh;////The 'numOfTotalUsedDrones' metric includes all complementary drones. The 'haveIdeliveredOrderFromThisWh' indicator shows 0 if we haven't delivered from this warehouse (this drone) and 1 if we have.
        numOfOrders = whData.allOrdersWeCanDeliver.length;

        totalTimeNeeded +=timeNeededForAllOrders;
        totalUsedDrones +=usedDrones;
        totalOrdersNum +=numOfOrders;
       


        let averageTimeForAnOrderForThisWh = Math.ceil(timeNeededForAllOrders/numOfOrders);

        let wareHouseFinalInfo = {whName,averageTimeForAnOrderForThisWh, totalDistance, timeNeededForAllOrders,usedDrones,numOfOrders};
        finalInfo.push(wareHouseFinalInfo)

    }

    totalAverageTime = Math.ceil(totalTimeNeeded/totalOrdersNum);
    let infoForAllWarehouses = {totalTimeNeeded, totalOrdersNum, totalAverageTime, totalUsedDrones};
    finalInfo.push(infoForAllWarehouses);
    return finalInfo;
}

module.exports = warehousesDailyWorkInfo;