'use strict';

describe('pos', () => {

  it('should print text', () => {

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

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should print text', () => {

    const tags = [
      'ITEM000001:15',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
	  'ITEM000000:20'
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：15瓶，单价：3.00(元)，小计：30.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
名称：可口可乐，数量：20瓶，单价：3.00(元)，小计：42.00(元)
----------------------
总计：118.50(元)
节省：37.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should print text', () => {

    const tags = [
      'ITEM000002:15.6',
      'ITEM000003-2.5',
      'ITEM000002:3.4',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：苹果，数量：19斤，单价：5.50(元)，小计：104.50(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
----------------------
总计：142.00(元)
节省：0.00(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
