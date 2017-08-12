



const tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];
class Item {

  constructor(barcode, name, unit, price = 0.00) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price;
  }

  static all() {
    return [
      new Item('ITEM000000', '可口可乐', '瓶', 3.00),
      new Item('ITEM000001', '雪碧', '瓶', 3.00),
      new Item('ITEM000002', '苹果', '斤', 5.50),
      new Item('ITEM000003', '荔枝', '斤', 15.00),
      new Item('ITEM000004', '电池', '个', 2.00),
      new Item('ITEM000005', '方便面', '袋', 4.50)
    ];
  }
}
class Promotion {

  constructor(type, barcodes = []) {
    this.type = type;
    this.barcodes = barcodes;
  }

  static all() {
    return [
      new Promotion('BUY_TWO_GET_ONE_FREE', [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ])
    ];
  }
}
var Items = Item.all();
var promotionIfo = Promotion.all();

class Tcount {
  constructor(barcode,count){
    this.barcode = barcode;
    this.count = count;
  }
}

class Pcount {
  constructor(barcode,count,newCount){
    this.barcode = barcode;
    this.count = count;
    this.newCount = newCount;
  }
}


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
}
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
打印时间：${moment().format(`YYYY年MM月DD日 HH:mm:ss`)}}`;
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

function printReceipt(tags) {

  var Items = Item.all();
  var promotionIfo = Promotion.all();

  //tagsCount
  var count = 1;
  var newTags = new Array();
  for (let i=0;i<tags.length;i++){
    if (tags[i].length > 10){
      newTags.push({tag:tags[i].split(/[-:]/)[0] , count:parseFloat(tags[i].split(/[-:]/)[1])}) ;
    }
    else {
      newTags.push({tag:tags[i] , count:1});
    }
  }
  var deletIndex = new Array();
  for (let i=0;i<newTags.length;i++){
    for (let j=i+1;j<newTags.length;j++){
      if(newTags[i].tag === newTags[j].tag) {
        newTags[i].count += newTags[j].count;
        deletIndex.push(j);
      }
    }
  }
  var delet = [];
  deletIndex.map(value => {
    if (delet.indexOf(value) !== -1);
    else delet.push(value);
  })

  for (let i=delet.length;i>0;i--){
    newTags.splice(delet[i-1],1);
  }
  var result = [];
  for(let i =0;i<newTags.length;i++){
    var tCount = new Tcount(newTags[i].tag,newTags[i].count);
    var pCount = Sum.tCount(tCount);
    result.push(pCount);
  }
  var printIfo = Order.print(result);
  return printIfo;
}



console.log(printReceipt(tags));
