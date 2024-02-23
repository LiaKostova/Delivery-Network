const Warehouse = require("../creatingClasses.js/creatingClassWarehouse.js");

function fillMainWHObj(mainObj, arrOfWH, dronPower){

    let thePowerOfTheDroneInMin = dronPower.actualPowerWPerMin;
    for(let currWH of arrOfWH){
        let currWHName = currWH.name;

        let allAlreadyTakenWHNames = Object.keys(mainObj);

        if(allAlreadyTakenWHNames.length == 0){
             
            mainObj[`${currWHName}`]= new Warehouse([], 0, 0, thePowerOfTheDroneInMin, 720, [], thePowerOfTheDroneInMin);// thePowerOfTheDroneInMin - will be used twice - one time to show how many power drone still have(at first their full power capacity) and second time - to show their original power capacity.
    
        }else if(!allAlreadyTakenWHNames.includes(currWHName)){
            mainObj[`${currWHName}`]= new Warehouse([], 0, 0, thePowerOfTheDroneInMin, 720, [], thePowerOfTheDroneInMin);
        }
    }

    return mainObj;
}

module.exports=fillMainWHObj;

