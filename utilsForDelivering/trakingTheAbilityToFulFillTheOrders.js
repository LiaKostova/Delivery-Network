const calculatingNeededTimeForchargeandDeliver = require("./calculatingNeededTimeForTheDeliver.js");

//This function is responsible for tracking the warehouses' ability to fulfill orders that are nearest to them!
//And return if i fulfill atleast one order.


//!!
//The main logic behind this function and how it works can be seen in its 'Graphical Representation,' which is located at -DeliveryLogic.html

function trakingtheAbilityToFulfillTheOrder(allOrders, allWarehouses){
    let haveIDeliveredAtleastOneOrder = false;
    while(allOrders.length !==0){
        let order = allOrders.shift();
        let orderNearestWarehouse = order.nearestWarehouse;
        let warehousesNames = Object.keys(allWarehouses);
        let warehouseValue = Object.values(allWarehouses)[0];
        let originaFullDronCapacityPower = Number(warehouseValue.originaFullCapacityPower);
        

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
                            allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay -=orderTimeBothWays;
                            allWarehouses[`${warehouseName}`].remainingPowerOfTheDay -=orderDistanceBothWays;
                            haveIDeliveredAtleastOneOrder = true;
                        }else{// no power for round trip(without charging)
                            let timeNeededForChargingAndDeliverBothWays = calculatingNeededTimeForchargeandDeliver(originaFullDronCapacityPower, orderDistanceBothWays, whDronRemainingPowerOfTheDay); // check how many min will take to charge the dron for deliver round trip.

                            if(whRemainingMinutesOfTheDay >=timeNeededForChargingAndDeliverBothWays){ //// we have the time to charged it, and deliver round trip.
                                allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                allWarehouses[`${warehouseName}`].totalDistance +=orderDistanceBothWays;
                                allWarehouses[`${warehouseName}`].timeNeededForAllOrders+= timeNeededForChargingAndDeliverBothWays;
                                allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay -=timeNeededForChargingAndDeliverBothWays;
                                allWarehouses[`${warehouseName}`].remainingPowerOfTheDay = 0; // because we've loaded it just right so it can go and come back.
                                haveIDeliveredAtleastOneOrder = true;
                            }else{
                                if(whDronRemainingPowerOfTheDay>=orderDistanceOneWay){ // we have the power to deliver this order, but we will "lost" the drone for the rest of this day.
                                    allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                    allWarehouses[`${warehouseName}`].totalDistance +=orderDistanceOneWay;
                                    allWarehouses[`${warehouseName}`].timeNeededForAllOrders += orderTimeOneWay;
                                    allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");//we will use this as a red flag because if our drone can't come back it certainly can't take any more orders. 
                                    allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                    allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                    haveIDeliveredAtleastOneOrder = true;
                                }else{ // we will try to charge our drone so it can fulfill this order 
                                    let timeNeededForChargingAndDeliverOneWay = calculatingNeededTimeForchargeandDeliver(originaFullDronCapacityPower, orderDistanceOneWay, whDronRemainingPowerOfTheDay); // check how many min will take to charge the dron for feliver the order (one way).
                                    
                                    if(whRemainingMinutesOfTheDay>=timeNeededForChargingAndDeliverOneWay){// successed charging
                                        allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                        allWarehouses[`${warehouseName}`].totalDistance +=orderDistanceOneWay;
                                        allWarehouses[`${warehouseName}`].timeNeededForAllOrders += timeNeededForChargingAndDeliverOneWay;
                                        allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");
                                        allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                        allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                        haveIDeliveredAtleastOneOrder = true;
                                    }else{// we can't charge it even just to deliver the order
                                        allWarehouses[`${warehouseName}`].undeliverableOrders.push(order);
                                    }
                                }
                            }

                           }


                     }else if(whRemainingMinutesOfTheDay >= orderTimeOneWay){ // if we have time to deliver this order but only to deliver (the drone doesn't have time to return to the warehouse).
                        if(whDronRemainingPowerOfTheDay>=orderDistanceOneWay){// we have the power to deliver (we dont need to recharged)
                                    allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                    allWarehouses[`${warehouseName}`].totalDistance +=orderDistanceOneWay;
                                    allWarehouses[`${warehouseName}`].timeNeededForAllOrders += orderTimeOneWay;
                                    allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");//we will use this as a red flag because if our drone can't come back it certainly can't take any more orders. 
                                    allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                    allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                    haveIDeliveredAtleastOneOrder = true;
                        }else{ // we will try to charge our drone so it can fulfill this order 
                            let neededTimeToDeliverOneWay = calculatingNeededTimeForchargeandDeliver(originaFullDronCapacityPower, orderDistanceOneWay, whDronRemainingPowerOfTheDay);
                            if(whRemainingMinutesOfTheDay>=neededTimeToDeliverOneWay){// successed charging
                                    allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                    allWarehouses[`${warehouseName}`].totalDistance +=orderDistanceOneWay;
                                    allWarehouses[`${warehouseName}`].timeNeededForAllOrders += neededTimeToDeliverOneWay;
                                    allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");
                                    allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                    allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                    haveIDeliveredAtleastOneOrder = true;
                            }else{// we can't charge it even just to deliver the order
                                allWarehouses[`${warehouseName}`].undeliverableOrders.push(order);
                            }
                                
                            

                        }
                     }else{ //we dont have left time for that order
                        allWarehouses[`${warehouseName}`].undeliverableOrders.push(order);
                      }



                  

                }         
            }
        }

    }

    return haveIDeliveredAtleastOneOrder;
}

module.exports = trakingtheAbilityToFulfillTheOrder;