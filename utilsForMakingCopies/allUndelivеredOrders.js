function allUndeliveredOrders(allOfWH){
    let arrOfAllUndelivOrders = [];
    for(let wh of Object.values(allOfWH)){
        if(wh.undeliverableOrders.length !==0){
            if(wh.undeliverableOrders[0] == 'Our first drone filled the maximum number of orders for the day and finished.'){
                
                for (let index = 1; index < (wh.undeliverableOrders).length; index++) {
                    arrOfAllUndelivOrders.push( array[index]);                 
                }
            }else{
                for(let undeliveredOrder of wh.undeliverableOrders){
                    arrOfAllUndelivOrders.push(undeliveredOrder)
                }
            }
        }
    }
    return arrOfAllUndelivOrders;
}

module.exports = allUndeliveredOrders;