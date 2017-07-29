'use strict';
function printReceipt(tags) {
  var Items = loadAllItems();   //loadAllItems

  //tagsCount
  var count = 1;
  var newTags = new Array();
  var tCount = new Array();
  for (let i=0;i<tags.length;i++){
    if (tags[i].length > 10){
      newTags.push({tag:tags[i].split("-")[0] , count:parseFloat(tags[i].split("-")[1])}) ;
    }
    else {
      newTags.push({tag:tags[i] , count:1});
    }
  }
  newTags.push({tag:0 , count:0});

  for (let i=0;i<newTags.length - 1;i++){
    if (newTags[i].tag == newTags[i+1].tag){
      count ++;
    }
    else {
      tCount.push({barcode:newTags[i].tag , count:newTags[i].count + count - 1});
      count = 1;
    }
  }

  var promotionIfo = loadPromotions();    //loadPromotions

  //promote
  var pCount = new Array();
  var newCount = new Array();
  for (let i=0;i<tCount.length;i++){
    for (let j=0;j<promotionIfo[0].barcodes.length;j++){
      if (tCount[i].barcode == promotionIfo[0].barcodes[j]){
        newCount[i] = tCount[i].count - Math.floor(tCount[i].count/3);
        pCount.push({barcode:tCount[i].barcode , count:tCount[i].count , newCount:newCount[i]});break;
      }
      else if (tCount[i].barcode != promotionIfo[0].barcodes[j] && j == 2){
        pCount.push({barcode:tCount[i].barcode , count:tCount[i].count , newCount:tCount[i].count});
      }
    }
  }

  //summation
  var sum = new Array();
  for (let i=0;i<Items.length;i++){
    for (let j=0;j<pCount.length;j++){
      if (pCount[j].barcode == Items[i].barcode){
        sum.push({barcode:pCount[j].barcode , name:Items[i].name , unit:Items[i].unit ,
        price:Items[i].price , count:pCount[j].count , newCount:pCount[j].newCount ,
        discount:Items[i].price * (pCount[j].count - pCount[j].newCount)});
      }
    }
  }

  //print
  var tPrice = new Array();
  var totalDiscount = 0;
  for (let i=0;i<sum.length;i++){
    totalDiscount += sum[i].discount;
    tPrice.push(sum[i].newCount * sum[i].price);
  }
  var totalPrice = 0;
  for (let i=0;i<tPrice.length;i++){
    totalPrice += tPrice[i];
  }
  console.log('***<没钱赚商店>收据***'+
    '\n名称：' + sum[0].name + '，数量：'+ sum[0].count + sum[0].unit + '，单价：' + sum[0].price.toFixed(2) +'(元)，小计：'+ tPrice[0].toFixed(2)+'(元)' +
    '\n名称：' + sum[1].name +'，数量：'+ sum[1].count + sum[1].unit + '，单价：' + sum[1].price.toFixed(2) +'(元)，小计：'+ tPrice[1].toFixed(2)+'(元)' +
    '\n名称：' + sum[2].name +'，数量：'+ sum[2].count + sum[2].unit + '，单价：'+ sum[2].price.toFixed(2) +'(元)，小计：'+ tPrice[2].toFixed(2)+'(元)' +
    '\n----------------------' +
    '\n总计：'+ totalPrice.toFixed(2) +'(元)' +
    '\n节省：' + totalDiscount.toFixed(2) + '(元)'+
    '\n**********************')  ;
}
