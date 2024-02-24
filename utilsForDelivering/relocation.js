const allUndeliveredOrders = require("../utilsForMakingCopies/allUndelivеredOrders.js");
const capableOfDeliveryWH = require("../utilsForMakingCopies/onlyCapableOfDeliveryWH.js");
const deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder = require("./deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder.js");
const findOrderNearestWarehouse = require("./findOrderNearestWH.js");

function relocationAllUndeliveredOrdersAndFulfillThem(allWarehouses){
    
    let weStillCanRelocate = true;
    while(weStillCanRelocate){
        let arrOfTheCapableOfOrdersWHs = capableOfDeliveryWH(allWarehouses);  
       let allOFUndeliveredOrders = allUndeliveredOrders(allWarehouses);

        for(let ord of allOFUndeliveredOrders){
             let [nearestWH, distance] = findOrderNearestWarehouse(ord, arrOfTheCapableOfOrdersWHs);
             ord.distance = distance;
            ord.nearestWarehouse = nearestWH;                
       }
       weStillCanRelocate = deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder(allOFUndeliveredOrders, arrOfTheCapableOfOrdersWHs);

    }

    //weStillRelocate is always false at this point
    let allOFUndeliveredOrders = allUndeliveredOrders(allWarehouses)
    if(allOFUndeliveredOrders.length==0){
        return true;
    }else{
        return false;
    }      
}

module.exports = relocationAllUndeliveredOrdersAndFulfillThem;