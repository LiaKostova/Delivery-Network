class Warehouse{
    constructor(allOrdersWeCanDeliver, totalDistance, timeNeededForAllOrders, remainingPowerOfTheDay, remainingMinutesOfTheDay, undeliverableOrders,originaFullCapacityPower){
        this.allOrdersWeCanDeliver = allOrdersWeCanDeliver;
        this.totalDistance= totalDistance;
        this.timeNeededForAllOrders = timeNeededForAllOrders;
        this.remainingPowerOfTheDay = remainingPowerOfTheDay;
        this.remainingMinutesOfTheDay = remainingMinutesOfTheDay;
        this.undeliverableOrders = undeliverableOrders;
        this.originaFullCapacityPower = originaFullCapacityPower;
    }
}

module.exports = Warehouse;