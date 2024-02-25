const calculatingNeededTimeForchargeandDeliver = require("./calculatingNeededTimeForTheDeliver.js");

//This function is responsible for tracking the warehouses' ability to fulfill orders that are nearest to them!
//And return if i fulfill atleast one order.


//!!
//The main logic behind this function and how it works can be seen in its 'Graphical Representation,' which is located at -DeliveryLogic.html

function deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder(allOrders, allWarehouses){
    if(allOrders.length == 0 || Object.entries(allWarehouses).length ==0){
        return false;
    }
    let haveIDeliveredAtleastOneOrder = false;
    while(allOrders.length !==0){
        let order = allOrders.shift();
        let orderNearestWarehouse = order.nearestWarehouse;
        let warehousesNames = Object.keys(allWarehouses);
        let warehouseValue = Object.values(allWarehouses);
        let originaFullDronCapacityPower = Number(warehouseValue.originaFullCapacityPower);
        

        for(let warehouseName of warehousesNames){
            if(orderNearestWarehouse == warehouseName){// find the nearest warehouse to that order
                let orderKg = order.kg;
                let clearDistanceOnlyInMapUnitsBothWays = order.distance*2;
                let clearDistanceOnlyInMapUnitsOneWay = order.distance;
                //When we include kilograms in the calculation to see how much consumption there is, we can simply multiply the distance of the rest (this is actually our consumption with 1 kg) by the kilograms of the order.
                let orderDistanceBothWays = order.distance + (order.distance)*orderKg; //we carry the order only in one direction
                let orderTimeBothWays = order.distance*2 + 5;
                let orderDistanceOneWay = (order.distance)*orderKg;
                let orderTimeOneWay = order.distance + 5;
                

                let whRemainingMinutesOfTheDay = allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay;
                let whDronRemainingPowerOfTheDay = allWarehouses[`${warehouseName}`].remainingPowerOfTheDay;

                if((allWarehouses[`${warehouseName}`].undeliverableOrders).length !==0){ // if we have not been able to fulfill the nearest order, we will not be able to fulfill the next (more distant) order.
                    allWarehouses[`${warehouseName}`].undeliverableOrders.push(order);
                }else{
                        
                     if(whRemainingMinutesOfTheDay >=orderTimeBothWays){ // if we have the time the order - both ways!(go and back to the wh).
                        if(whDronRemainingPowerOfTheDay >= orderDistanceBothWays){// if the warehouse(the drone) has the power to deliver this order -bothWays!
                            allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                            allWarehouses[`${warehouseName}`].totalDistance +=clearDistanceOnlyInMapUnitsBothWays;
                            allWarehouses[`${warehouseName}`].timeNeededForAllOrders+= orderTimeBothWays;
                            allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay -=orderTimeBothWays;
                            allWarehouses[`${warehouseName}`].remainingPowerOfTheDay -=orderDistanceBothWays;
                            haveIDeliveredAtleastOneOrder = true;
                            allWarehouses[`${warehouseName}`].haveIdeliveredOrderFromThisWh = 1;
                        }else{// no power for round trip(without charging)
                            let timeNeededForChargingAndDeliverBothWays = calculatingNeededTimeForchargeandDeliver(originaFullDronCapacityPower, orderDistanceBothWays, whDronRemainingPowerOfTheDay); // check how many min will take to charge the dron for deliver round trip.

                            if(whRemainingMinutesOfTheDay >=timeNeededForChargingAndDeliverBothWays){ //// we have the time to charged it, and deliver round trip.
                                allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                allWarehouses[`${warehouseName}`].totalDistance +=clearDistanceOnlyInMapUnitsBothWays;
                                allWarehouses[`${warehouseName}`].timeNeededForAllOrders+= timeNeededForChargingAndDeliverBothWays;
                                allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay -=timeNeededForChargingAndDeliverBothWays;
                                allWarehouses[`${warehouseName}`].remainingPowerOfTheDay = 0; // because we've loaded it just right so it can go and come back.
                                haveIDeliveredAtleastOneOrder = true;
                                allWarehouses[`${warehouseName}`].haveIdeliveredOrderFromThisWh = 1;
                            }else{
                                if(whDronRemainingPowerOfTheDay>=orderDistanceOneWay){ // we have the power to deliver this order, but we will "lost" the drone for the rest of this day.
                                    allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                    allWarehouses[`${warehouseName}`].totalDistance +=clearDistanceOnlyInMapUnitsOneWay;
                                    allWarehouses[`${warehouseName}`].timeNeededForAllOrders += orderTimeOneWay;
                                    allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");//we will use this as a red flag because if our drone can't come back it certainly can't take any more orders. 
                                    allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                    allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                    haveIDeliveredAtleastOneOrder = true;
                                    allWarehouses[`${warehouseName}`].haveIdeliveredOrderFromThisWh = 1;
                                }else{ // we will try to charge our drone so it can fulfill this order 
                                    let timeNeededForChargingAndDeliverOneWay = calculatingNeededTimeForchargeandDeliver(originaFullDronCapacityPower, orderDistanceOneWay, whDronRemainingPowerOfTheDay); // check how many min will take to charge the dron for feliver the order (one way).
                                    
                                    if(whRemainingMinutesOfTheDay>=timeNeededForChargingAndDeliverOneWay){// successed charging
                                        allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                        allWarehouses[`${warehouseName}`].totalDistance +=clearDistanceOnlyInMapUnitsOneWay;
                                        allWarehouses[`${warehouseName}`].timeNeededForAllOrders += timeNeededForChargingAndDeliverOneWay;
                                        allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");
                                        allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                        allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                        haveIDeliveredAtleastOneOrder = true;
                                        allWarehouses[`${warehouseName}`].haveIdeliveredOrderFromThisWh = 1;
                                    }else{// we can't charge it even just to deliver the order
                                        allWarehouses[`${warehouseName}`].undeliverableOrders.push(order);
                                    }
                                }
                            }

                           }


                     }else if(whRemainingMinutesOfTheDay >= orderTimeOneWay){ // if we have time to deliver this order but only to deliver (the drone doesn't have time to return to the warehouse).
                        if(whDronRemainingPowerOfTheDay>=orderDistanceOneWay){// we have the power to deliver (we dont need to recharged)
                                    allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                    allWarehouses[`${warehouseName}`].totalDistance +=clearDistanceOnlyInMapUnitsOneWay;
                                    allWarehouses[`${warehouseName}`].timeNeededForAllOrders += orderTimeOneWay;
                                    allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");//we will use this as a red flag because if our drone can't come back it certainly can't take any more orders. 
                                    allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                    allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                    haveIDeliveredAtleastOneOrder = true;
                                    allWarehouses[`${warehouseName}`].haveIdeliveredOrderFromThisWh = 1;
                        }else{ // we will try to charge our drone so it can fulfill this order 
                            let neededTimeToDeliverOneWay = calculatingNeededTimeForchargeandDeliver(originaFullDronCapacityPower, orderDistanceOneWay, whDronRemainingPowerOfTheDay);
                            if(whRemainingMinutesOfTheDay>=neededTimeToDeliverOneWay){// successed charging
                                    allWarehouses[`${warehouseName}`].allOrdersWeCanDeliver.push(order);
                                    allWarehouses[`${warehouseName}`].totalDistance +=clearDistanceOnlyInMapUnitsOneWay;
                                    allWarehouses[`${warehouseName}`].timeNeededForAllOrders += neededTimeToDeliverOneWay;
                                    allWarehouses[`${warehouseName}`].undeliverableOrders.push("Our first drone filled the maximum number of orders for the day and finished.");
                                    allWarehouses[`${warehouseName}`].remainingMinutesOfTheDay = 0;
                                    allWarehouses[`${warehouseName}`].remainingPowerOfTheDay =0;
                                    haveIDeliveredAtleastOneOrder = true;
                                    allWarehouses[`${warehouseName}`].haveIdeliveredOrderFromThisWh = 1;
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

module.exports = deliveriesExecutingAndTrakingtheAbilityToFulfillOneOrder;