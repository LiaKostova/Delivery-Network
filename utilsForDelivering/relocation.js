const allUndeliveredOrders = require("../utilsForMakingCopies/allUndelivеredOrders.js");
const makeACopyWithoutTheWarehousesWithNoOrders = require("../utilsForMakingCopies/makeACopyWithoutTheWarehousesWithNoOrders.js");
const capableOfDeliveryWH = require("../utilsForMakingCopies/onlyCapableOfDeliveryWH.js");
const deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder = require("./deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder.js");
const findOrderNearestWarehouse = require("./findOrderNearestWH.js");

function relocationAllUndeliveredOrdersAndFulfillThem(allWarehouses, mode){
     
    let atTheBegginingObjOfTheCapableofOrdersWHs = capableOfDeliveryWH(allWarehouses);
    let primaryAtTheBegginingObjOfTheCapableofOrdersWHs = capableOfDeliveryWH(allWarehouses);
    if(mode == 'finalTry'){
        let helperObj = makeACopyWithoutTheWarehousesWithNoOrders(atTheBegginingObjOfTheCapableofOrdersWHs);
        atTheBegginingObjOfTheCapableofOrdersWHs = helperObj;
        primaryAtTheBegginingObjOfTheCapableofOrdersWHs =helperObj;
        
    }
    let atTheBegginingUndeliveredOrders = allUndeliveredOrders(allWarehouses);

    let weStillCanRelocate = true;

    
       for(let order of atTheBegginingUndeliveredOrders){// По Поръчки
            
            let areWeRelocateThisOrder = false;
            
            while(Object.values(atTheBegginingObjOfTheCapableofOrdersWHs).length !==0 ){
                let [nearestWH, distance] = findOrderNearestWarehouse(order, atTheBegginingObjOfTheCapableofOrdersWHs);
               order.nearestWarehouse = nearestWH;
               order.distance = distance;
                for( let [whName, whData] of Object.entries(atTheBegginingObjOfTheCapableofOrdersWHs)){
                 if(nearestWH == whName){
                    let whAsObj = {};
                    whAsObj[`${whName}`] = whData;
                  areWeRelocateThisOrder = deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder([order], whAsObj)
                    if(areWeRelocateThisOrder == false){
                        allWarehouses[`${nearestWH}`].undeliverableOrders = [];
                        allWarehouses[`${nearestWH}`].originalundeliverableOrders = [];
                        delete atTheBegginingObjOfTheCapableofOrdersWHs[`${nearestWH}`];
                    }else{
                        atTheBegginingObjOfTheCapableofOrdersWHs = {};
                        break;

                    }
                }
                }
            }

            if(areWeRelocateThisOrder == false){
                weStillCanRelocate = false;
                break;
            }else{
                atTheBegginingObjOfTheCapableofOrdersWHs = primaryAtTheBegginingObjOfTheCapableofOrdersWHs;
            }
       }
       

    

    if(weStillCanRelocate == true){
        return true;
    }else{
        return false;
    }

   
}


module.exports = relocationAllUndeliveredOrdersAndFulfillThem;