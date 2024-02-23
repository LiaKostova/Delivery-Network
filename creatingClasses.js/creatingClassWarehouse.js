class Warehouse{
    constructor(allOrdersWeCanDeliver, totalDistance, timeNeededForAllOrders, remainingPowerOfTheDay, remainingMinutesOfTheDay, undeliverableOrders, temporarilyPossibleOrders, temporarilyPossibleOrdersDistnace, originaFullCapacityPower ){
        this.allOrdersWeCanDeliver = allOrdersWeCanDeliver;
        this.totalDistance= totalDistance;
        this.timeNeededForAllOrders = timeNeededForAllOrders;
        this.remainingPowerOfTheDay = remainingPowerOfTheDay;
        this.remainingMinutesOfTheDay = remainingMinutesOfTheDay;
        this.undeliverableOrders = undeliverableOrders;
        this.temporarilyPossibleOrders = temporarilyPossibleOrders;
        this.temporarilyPossibleOrdersDistnace = temporarilyPossibleOrdersDistnace;
        this.originaFullCapacityPower = originaFullCapacityPower;
    }
}

module.exports = Warehouse;