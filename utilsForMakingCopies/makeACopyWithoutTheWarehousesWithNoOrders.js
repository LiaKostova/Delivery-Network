function makeACopyWithoutTheWarehousesWithNoOrders(objOfTheCapableofOrdersWHs){
    let objHelper = {}
    for(let [whName, whData] of Object.entries(objOfTheCapableofOrdersWHs)){
        let sumOfDrones = whData.haveIdeliveredOrderFromThisWh + whData.numOfTotalUsedDrones 
        if(sumOfDrones !== 0){
            objHelper[`${whName}`] = whData;
        }
    }
    
   return objHelper;
}


module.exports = makeACopyWithoutTheWarehousesWithNoOrders;