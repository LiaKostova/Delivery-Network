
function findHighestPower(arrOfDronsTypies){

    let highestCapacity = 0;
    let consumptionOfTheOneWithHighestCapacity = 0;
    let type ='';
    let actualPowerWPerMin = 0;

    for (const currantDroneType of arrOfDronsTypies){

        let currCapacity = currantDroneType.capacity;
        let currConsumption = currantDroneType.consumption;
        let currType = currantDroneType.type;
        let currantActualPowerPerMin = 0;

        //Check the input
        if(currCapacity[currCapacity.length-1] !== 'W'){
            throw new Error('Something is wrong with the input (arrOfDronsTypies)!');
        }else if(currCapacity[currCapacity.length -2] !== 'k'){
            let currCapacityLikeNumber = Number(currCapacity.substring(0, currCapacity.length-1));
            if(isNaN(currCapacityLikeNumber)){
                throw new Error('Something is wrong with the input (arrOfDronsTypies)!');
            }
        }else{
            let currCapacityLikeNumber = Number(currCapacity.substring(0, currCapacity.length-2));
            if(isNaN(currCapacityLikeNumber)){
                throw new Error('Something is wrong with the input (arrOfDronsTypies)!');
            }
        }

        if(isNaN(Number(currConsumption.substring(0, currConsumption.length-1)))){
            throw new Error('Something is wrong with the input (arrOfDronsTypies)!');
        }

        //Calculate
        if(currCapacity[currCapacity.length -2] =='k'){
            currCapacity =  Number(currCapacity.substring(0, currCapacity.length-2))*1000; //all to be - W
            currConsumption = Number(currConsumption.substring(0, currConsumption.length-1));
            currantActualPowerPerMin = Math.floor(currCapacity/currConsumption);
            if(highestCapacity == 0){
                highestCapacity = currCapacity;
                consumptionOfTheOneWithHighestCapacity = currConsumption;
                type = currType;
                actualPowerWPerMin = currantActualPowerPerMin;
            }else{
                if(actualPowerWPerMin < currantActualPowerPerMin){
                    highestCapacity = currCapacity;
                    consumptionOfTheOneWithHighestCapacity = currConsumption;
                    type = currType;
                    actualPowerWPerMin = currantActualPowerPerMin;
                }
            }
        }else{
            currCapacity = (currCapacity.substring(0, currCapacity.length-1));
            currCapacity = Number(currCapacity);
            currConsumption = Number(currConsumption.substring(0, currConsumption.length-1));
            currantActualPowerPerMin = Math.floor(currCapacity/currConsumption);
            if(highestCapacity == 0){               
                highestCapacity = currCapacity;
                consumptionOfTheOneWithHighestCapacity = currConsumption;
                type = currType;
                actualPowerWPerMin = currantActualPowerPerMin;
            }else{
                if(actualPowerWPerMin < currantActualPowerPerMin){
                    highestCapacity = currCapacity;
                    consumptionOfTheOneWithHighestCapacity = consumption;
                    type = currType;
                    actualPowerWPerMin = currantActualPowerPerMin;
                }
            }

        }         
    }
    return({highestCapacity, consumptionOfTheOneWithHighestCapacity,type, actualPowerWPerMin})
}

module.exports = findHighestPower;