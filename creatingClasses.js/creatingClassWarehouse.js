class Warehouse{
    constructor(allOrdersWeCanDeliver, totalDistance, timeNeededForAllOrders, remainingPowerOfTheDay, remainingMinutesOfTheDay, undeliverableOrders,originaFullCapacityPower, numOfTotalUsedDrones, haveIdeliveredOrderFromThisWh, x, y, name){
        this.allOrdersWeCanDeliver = allOrdersWeCanDeliver;
        this.totalDistance= totalDistance;
        this.timeNeededForAllOrders = timeNeededForAllOrders;
        this.remainingPowerOfTheDay = remainingPowerOfTheDay;
        this.remainingMinutesOfTheDay = remainingMinutesOfTheDay;
        this.undeliverableOrders = undeliverableOrders;
        this.originaFullCapacityPower = originaFullCapacityPower;
        this.numOfTotalUsedDrones = numOfTotalUsedDrones;////The 'numOfTotalUsedDrones' metric includes all complementary drones. The 'haveIdeliveredOrderFromThisWh' indicator shows 0 if we haven't delivered from this warehouse (this drone) and 1 if we have
        this.haveIdeliveredOrderFromThisWh = haveIdeliveredOrderFromThisWh;// 0== false; 1=true;
        this.x=x;
        this.y=y;
        this.name = name;
    }
}

module.exports = Warehouse;