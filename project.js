var fs = require('fs');
const Order = require('./creatingClasses.js/creatingClassOrder.js');
const initialization = require('./utilsForMainObjectCreating/mainInitialization.js');
const isAllOrdersAreDelivered = require('./utilsForDelivering/checkDeliveryStatus.js');
const deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder = require('./utilsForDelivering/trakingTheAbilityToFulFillTheOrders.js');
const copyALlObjProperties = require('./utilsForMakingCopies/copyALLObjProperties.js');
const capableOfDeliveryWH = require('./utilsForMakingCopies/onlyCapableOfDeliveryWH.js');
const allUndeliveredOrders = require('./utilsForMakingCopies/allUndelivеredOrders.js');
const findOrderNearestWarehouse = require('./utilsForDelivering/findOrderNearestWH.js');
const jsonData = fs.readFileSync('./input.json');
const data = JSON.parse(jsonData);

function dronDeliveryNetwork(input){
    console.log(input);

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
        let allOFUndeliveredOrdersOriginal = allUndeliveredOrders(allWarehouses);//add properties for each Undelivered Oder to keep its original info about the nearest wh and the distance.
         for(let cuurantOrderOriginal of allOFUndeliveredOrdersOriginal){
             cuurantOrderOriginal.originalNearestWh = cuurantOrderOriginal.nearestWarehouse;
            cuurantOrderOriginal.originalDistance = cuurantOrderOriginal.distance;
        }
        
        let potentialNeedForANewDron = true;
        while(potentialNeedForANewDron){
            let arrOfTheCapableOfOrdersWHs = capableOfDeliveryWH(allWarehouses);  
            let allOFUndeliveredOrders = allUndeliveredOrders(allWarehouses);

           if(arrOfTheCapableOfOrdersWHs.length !==0){
             for(let ord of allOFUndeliveredOrders){
                let [nearestWH, distance] = findOrderNearestWarehouse(ord, arrOfTheCapableOfOrdersWHs);
                ord.distance = distance;
                ord.nearestWarehouse = nearestWH;                
             }
           }

        }
    }
  

}

dronDeliveryNetwork(data);