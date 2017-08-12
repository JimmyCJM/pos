'use strict';
class Order {
  constructor(){}
  static print (sum){
    var moment = require('moment');
    let tPrice = new Array();
    let totalDiscount = 0;
    for (let i=0;i<sum.length;i++){
      totalDiscount += sum[i].discount;
      tPrice.push(sum[i].newCount * sum[i].price);
    }
    var totalPrice = 0;
    for (let i=0;i<tPrice.length;i++){
      totalPrice += tPrice[i];
    }
    var printIfo = 0;
    printIfo =`***<没钱赚商店>收据***
打印时间：${moment().format(`YYYY年MM月DD日 HH:mm:ss`)}
----------------------`;
    sum.forEach((value, index) => {
      printIfo += `\n名称：${value.name}，数量：${value.count + value.unit}，单价：${value.price.toFixed(2)}(元)，小计：${tPrice[index].toFixed(2)}(元)`;
    })
    printIfo += `\n----------------------
总计：${totalPrice.toFixed(2)}(元)
节省：${totalDiscount.toFixed(2)}(元)
**********************`
    return  printIfo;
  }
}

module.exports = Order;
