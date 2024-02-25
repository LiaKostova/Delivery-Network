//Create copies of all properties of a given object, name the new ones as 'temporary', and add them to the same object with identical values.

function copyALlObjProperties(warehouse){
    let warehouseProperties = Object.entries(warehouse);

    for( let [key, value] of warehouseProperties){
        if(!key.includes("original")){
            let newNameKey = "original" + key;   
             warehouse[`${newNameKey}`] = value; 
        }
        
    }

}

module.exports = copyALlObjProperties;

