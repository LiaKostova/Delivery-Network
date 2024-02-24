// I revert the data to the state prior to attempting to distributer orders (those whose nearest warehouse failed to fulfill) to drones with available capacity
function returnAllPropertiesTheirOriginalValues(allWarehouse){

    for( let [whName, whObjectProperties] of Object.entries(allWarehouse)) {
        let wareHousesPropertiesKeys = Object.keys(whObjectProperties);
                
        for( let currantKey of wareHousesPropertiesKeys){
             if(!currantKey.includes('original')){

               let theNameOfTheOriganalKey = 'original' + currantKey;
               whObjectProperties[`${currantKey}`] =  whObjectProperties[`${theNameOfTheOriganalKey}`];
             }
         }

    } 

   
}
module.exports = returnAllPropertiesTheirOriginalValues;