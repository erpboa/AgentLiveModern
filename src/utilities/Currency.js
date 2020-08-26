/**
 * Created by Franklin Espinoza on 20/08/2020.
 */
/*
 *  Currency.js version 0.1  -  Copyright 2020
 */
class Currency{
    /*begin franklin.espinoza 24/08/2020*/
    static currencyFormat(num){
        let isNegative = false;
        if (num < 0) {
            isNegative = true;
        }
        num = Math.abs(num);
        let formattedNumber = num;
        if (num >= 1000000000) {
            formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        } else if (num >= 1000000) {
            formattedNumber =  (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else  if (num >= 1000) {
            formattedNumber =  (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        if(isNegative) { formattedNumber = '-' + formattedNumber }
        return formattedNumber;
    }
    /*end franklin.espinoza 24/08/2020*/

}
export default Currency;
