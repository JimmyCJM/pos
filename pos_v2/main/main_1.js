'use strict';



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
  console.log(printIfo);
}
