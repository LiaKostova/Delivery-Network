//Warehouses that are capable of delivery.

function capableOfDeliveryWH(arrOfWh){
    
    let arrOfWHCapableofDelivery = Object.values(arrOfWh).filter(obj => obj.undeliverableOrders.length == 0);
     return (arrOfWHCapableofDelivery);
}

module.exports = capableOfDeliveryWH;