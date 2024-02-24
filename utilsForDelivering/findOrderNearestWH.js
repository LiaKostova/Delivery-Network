function findOrderNearestWarehouse(order, arrOfWarehouses){
    let orderCoordinates = order.coordinates;
    
    let xOrder = Number(orderCoordinates.x);
    let yOrder = Number(orderCoordinates.y);

    let nearestWH = "";
    let distance = "";

    for(let i =0; i<arrOfWarehouses.length; i++){
        let currentWH = arrOfWarehouses[i];
        let xWH = Number(currentWH.x);
        let yWH = Number(currentWH.y);

        let currentDistance = Math.ceil(Math.sqrt((xWH-xOrder)**2 + (yWH-yOrder)**2));

        if(distance == ""){
            nearestWH = currentWH.name;
            distance = currentDistance;
        }else if(distance > currentDistance){
            nearestWH = currentWH.name;
            distance = currentDistance;
        };
    }

    
    return [nearestWH, distance];
}

module.exports = findOrderNearestWarehouse;