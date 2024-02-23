//I need a copy of an array without a specific property (warehouse).

function arrCopyWithoutProperty(arrOfWHObjects, warehouseName){
    let arrCopy = [];

    for(let wh of arrOfWHObjects){
        if(wh.name !== warehouseName){
            arrCopy.push(wh);
        }
    }

    return arrCopy;
}

module.exports = arrCopyWithoutProperty;