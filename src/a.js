const fse = require("fs-extra")

const json = require("./data/he.js");

var list = json.datas;

var list2 = [];

list.forEach((row) => {
  list2.push(row.split(","));
});

var head = {
  0: "基金代码",
  1: "基金简称",
  3: "日期",
  4: "单位净值",
  5: "累计净值",
  6: "日增长率",
  7: "近1周",
  8: "近1月",
  9: "近3月",
  10: "近6月",
  11: "近1年",
  12: "近2年",
  13: "近3年",
  14: "今年来",
  15: "成立来",
  18: "自定义 ",
  22: "手续费",
};

// 存储器
/**
 *
 * @param {*} index
 * @param {*} val
 */
function store() {
  var len = 1000;
  var arr = new Array(len * 2);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = {
      index: i - len,
      count: 0,
    };
  }

  this.len = len;
  this.list = arr;
}

store.prototype.add = function (index) {
  var i = index / 1 + this.len;
  var item = this.list[i];
  item.count++;
};

store.prototype.getList = function () {
  var list = [].concat(this.list);

  var lastIndex = this.list.length - 1;
  // 从尾部 去除空的
  while (lastIndex--) {
    if (list[lastIndex].count != 0) {
      list = list.slice(0, lastIndex + 1);
      break;
    }
  }

  var fristIndex = 1;
  while (fristIndex++) {
    if (list[fristIndex].count != 0) {
      list = list.slice(fristIndex);
      break;
    }
  }

  return list;
};

/**
 *
 * @param {number} index : 统计哪一个字段
 * @param {int} step ： 步长
 */
function statistics(index, step) {
  var arr = new store();
  list2.forEach((row) => {
    var val = row[index];
    if (val !== "") {
      val = val / 1;
      var lavel = Math.floor(val / step);
      arr.add(lavel);
    }
  });
  console.log(arr.getList());
  return arr.getList();
}

var list = statistics(11, 10);
var jsondata1y = {
  title: "1年 - 10",
  step: 10,
  list: list
}
fse.outputJSONSync("./views/json/s1y.json", jsondata1y)


var list = statistics(10, 5);
var jsondata6m = {
  title: "6个月 - 5",
  step: 5,
  list: list
}
fse.outputJSONSync("./views/json/s6m.json", jsondata6m)

var list = statistics(9, 5);
var jsondata6m = {
  title: "3个月 - 5",
  step: 5,
  list: list
}
fse.outputJSONSync("./views/json/s3m.json", jsondata6m)

