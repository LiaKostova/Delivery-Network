function makeACopyWithoutTheWarehousesWithNoOrders(arrOfWh){
    
    let arrOfWHWithoutTheOneswithZeroOrders = Object.values(arrOfWh).filter(obj => (obj.haveIdeliveredOrderFromThisWh + obj.numOfTotalUsedDrones ) !== 0);
     return (arrOfWHWithoutTheOneswithZeroOrders);
}


module.exports = makeACopyWithoutTheWarehousesWithNoOrders;