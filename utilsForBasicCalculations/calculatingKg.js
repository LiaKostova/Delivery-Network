function calculatingKg(listOfProducts, productsBasicInfo){
    let totalWeightInGrams = 0;
    for( const [listProduct, listQuantity] of Object.entries(listOfProducts)){
        for( const [productBasic, grams ] of Object.entries(productsBasicInfo)){
            if(listProduct == productBasic){
                let productWeightGrams = (listQuantity*grams);
                totalWeightInGrams += productWeightGrams;
            }
        }
    }

    let totalWeightInKg = Math.ceil(totalWeightInGrams/1000);

    return totalWeightInKg;
   
}

module.exports = calculatingKg;