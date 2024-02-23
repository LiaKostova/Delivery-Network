const findNearestWareHouseToTheClient = require("./findNearestWarehouse.js");

function fillArrWithClientInfo(customers, warehouses, clientObj){
    for (const client of customers) {
        let nearestWHInfo = findNearestWareHouseToTheClient(client, warehouses);
        let nearestWH = nearestWHInfo.nearestWH;
        let distance = nearestWHInfo.distance;
        let clientCoordinates = nearestWHInfo.clientCoordinates;
 
        let clientId = client.id;
         clientObj.push({[`${clientId}`]: {nearestWH, distance, clientCoordinates} });
     }
}

module.exports = fillArrWithClientInfo;
