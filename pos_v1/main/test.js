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


function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}


  var Items = loadAllItems();   //loadAllItems

  //tagsCount
var count = 1;
var newTags = new Array();
var tCount = new Array();
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

for(let i =0;i<newTags.length;i++){
  tCount.push({barcode:newTags[i].tag, count:newTags[i].count});
}



  var promotionIfo = loadPromotions();    //loadPromotions

  //promote
  var pCount = new Array();
  var newCount = new Array();
  for (let i = 0; i < tCount.length; i++) {
    for (let j = 0; j < promotionIfo[0].barcodes.length; j++) {
      if (tCount[i].barcode == promotionIfo[0].barcodes[j]) {
        newCount[i] = tCount[i].count - Math.floor(tCount[i].count / 3);
        pCount.push({barcode: tCount[i].barcode, count: tCount[i].count, newCount: newCount[i]});
        break;
      }
      else if (tCount[i].barcode != promotionIfo[0].barcodes[j] && j == 2) {
        pCount.push({barcode: tCount[i].barcode, count: tCount[i].count, newCount: tCount[i].count});
      }
    }
  }

  //summation
  var sum = new Array();
  for (let i = 0; i < pCount.length; i++) {
    for (let j = 0; j < Items.length; j++) {
      if (pCount[i].barcode == Items[j].barcode) {
        sum.push({
          barcode: pCount[i].barcode, name: Items[j].name, unit: Items[j].unit,
          price: Items[j].price, count: pCount[i].count, newCount: pCount[i].newCount,
          discount: Items[j].price * (pCount[i].count - pCount[i].newCount)
        });
      }
    }
  }

  //print
  var tPrice = new Array();
  var totalDiscount = 0;
  for (let i = 0; i < sum.length; i++) {
    totalDiscount += sum[i].discount;
    tPrice.push(sum[i].newCount * sum[i].price);
  }
  var totalPrice = 0;
  for (let i = 0; i < tPrice.length; i++) {
    totalPrice += tPrice[i];
  }

  var printIfo = 0;
  printIfo = printIfo + `***<没钱赚商店>收据***`;
  sum.map((value, index) => {
    printIfo += `\n名称：${value.name}，数量：${value.count + value.unit}，单价：${value.price.toFixed(2)}(元)，小计：${tPrice[index].toFixed(2)}(元)`;
  })
  printIfo += `\n----------------------
总计：${totalPrice.toFixed(2)}(元)
节省：${totalDiscount.toFixed(2)}(元)
**********************`




console.log(tCount);


