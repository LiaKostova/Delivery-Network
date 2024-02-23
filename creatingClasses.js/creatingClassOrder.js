class Order{
    constructor(nearestWarehouse, distance, allPossibleWarehousesLeft, kg, clientId, coordinates){
     this.nearestWarehouse = nearestWarehouse;
        this.distance = distance;
        this.allPossibleWarehousesLeft =allPossibleWarehousesLeft;
        this.kg = kg;
        this.clientId = clientId;
        this.coordinates = coordinates;

    }
}

module.exports = Order;