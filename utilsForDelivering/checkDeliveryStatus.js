function isAllOrdersAreDelivered(arrOfWh){
    let allOrdersAreDeliveried = true;
    for (const [wh, whInfo] of Object.entries(arrOfWh)) {
       let undeliverableOrders = whInfo.undeliverableOrders;
       if(undeliverableOrders.length !==0){
            if(undeliverableOrders.length == '1' && undeliverableOrders[0]== 'Our first drone filled the maximum number of orders for the day and finished.'){
                allOrdersAreDeliveried = true;
            }else{
                allOrdersAreDeliveried = false;
            }
        
        break;
       }        
    }
    if(allOrdersAreDeliveried == true){
        return true;
    }else{
        return false;
    }
}

module.exports = isAllOrdersAreDelivered;