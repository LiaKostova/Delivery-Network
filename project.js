var fs = require('fs');
const Order = require('./creatingClasses.js/creatingClassOrder.js');
const initialization = require('./utilsForMainObjectCreating/mainInitialization.js');
const isAllOrdersAreDelivered = require('./utilsForDelivering/checkDeliveryStatus.js');
const deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder = require('./utilsForDelivering/deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder.js');
const copyALlObjProperties = require('./utilsForMakingCopies/copyALLObjProperties.js');
const capableOfDeliveryWH = require('./utilsForMakingCopies/onlyCapableOfDeliveryWH.js');
const allUndeliveredOrders = require('./utilsForMakingCopies/allUndelivеredOrders.js');
const findOrderNearestWarehouse = require('./utilsForDelivering/findOrderNearestWH.js');
const relocationAllUndeliveredOrdersAndFulfillThem = require('./utilsForDelivering/relocation.js');
const returnAllPropertiesTheirOriginalValues = require('./utilsForMakingCopies/returnAllOriginalPropertiesValues.js');
const returnOrdersTheirOrigibalInfo = require('./utilsForMakingCopies/returnOrdersTheirOriginalInfo.js');
const findWhereToBuyNewDrone = require('./utilsForDelivering/findWhereToBuyANewDrone.js');
const findHighestPower = require('./utilsForBasicCalculations/findTheDroneWithHighestCapacity.js');
const warehousesDailyWorkInfo = require('./findOutputs/warehousesDailyWorkInfo.js');
const jsonData = fs.readFileSync('./input.json');
const data = JSON.parse(jsonData);

function dronDeliveryNetwork(input){

    //Parameters declaration
    let customers = input.customers;
    let coordinates = input["map-top-right-coordinate"];
    let orders = input.orders;
    let products = input.products;
    let typeOfDrones = input.typesOfDrones;
    let warehouses = input.warehouses;
    
    //Check for invalid input
    if( Object.keys(coordinates).length !== 2 || products.length ==0 ||  warehouses.length == 0 || customers.length ==0){
        throw new Error("Something is wrong with the input!");
    }
    
    //Part 1
    //Creating essential objects:
    //- allWarehouses: Stores information about warehouses, including capacity, remaining minutes,remaining time, undeliverable orders, total distance....
    //- allOrders: Keeps details about all orders, including the nearest warehouse and the distance.
    let allWarehouses = {};
    let arrOfClientsObjs =[];
    let allOrders = [];
  
    initialization(warehouses, orders, products, customers, allWarehouses, allOrders, arrOfClientsObjs, typeOfDrones);

  
    //Part Two
    //Efficient order processing - Pre-sorting orders based on distance for optimal efficiency.
    allOrders.sort((a,b) =>a.distance - b.distance);
        
    //We determine the nearest warehouse for an order and check if it is possible for the warehouse (the drone belonging to this warehouse) to complete the order.
    let deliveredAtleastOneOrder = deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder(allOrders, allWarehouses);
    


    let isOrdersAreDeliveredAllOfThem = isAllOrdersAreDelivered(allWarehouses);

    if(isOrdersAreDeliveredAllOfThem !== true){ //Check if all warehouses can fulfill their orders with one drone.
        for(let wh of Object.values(allWarehouses)){
            copyALlObjProperties(wh);
        }
       
         
        let areWedeliverAllOrders = false;
        while(areWedeliverAllOrders == false){
            //chech can we still make a relocation all orders (fulfillthem)
            areWedeliverAllOrders = relocationAllUndeliveredOrdersAndFulfillThem(allWarehouses);
           
            //if this is false - we need new drone;
            if(areWedeliverAllOrders == false){
            //revert the data to the state prior to attempting to distributer orders (those whose nearest warehouse failed to fulfill) to drones with available capacity
            //We "remove" the consequences of the unsuccessful attempt to distribute the orders 
                 returnAllPropertiesTheirOriginalValues(allWarehouses);
                for(let warehouseValuesAsObject of Object.values(allWarehouses)){
                    returnOrdersTheirOrigibalInfo(warehouseValuesAsObject.allOrdersWeCanDeliver);
                    returnOrdersTheirOrigibalInfo(warehouseValuesAsObject.undeliverableOrders);
                }

                //The warehouse that recently acquired a new drone is attempting to fulfill all previously failed orders using the new drone. Subsequently, we check for any outstanding orders. If there are any, we make another attempt to distribute the remaining deliveries among the drones. If a new drone is required, we purchase one for the warehouse in need. This process continues until all deliveries are fulfilled.

                let inWhichWarehouseToBuyNewDrone = findWhereToBuyNewDrone(allWarehouses); //The warehouse that needs a new drone the most is the one with the highest total distance of unfulfilled orders
                allWarehouses[`${inWhichWarehouseToBuyNewDrone}`].numOfTotalUsedDrones ++;
                allWarehouses[`${inWhichWarehouseToBuyNewDrone}`].haveIdeliveredOrderFromThisWh =0;
                allWarehouses[`${inWhichWarehouseToBuyNewDrone}`].remainingMinutesOfTheDay=720;
                allWarehouses[`${inWhichWarehouseToBuyNewDrone}`].remainingPowerOfTheDay = findHighestPower(typeOfDrones).actualPowerWPerMin;

                let arrayOfUndeliveredOrders = [];
                let theWarehouseUdeliveredOrdersArr = allWarehouses[`${inWhichWarehouseToBuyNewDrone}`].undeliverableOrders;

                for (let currOrder of theWarehouseUdeliveredOrdersArr) {
                    if(currOrder !== 'Our first drone filled the maximum number of orders for the day and finished.'){
                        arrayOfUndeliveredOrders.push(currOrder);
                    }
                    
                }
                allWarehouses[`${inWhichWarehouseToBuyNewDrone}`].undeliverableOrders = [];
                theWarehouseAsObject = {};
                theWarehouseAsObject[`${inWhichWarehouseToBuyNewDrone}`] =  allWarehouses[`${inWhichWarehouseToBuyNewDrone}`];

                deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder(arrayOfUndeliveredOrders,theWarehouseAsObject );

                let checkAreWedeliverAllOrders = allUndeliveredOrders(allWarehouses);
                if(checkAreWedeliverAllOrders.length == 0){
                    areWedeliverAllOrders = true;
                }else{
                    copyALlObjProperties(allWarehouses[`${inWhichWarehouseToBuyNewDrone}`]);
                }
                
            }

        }
    }else{
        /// check can we delivered all orders with less drones;
    }

let dailyWorkInfo = warehousesDailyWorkInfo(allWarehouses);
let dailyWorkInfoForAllWaehouses = dailyWorkInfo.pop();

let textForEachWh = '';
for(let wh of dailyWorkInfo){
   let textInfoForThisWh =  `The warehouse '${wh.whName}' used ${wh.usedDrones} drones to deliver ${wh.numOfOrders} orders. Its average delivery time is ${wh.averageTimeForAnOrderForThisWh} minutes.` + '\n'
    textForEachWh += textInfoForThisWh;
}

let finalText = `Total Used Drones for today: ${dailyWorkInfoForAllWaehouses.totalUsedDrones}` + '\n' + `Average time for all orders: ${dailyWorkInfoForAllWaehouses.totalAverageTime} minutes`

console.log(textForEachWh);
console.log(finalText);




}

dronDeliveryNetwork(data);