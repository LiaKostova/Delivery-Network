function returnOrdersTheirOrigibalInfo(orders){

    for(let order of orders){
        order.nearestWarehouse = order.originalWarehouse;
        order.distance = order.originalDistance;
    }
}

module.exports = returnOrdersTheirOrigibalInfo;