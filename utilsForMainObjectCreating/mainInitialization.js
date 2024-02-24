const Order = require("../creatingClasses.js/creatingClassOrder.js");
const calculatingKg = require("../utilsForBasicCalculations/calculatingKg.js");
const findHighestPower = require("../utilsForBasicCalculations/findTheDroneWithHighestCapacity.js");
const arrCopyWithoutProperty = require("../utilsForMakingCopies/makingArrCopy.js");
const fillArrWithClientInfo = require("./fillClientsArrayWithWH.js");
const fillMainWHObj = require("./fillMainWarehoseObj.js");



function initialization(warehouses, orders, products, customers, allWarehouses, ordersArrayFilledWithObjs, clientsArrayFilledWithObjs, typeOfDrones){

let dronPower = findHighestPower(typeOfDrones)

//Creating the main Warehouse Object to store information about each warehouse, including its orders, remaining time, undeliverable orders, and total distance
fillMainWHObj(allWarehouses, warehouses, dronPower);

//Creating an array that contains information about all clients, their nearest warehouse, and the distance between them.
fillArrWithClientInfo(customers, warehouses, clientsArrayFilledWithObjs);

//Creating an array to store information about orders, which includes customer ID, the nearest warehouse, and the distance between them
for(let order of orders){
    let orderCustomerId = order.customerId;
    let productList = order.productList;

    let totalOrderWeightKg = calculatingKg(productList, products);

    for(let clientInfoObject of clientsArrayFilledWithObjs){
        let [clientId, clientInfo] = Object.entries(clientInfoObject)[0];

        if(clientId == orderCustomerId){
            let orderNearestWh = clientInfo.nearestWH;
            let orderDistance = clientInfo.distance;
            let orderLeftAvailableWH = arrCopyWithoutProperty(warehouses, clientInfo.nearestWH);
            let orderCoordinates = clientInfo.clientCoordinates;
            let originalDistance = orderDistance;
            let originalWarehouse = orderNearestWh;
            ordersArrayFilledWithObjs.push(new Order(orderNearestWh, orderDistance, orderLeftAvailableWH, totalOrderWeightKg, clientId, orderCoordinates, originalDistance, originalWarehouse));
           
        }
    }
}

return [clientsArrayFilledWithObjs, ordersArrayFilledWithObjs]
}

module.exports = initialization;
