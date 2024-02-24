//The warehouse that needs a new drone the most is the one with the highest total distance of unfulfilled orders

function findWhereToBuyNewDrone(allWarehouses) {
  let totalLongestUndeliveredDistance = 0;
  let warehouseWithTheGreatestNeedForNewDron = "";

  for (let [whName, whObjectWithValues] of Object.entries(allWarehouses)) {
    let currantTotalDistanceLength = 0;
    if (whObjectWithValues.undeliverableOrders.length !== 0) {
      if (
        whObjectWithValues.undeliverableOrders[0] ==
        "Our first drone filled the maximum number of orders for the day and finished."
      ) {
        if (whObjectWithValues.undeliverableOrders.length !== 1) {
          for (
            let i = 1;
            i < whObjectWithValues.undeliverableOrders.length;
            i++
          ) {
            let currantorder = whObjectWithValues.undeliverableOrders[i];
            currantTotalDistanceLength += currantorder.distance;
          }
        }
      } else {
        for (let currOrder of whObjectWithValues.undeliverableOrders) {
          currantTotalDistanceLength += currOrder.distance;
        }
      }
    }

    if (currantTotalDistanceLength > totalLongestUndeliveredDistance) {
      totalLongestUndeliveredDistance = currantTotalDistanceLength;
      warehouseWithTheGreatestNeedForNewDron = whName;
    }
  }

 

  return warehouseWithTheGreatestNeedForNewDron;
}

module.exports = findWhereToBuyNewDrone;
