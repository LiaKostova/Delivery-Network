

function returnAllPropertiesTheirOriginalValues(arrWr){
    let wareHousesPropertiesKeys = Object.key(arrWr);
    for( let currantKey of wareHousesPropertiesKeys){
        if(!currantKey.includes('origanls')){
            let theNameOfTheOriganalKey = 'original' + currantKey;
            arrWr[`${currantKey}`] =  arrWr[`${theNameOfTheOriganalKey}`];

        }
    }

   
}
module.exports = returnAllPropertiesTheirOriginalValues;