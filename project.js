var fs = require('fs');
const Order = require('./creatingClasses.js/creatingClassOrder.js');
const initialization = require('./utilsForMainObjectCreating/mainInitialization.js');
const isAllOrdersAreDelivered = require('./utilsForDelivering/checkDeliveryStatus.js');
const calculatingNeededTimeForchargeandDeliver = require('./utilsForDelivering/calculatingNeededTimeForTheDeliver.js');
const trakingtheAbilityToFulfillTheOrder = require('./utilsForDelivering/trakingTheAbilityToFulFillTheOrders.js');
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
    console.log(allOrders);
    console.log(allWarehouses);
    

    //Part Two
    //Efficient order processing - Pre-sorting orders based on distance for optimal efficiency.
    allOrders.sort((a,b) =>a.distance - b.distance);
    console.log(allOrders);
        
    //We determine the nearest warehouse for an order and check if it is possible for the warehouse (the drone belonging to this warehouse) to complete the order.
    allWarehouses = trakingtheAbilityToFulfillTheOrder(allOrders, allWarehouses)
    //Check if all warehouses can fulfill their orders with one drone without recharge.
    let isOrdersAreDelivered = isAllOrdersAreDelivered(allWarehouses);
    console.log(isOrdersAreDelivered);
    console.log(allWarehouses);
    console.log(allOrders);

  

}

dronDeliveryNetwork(data);