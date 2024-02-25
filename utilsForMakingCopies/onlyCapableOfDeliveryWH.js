//Warehouses that are capable of delivery.

function capableOfDeliveryWH(allWarehouses){

    let capableofDelivery = {};

    for(let [whName, whdata] of Object.entries(allWarehouses)){
        if(whdata.undeliverableOrders.length == 0){
            capableofDelivery[`${whName}`] = whdata;
        }
    }

     return capableofDelivery;
}

module.exports = capableOfDeliveryWH;