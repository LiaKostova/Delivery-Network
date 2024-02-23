function findNearestWareHouseToTheClient(client, arrOfWarehouses){
    let clientCoordinates = client.coordinates;
    
    let xClient = Number(clientCoordinates.x);
    let yClient = Number(clientCoordinates.y);

    let nearestWH = "";
    let distance = "";

    for(let i =0; i<arrOfWarehouses.length; i++){
        let currentWH = arrOfWarehouses[i];
        let xWH = Number(currentWH.x);
        let yWH = Number(currentWH.y);

        let currentDistance = Math.ceil(Math.sqrt((xWH-xClient)**2 + (yWH-yClient)**2));

        if(distance == ""){
            nearestWH = currentWH.name;
            distance = currentDistance;
        }else if(distance > currentDistance){
            nearestWH = currentWH.name;
            distance = currentDistance;
        };
    }

    
    return {nearestWH, distance, clientCoordinates};
}

module.exports = findNearestWareHouseToTheClient;