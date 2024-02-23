function calculatingNeededTimeForchargeandDeliver(dronPower, distance, powerReserv){
    debugger;
    let chargedPowerPerMin = (Number(dronPower))/20;
    //neededDistance is actual equal to power;

    let powerWeMiss = distance - powerReserv;

    let alreadyChargedPower = 0;
    let howManyMinutesChargingTakses =0;

    while(alreadyChargedPower<powerWeMiss){
        alreadyChargedPower += chargedPowerPerMin;
        howManyMinutesChargingTakses++;
    }

    let totalMinutesToFulFillTheOrder = distance + 5 + howManyMinutesChargingTakses;

    return totalMinutesToFulFillTheOrder;
}

module.exports = calculatingNeededTimeForchargeandDeliver;