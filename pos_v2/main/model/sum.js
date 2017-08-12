'use strict';
let Pcount = require("./pcount.js");
let Item = require("./item.js");
let Promotion = require("./promotion.js")

class Sum {
  constructor(barcode,name,unit,price,count,newCount,discount){
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
    this.count = count;
    this.newCount = newCount;
    this.discount = discount;
  }
  static tCount(tCount){
    let newCount = 0;
    let promotionIfo = Promotion.all();
    let len = promotionIfo[0].barcodes.length;
    let Items = Item.all();
    for (let i=0;i<len;i++){
      if (tCount.barcode === promotionIfo[0].barcodes[i]){
        newCount = tCount.count - Math.floor(tCount.count/3);break;
      }
      else if (tCount.barcode !== promotionIfo[0].barcodes[i] && i === len-1){ //i === 2
        newCount = tCount.count;
      }
    }
    let pCount = new Pcount(tCount.barcode, tCount.count,newCount);
    let sum = 0;
    for (let i = 0; i < Items.length; i++) {
      if (pCount.barcode === Items[i].barcode) {
        return sum = new Sum(pCount.barcode, Items[i].name, Items[i].unit, Items[i].price, pCount.count, pCount.newCount, Items[i].price * (pCount.count - pCount.newCount));
      }
    }
  }
};


module.exports = Sum;
