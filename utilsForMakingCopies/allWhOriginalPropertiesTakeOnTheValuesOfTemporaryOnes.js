function originalPropertiesTakeOnTheValuesOfTemporaryOnes(warehouse){
    let warehouseProperties = Object.entries(warehouse);

    for( let [key, value] of warehouseProperties){
        if(!key.includes("original")){
            let originalPropetyName = "original" + key;   
            warehouse[`${originalPropetyName}`] = value; 
        }        
    }
}

function allWhOriginalPropertiesTakeOnTheValuesOfTemporaryOnes(allWarehouses){
    for( let wh of Object.values(allWarehouses)){
        originalPropertiesTakeOnTheValuesOfTemporaryOnes(wh);
    }

}

module.exports = allWhOriginalPropertiesTakeOnTheValuesOfTemporaryOnes;