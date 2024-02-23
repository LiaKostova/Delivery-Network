function isAllOrdersAreDelivered(arrOfWh){
    let allOrdersAreDeliveried = true;
    for (const [wh, whInfo] of Object.entries(arrOfWh)) {
       let undeliverableOrders = whInfo.undeliverableOrders;
       if(undeliverableOrders.length !==0){
        allOrdersAreDeliveried = false;
        break;
       }        
    }
    if(allOrdersAreDeliveried == true){
        return true;
    }else{
        return "Don't have enough drons power!"
    }
}

module.exports = isAllOrdersAreDelivered;