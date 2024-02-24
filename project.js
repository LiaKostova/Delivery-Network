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
        let allOFUndeliveredOrdersOriginal = allUndeliveredOrders(allWarehouses);
         
        let areWedeliverAllOrders = false;
        while(areWedeliverAllOrders == false){
            //chech can we still make a relocation all orders (fulfillthem)
            areWedeliverAllOrders = relocationAllUndeliveredOrdersAndFulfillThem(allWarehouses);
           //if this is false - we need new drone;


           // all properties values allWarehouse  === thier temporary(original);
           // all orders which have origanal value ==> normal == origal;

           //where to buy newDron - > un

        }
    }
  

}

dronDeliveryNetwork(data);