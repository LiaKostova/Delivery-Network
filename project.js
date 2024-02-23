var fs = require('fs');
const Order = require('./creatingClasses.js/creatingClassOrder.js');
const initialization = require('./utilsForMainObjectCreating/mainInitialization.js');
const isAllOrdersAreDelivered = require('./utilsForDelivering/checkDeliveryStatus.js');
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
        
    //We determine the nearest warehouse for an order and check if it is possible for the warehouse (the drone belonging to this warehouse) to complete the order.
    while(allOrders.length !==0){
        let order = allOrders.shift();
        let orderNearestWarehouse = order.nearestWarehouse;
        let warehousesNames = Object.keys(allWarehouses);

        for(let warehouseName of warehousesNames){
            if(orderNearestWarehouse == warehouseName){// find the nearest warehouse to that order
                let orderDistanceBothWays = order.distance*2;
                let orderTimeBothWays = order.distance*2 + 5;
                let orderDistanceOneWay = order.distance;
                let orderTimeOneWay = order.distance + 5;

                let whRemainingMinutesOfTheDay = allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay;
                let whDronRemainingPowerOfTheDay = allWarehouses[`${warehouseName}`].remainingPowerOfTheDay;

                if((allWarehouses[`${warehouseName}`].undeliverableOrders).length !==0){ // if we have not been able to fulfill the nearest order, we will not be able to fulfill the next (more distant) order.
                    allWarehouses[`${warehouseName}`].undeliverableOrders.push(order);
                }else{
                        
                     if(whRemainingMinutesOfTheDay >=orderTimeBothWays){ // if we have the time the order - both ways!(go and back to the wh).
                        if(whDronRemainingPowerOfTheDay >= orderDistanceBothWays){// if the warehouse(the drone) has the power to deliver this order -bothWays!
                            allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                            allWarehouses[`${warehouseName}`].totalDistance +=orderDistanceBothWays;
                            allWarehouses[`${warehouseName}`].timeNeededForAllOrders+= orderTimeBothWays;
                            whRemainingMinutesOfTheDay -=orderTimeBothWays;
                            whDronRemainingPowerOfTheDay -=orderDistanceBothWays;
                           }else if(whDronRemainingPowerOfTheDay>= orderDistanceOneWay){
                            
                           }


                     }else if(whDronRemainingPowerOfTheDay >= orderTimeOneWay){ // if we have time to deliver this order (the drone doesn't have time to return to the warehouse)

                     }else{ //we dont have left time for that order
                        allWarehouses[`${warehouseName}`].undeliverableOrders.push(order);
                      }



                  

                }         
            }
        }

    }
    //Check if all warehouses can fulfill their orders with one drone without recharge.
    let isOrdersAreDelivered = isAllOrdersAreDelivered(allWarehouses);
    console.log(isOrdersAreDelivered);
    console.log(allWarehouses);
    console.log(allOrders);

  

}

dronDeliveryNetwork(data);