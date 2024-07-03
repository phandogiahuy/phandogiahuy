

import { dataCurrency } from "../data/currency.ts";


export const convertAmoundSendtoAmountReceived = (amountUnit:{ value: string; unit: string },unitReceive:string)=>{
    let convertAmountSendToUsd: number = 0;
    let convertAmountSendToReceived: number = 0;
    let priceTokenReceived:number = 0
    // Converted the amount to send to amount to received
    for (let i = 0; i < dataCurrency.length; i++) {
      if (dataCurrency[i].currency === amountUnit.unit) {
        convertAmountSendToUsd = Number(amountUnit.value) * dataCurrency[i].price;
      }
      if(dataCurrency[i].currency === unitReceive){
         priceTokenReceived = dataCurrency[i].price
      }
      if(convertAmountSendToUsd>0 && priceTokenReceived>0 ){
        convertAmountSendToReceived = convertAmountSendToUsd/priceTokenReceived
      }
    }
    return convertAmountSendToReceived
}