const Warehouse = require("../creatingClasses.js/creatingClassWarehouse.js");

function fillMainWHObj(mainObj, arrOfWH, dronPower){

    let thePowerOfTheDroneInMin = dronPower.actualPowerWPerMin;
    for(let currWH of arrOfWH){
        let currWHName = currWH.name;

        let allAlreadyTakenWHNames = Object.keys(mainObj);

        if(allAlreadyTakenWHNames.length == 0){
             
            mainObj[`${currWHName}`]= new Warehouse([], 0, 0, thePowerOfTheDroneInMin, 720, [], [],0);
    
        }else if(!allAlreadyTakenWHNames.includes(currWHName)){
            mainObj[`${currWHName}`]= new Warehouse([], 0, 0, thePowerOfTheDroneInMin, 720, [], [],0);
        }
    }

    return mainObj;
}

module.exports=fillMainWHObj;

