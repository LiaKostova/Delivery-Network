class Warehouse{
    constructor(allOrdersWeCanDeliver, totalDistance, timeNeededForAllOrders, remainingPowerOfTheDay, remainingMinutesOfTheDay, undeliverableOrders,originaFullCapacityPower, numOfTotalUsedDrones, haveIdeliveredOrderFromThisWh, x, y, name){
        this.allOrdersWeCanDeliver = allOrdersWeCanDeliver;
        this.totalDistance= totalDistance;
        this.timeNeededForAllOrders = timeNeededForAllOrders;
        this.remainingPowerOfTheDay = remainingPowerOfTheDay;
        this.remainingMinutesOfTheDay = remainingMinutesOfTheDay;
        this.undeliverableOrders = undeliverableOrders;
        this.originaFullCapacityPower = originaFullCapacityPower;
        this.numOfTotalUsedDrones = numOfTotalUsedDrones;
        this.haveIdeliveredOrderFromThisWh = haveIdeliveredOrderFromThisWh;// 0== false; 1=true;
        this.x=x;
        this.y=y;
        this.name = name;
    }
}

module.exports = Warehouse;