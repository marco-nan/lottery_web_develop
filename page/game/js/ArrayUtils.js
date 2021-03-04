/**
 * 赔率取小数
 */
Number.prototype.oddFixed = function (len) {
    var strValue = this + ''
    var start = strValue.indexOf('.')
    if (start > 0 && strValue.length > start + len + 1) {
        var endValue = parseInt(strValue.substr(start + len + 1, 1))
        if (endValue >= 5) {
            var temp = Math.pow(10, len + 1);
            strValue = (this + 1 / temp).toFixed(len);
        } else {
            strValue = strValue.substr(0, start + len + 1)
        }
        if (strValue && strValue.indexOf('.') === strValue.length - 1) {
            strValue = strValue.substr(0, strValue.length - 1)
        }
    }
    strValue = parseFloat(strValue) + '';
    return strValue
}
/**
 * 
 * @param x
 * @param y
 * @returns {Number}
 */
function cNxN(x, y){
	var xSum = 1;
    var ySum = 1;
    for(var i=y;i>0;i--){
      xSum = xSum *(x-i+1);
      ySum = ySum * i;
    }
    return xSum/ySum;
}

/**
 * 数组最大值
 * @param array
 * @returns {Number}
 */
function getMaxValue(array) {
	var result = Number(array[0]);
    for(var i = 1;i<array.length;i++){
    	var re = Number(array[i]);
    	if(re > result){
    		result = re;
    	}
    }
    return result;
}

/**
 * 去除数组中重复值
 * @param arr
 * @returns {Array}
 */
function unique(arr) {
  var ret = []
  var hash = {}

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]
    var key = typeof(item) + item
    if (hash[key] !== 1) {
      ret.push(item)
      hash[key] = 1
    }
  }

  return ret
}
/**
 * 数组最小值
 * @param array
 * @returns {Number}
 */
function getMinValue(array) {
	var result = Number(array[0]);
    for(var i = 1;i<array.length;i++){
    	var re = Number(array[i]);
    	if(re < result){
    		result = re;
    	}
    }
    return result;
}

/**
 * b与a不重复的部分
 * @param a
 * @param b
 * @returns {Array}
 */
function inANotInB(a,b){
    var obj = new Object();
    for(var i =0,len = a.length;i<len;i++){
        obj[a[i]] = 1;
    }
    for(var i =0,len = b.length;i<len;i++){
        if(obj.hasOwnProperty(b[i])){
            obj[b[i]] = undefined;
        }
    }
    var arr = new Array();
    var i = 0; 
    for(var per in obj){
        if(obj[per]){
            arr[i++] = per;
        }
    }
    return arr;
}

/**
 * 数组中是否存在某个值
 */
Array.prototype.contains = function (obj) {  
    var len = this.length;  
    for(var i=0;i<len;i++) {  
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}

Array.prototype.toString = function () {  
    var len = this.length;
    var rs = '';
    for(var i=0;i<len;i++) {  
    	rs += this[i] + ',' 
    }  
    return rs.substring(0, rs.length-1);  
}
/**
 * 组合-从n个数字中选择m个数字
 * @param n
 * @param m
 * @returns {Array}
 */
function combine(n, m){
    if (m > n) {
      
    }
   var a = new Array();
    for (var i = 0; i < n; i++) {
      a[i] = i;
    }
    var result = [];
    var bs = new Array();
    for (var i = 0; i < n; i++) {
      bs[i] = 0;
    }
    // 初始化
    for (var i = 0; i < m; i++) {
      bs[i] = 1;
    }
    var flag = true;
    var tempFlag = false;
    var pos = 0;
    var sum = 0;
    // 首先找到第一个10组合，然后变成01，同时将左边所有的1移动到数组的最左边
    do {
      sum = 0;
      pos = 0;
      tempFlag = true;
      result.push(print(bs, a, m));

      for (var i = 0; i < n - 1; i++) {
        if (bs[i] == 1 && bs[i + 1] == 0) {
          bs[i] = 0;
          bs[i + 1] = 1;
          pos = i;
          break;
        }
      }
      // 将左边的1全部移动到数组的最左边

      for (var i = 0; i < pos; i++) {
        if (bs[i] == 1) {
          sum++;
        }
      }
      for (var i = 0; i < pos; i++) {
        if (i < sum) {
          bs[i] = 1;
        } else {
          bs[i] = 0;
        }
      }

      // 检查是否所有的1都移动到了最右边
      for (var i = n - m; i < n; i++) {
        if (bs[i] == 0) {
          tempFlag = false;
          break;
        }
      }
      if (tempFlag == false) {
        flag = true;
      } else {
        flag = false;
      }

    } while (flag);
    if (m != a.length) {
      result.push(print(bs, a, m));
    }
    
    return result;
  }

function print(bs, a, m) {
	var result = new Array();
    var pos = 0;
    for (var i = 0; i < bs.length; i++) {
      if (bs[i] == 1) {
        result[pos] = a[i];
        pos++;
      }
    }
    return result;
}
/**
 * 跟据下标获取对应的值
 * @param arrays
 * @param indexs
 * @returns {Array}
 */
function getArrayByIndexs(arrays, indexs) {
  var nums = [];
  for (var i = 0; i < indexs.length; i++) {
	nums.push(arrays[indexs[i]]);
  }
  return nums;
}
