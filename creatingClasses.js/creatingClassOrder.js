class Order{
    constructor(nearestWarehouse, distance, allPossibleWarehousesLeft, kg, clientId, coordinates, originalDistance, originalWarehouse){
        this.nearestWarehouse = nearestWarehouse;
        this.distance = distance;
        this.allPossibleWarehousesLeft =allPossibleWarehousesLeft;
        this.kg = kg;
        this.clientId = clientId;
        this.coordinates = coordinates;
        this.originalDistance = originalDistance;
        this.originalWarehouse = originalWarehouse; 

    }
}

module.exports = Order;