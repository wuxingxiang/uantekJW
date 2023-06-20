/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function (window) {
  var u = {};

  Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  // u.mainUrl = 'http://jyapi.ngrok.ywapi.com:8080/';
  u.mainUrl = 'http://10.2.1.3:8001/';

  u.isArray = function (value) {
    var flag = false;
    if (Array.isArray(value)) {
      flag = true;
    }
    return flag;
  }

  u.isInArray = function (arr, value) {
    if (!arr || arr.length <= 0) {
      return false;
    }

    if (arr.indexOf && typeof (arr.indexOf) == 'function') {
      var index = arr.indexOf(value);
      if (index >= 0) {
        return true;
      }
    }
    return false;
  }

  u.isContain = function (arr, object,key) {
    if (!arr || arr.length <= 0 || typeof object != 'object') {
      return false;
    }

    var contain = false;
    arr.forEach(function (val,index) {
      if (val[key] == object[key]) {
        contain = true;
        return;
      }  
    });
    return contain;
  }

  u.deleteItem = function (tempArr, object,key) {
    if (tempArr &&  tempArr.length > 0 && object && typeof object != 'object') {
      var deleteIndex = 0;
      var contain = false;
      tempArr.forEach(function (val,index) {
        if (val[key] == object[key]) {
          contain = true;
          deleteIndex = index;
          return;
        }  
      });

      if (contain) {
        tempArr.splice(deleteIndex,1);
      }
    }
  }

  u.isInObjArray = function (arr, value, key) {
    if (!arr || arr.length <= 0) {
      return false;
    }

    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] == value[value]) {
        return true;
      }
    }
    return false;
  }

  u.isInChooseDeviceArray = function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].itemName == value) {
        return true;
      }
    }
    return false;
  }

  u.chooseDeviceObj = function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].itemName == value) {
        return array[i];
      }
    }
    return null;
  }

  /**
   * 普通list集合转成树形集合
   * @param data      list集合
   * @param idField   子节点字段名
   * @param parentField 父节点字段名
   * @param topValue 最顶级父节点字段值（如 0 1 -1）
   */
  u.parseTreeData = function (data, idField, parentField, topValue, showName) {
    var arr = [];
    for (var i = 0, l = data.length; i < l; i++) {
      var item = data[i];
      if (item != null && item[parentField] === topValue) {
        tranData(data, item, idField, parentField, showName);
        arr.push(item);
      }
    }
    return arr;
  };

  function tranData(data, parent, idField, parentField, showName) {
    var temp = [];
    for (var i = 0, l = data.length; i < l; i++) {
      var item = data[i];
      if (item != null && item[parentField] == parent[idField]) {
        tranData(data, item, idField, parentField, showName);
        temp.push(item);
      }
    }

    if (parent) {
      parent.name = parent[showName];
    }

    if (temp.length > 0) {
      parent.sub = temp;
    }
  };

  /**
   * 去除特殊字符
   * @param inputVale 输入文本
   */
  u.deleteSpecialChars = function (inputVale) {
    var value = '';
    for (var index = 0; index < inputVale.length; index++) {
      var element = inputVale[index];
      var work = element.replace(/[^u4e00-u9fa5w,\-]/g,'');
      value += work;
    }
    return value;
  }

  /**
   * 获取树状结构数据的层级深度
   * @param jsonArr      list集合
   */
  u.getDepth = function (jsonArr) {
    var arr = jsonArr;
    var depth = 0;
    while (arr.length > 0) {
      var temp = [];
      for (var i = 0; i < arr.length; i++) {
        temp.push(arr[i]);
      }
      arr = [];
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].sub) {
          for (var j = 0; j < temp[i].sub.length; j++) {
            arr.push(temp[i].sub[j]);
          }
        }
      }
      if (arr.length >= 0) {
        depth++;
      }
    }
    return depth;
  }

  /**
   * 获取树状结构数据的层级深度
   * @param jsonArr      list集合
   */
  u.getLastList = function (jsonArr) {
    var arr = jsonArr;
    var lastArr = [];

    while (arr.length > 0) {
      var temp = [];
      for (var i = 0; i < arr.length; i++) {
        temp.push(arr[i]);
      }
      arr = [];
      lastArr = [];
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].List) {
          for (var j = 0; j < temp[i].List.length; j++) {
            arr.push(temp[i].sub[j]);
          }
        }

        lastArr.push(temp[i].List)
      }
      if (arr.length >= 0) {
        depth++;
      }
    }
    return lastArr;
  }


  u.removeSub = function (array, item) {
    var index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  u.removeObjSub = function (array, item, key) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] == item[key]) {
        array.splice(i, 1);
        break;
      }
    }
  }

  u.loadImage100 = function (imageUrl) {
    if (imageUrl != undefined && imageUrl.length > 0) {
      imageUrl = imageUrl + '?x-oss-process=image/resize,m_mfit,h_100,w_100';
    }
    return imageUrl;
  }

  u.loadImage200 = function (imageUrl) {
    if (imageUrl != undefined && imageUrl.length > 0) {
      imageUrl = imageUrl + '?x-oss-process=image/resize,m_mfit,h_200,w_200';
    }
    return imageUrl;
  }

  u.loadImageScreen = function (imageUrl) {
    if (imageUrl != undefined && imageUrl.length > 0) {
      imageUrl = imageUrl + '?x-oss-process=image/resize,m_mfit,h_800,w_800,limit_0';
    }
    return imageUrl;
  }

  u.loadImageScreenHigh = function (imageUrl) {
    if (imageUrl != undefined && imageUrl.length > 0) {
      imageUrl = imageUrl + '?x-oss-process=image/resize,m_mfit,h_1200,w_1200';
    }
    return imageUrl;
  }

  u.getCurrentTime = function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }

    var Hours = date.getHours(); 
    if (Hours >= 0 && Hours <= 9) {
      Hours = "0" + Hours;
    }

    var Minutes = date.getMinutes(); 
    if (Minutes >= 0 && Minutes <= 9) {
      Minutes = "0" + Minutes;
    }

    var Seconds = date.getSeconds(); 
    if (Seconds >= 0 && Seconds <= 9) {
      Seconds = "0" + Seconds;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + Hours + seperator2 + Minutes + seperator2 + Seconds;
    return currentdate;
  }

  u.getCurrentDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

    return currentdate;
  }

  u.getDaysBetween = function (dateStart, dateEnd) {
    var startDate = Date.parse(dateStart);
    var endDate = Date.parse(dateEnd);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return parseInt(days);
  }

  //保留两位小数
  //功能：将浮点数四舍五入，取小数点后2位
  u.toDecimal = function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    f = Math.round(x * 100) / 100;
    return f;
  }

  u.GetDateStr = function (dateStr, AddDayCount) {
    if (!dateStr) {
      return '';
    }
    
    var dd = new Date(dateStr);
    dd.setDate(dd.getDate() + parseInt(AddDayCount));//获取AddDayCount天后的日期
    var y = dd.getFullYear();

    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0

    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
  }

  u.changeTimeFormat = function (timeStr) {
    var newTimeStr = '';
    if (timeStr != undefined && timeStr.length > 0) {
      var timeArray = timeStr.split("T");
      if (timeArray != undefined && timeArray.length > 0) {
        if (timeArray.length > 1) {
          newTimeStr = timeArray[0] + '  ' + timeArray[timeArray.length - 1];
        } else {
          newTimeStr = timeArray[0];
        }
      }
    }
    return newTimeStr;
  }

  u.endWith = function (str, endStr) {
    var d = str.length - endStr.length;
    return (d >= 0 && str.lastIndexOf(endStr) == d)
  }


  u.checkRate = function (inputValue) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
    if (!re.test(inputValue)) {
      return false;
    } else {
      return true;
    }
  }

  u.isEmpty = function (obj) {
    if (typeof obj == "undefined" || obj == null || obj == "undefined" || obj == " " || obj == "  " || obj.replace(/(^s*)|(s*$)/g, "").length == 0) {
      return true;
    } else {
      return false;
    }
  }

  u.isUrl = function (url) {
    if (!url || url.length <= 0) {
      return false;
    }

    // var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~])+$/;
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    var regPort = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~])(:[0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])+$/;

    var regIp = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP]:\/\/)(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

    if (reg.test(url) || regIp.test(url)|| regPort.test(url)) {
      return true;
    }

    return false;
  }

  u.isIP = function (IP) {
    if (!IP || IP.length <= 0) {
      return false;
    }

    var regIp = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
    if (regIp.test(IP)) {
      return true;
    }

    return false;
  }

  /**
  * 校验正数就返回true
  **/
  u.isIntNum = function (num) {
    
    var num1 = /^[0-9]+.?[0-9]*/;//判断字符串是否为正整数
    if (!(num1.test(num))) {
      return false;
    } else {
      return true;
    }
  }


  u.deleteApacing = function (str) {
    if (typeof obj == "undefined" || obj == null || obj == "undefined" || obj == " " || obj == "  ") {
      return '';
    } else {
      str = str.replace(/\s+/g, "");
    }

    return str;
  }

  //js去掉两头空格
  u.deleteApacingBoth = function (str) {
    if (typeof obj == "undefined" || obj == null || obj == "undefined" || obj == " " || obj == "  ") {
      return str;
    } else {
      str = str.replace(/^\s+|\s+$/g, "");//js去掉两头空格
    }
    return str;
  }

  //js去掉左空格
  u.deleteApacingLeft = function (str) {
    if (typeof obj == "undefined" || obj == null || obj == "undefined" || obj == " " || obj == "  ") {
      return str;
    } else {
      str = str.replace(/^\s*/, ''); //js去掉左空格
    }
    return str;
  }
  //js去掉右空格
  u.deleteApacingRight = function (str) {
    if (typeof obj == "undefined" || obj == null || obj == "undefined" || obj == " " || obj == "  ") {
      return str;
    } else {
      str = str.replace(/(\s*$)/g, "");   //js去掉右空格
    }
    return str;
  }

  u.tabTime = function (date1, date2) {
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if (oDate1.getTime() > oDate2.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  u.getTime = function (date) {
    var oDate = new Date(date);
    return oDate.getTime();
  }

  function showWeekFirstDay() {
    var Nowdate = new Date();
    var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
    M = Number(WeekFirstDay.getMonth()) + 1;
    return WeekFirstDay.getYear() + "-" + M + "-" + WeekFirstDay.getDate();
  }

  // 数字转16进制的字符串
  u.intToHexStr = function (num) {
    var value = num.toString(16);
    if (value.length <= 1) {
      value = '0' + value;
    }

    return value.toUpperCase();
  }

  // 字符串转16进制的字符串
  u.strToHexCharCode = function (str) {
    if (str === "") {
      return "";
    }
    var hexCharCode = [];
    for (var i = 0; i < str.length; i++) {
      hexCharCode.push((str.charCodeAt(i)).toString(16).toUpperCase());
    }
    return hexCharCode;
  }

  // 16进制转字符串
  u.hex2str = function (hex) {
    var trimedStr = hex.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
      alert("Illegal Format ASCII Code!");
      return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
  }

  u.HexString2Bytes = function (str) {
    var pos = 0;
    var len = str.length;
    if (len % 2 != 0) {
      return null;
    }
    len /= 2;
    var arrBytes = new Array();
    for (var i = 0; i < len; i++) {
      var s = str.substr(pos, 2);
      var v = parseInt(s, 16);
      arrBytes.push(v);
      pos += 2;
    }
    return arrBytes;
  }

  u.getColor = function (str) {
    //定义字符串变量colorValue存放可以构成十六进制颜色值的值
    var colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
    //以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
    var colorArray = colorValue.split(",");
    var color = "#";//定义一个存放十六进制颜色值的字符串变量，先将#存放进去
    //使用for循环语句生成剩余的六位十六进制值
    for (var i = 0; i < 6; i++) {
      //colorArray[Math.floor(Math.random()*16)]随机取出
      // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
      //字符串相加后，得出的仍是字符串
      color += colorArray[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  u.encode = function (str) {
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
  }

  u.confirmPer = function (perm, callback) {

    var storage = hasPermission('storage');
    if (!storage || !storage[0] || !storage[0].granted) {
      reqPermission('storage', function (ret) {
        if (ret && ret.list && ret.list[0] && ret.list[0].granted == true) {
          requstPermission(perm, callback);
        } else {
          api.hideProgress();
          alert('请在权限管理处打开存储权限，才能正常使用');
        }
      });
    } else {
      requstPermission(perm, callback);
    }
  }

  function requstPermission(perm, callback) {
    var has = hasPermission(perm);
    if (!has || !has[0] || !has[0].granted) {
      reqPermission(perm, function (ret) {
        if (ret && ret.list && ret.list[0] && ret.list[0].granted == true) {
          callback(true);
        } else {
          callback(false);
        }
      });
    } else {
      callback(true);
    }
  }

  function hasPermission(one_per) {
    var perms = new Array();
    if (one_per) {
      perms.push(one_per);
    }
    var rets = api.hasPermission({
      list: perms
    });
    return rets;
  }


  function reqPermission(one_per, callback) {
    var perms = new Array();
    if (one_per) {
      perms.push(one_per);
    }
    api.requestPermission({
      list: perms,
      code: 100001
    }, function (ret, err) {
      if (callback) {
        callback(ret);
        return;
      }
    });

  }

  u.scale = function () {
    // 对字符串进行编码
    var scale = 1;
    scale = api.winWidth / 375;
    return parseFloat(scale);
  }

  u.isArray = function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  }

  u.isObject = function (param) {
    return typeof param === 'object';
  }

  u.jugeAuthority = function (authority) {
    var userInfo = $api.getStorage('userInfoQMS');
    console.log(JSON.stringify(userInfo));

    if (userInfo.iscompanyadmin == true) {
      return true;
    } else {
      for (var i = 0; i < userInfo.modulelist.length; i++) {
        if (userInfo.modulelist[i].Code == authority) {
          return true;
          break;
        }
      }
    }
    return false;
  }

  u.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  u.scalarArrayEquals = function (array1, array2) {
    array1 = array1.sort();
    array2 = array2.sort();
    return array1.length == array2.length && array1.every(function (v, i) { return v === array2[i] });
  }
  /*end*/

  u.getIndexWithArr = function (_arr,_obj) {
    var len = _arr.length;
    for(var i = 0; i < len; i++)
    {
      if(isObjectValueEqual(_arr[i],_obj)) {
        return i;
      }
    }
    return -1;
  };
  
  //获取对象的下标
  function isObjectValueEqual(a, b) {
    if(typeof(a) != "object" && typeof(b) != "object"){
      if(a == b){
        return true;
      }else{
        return false;
      }
    }
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);
  
      if (aProps.length != bProps.length) {
          return false;
      }
  
      for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];
  
          if (a[propName] !== b[propName]) {
              return false;
          }
      }
  
      return true;
  }

  u.removeObjWithArr = function (_arr,_obj) {
    var length = _arr.length;
    for(var i = 0; i < length; i++)
    {
      if(isObjectValueEqual(_arr[i],_obj))
      {
        if(i == 0)
        {
          _arr.shift(); //删除并返回数组的第一个元素
          return;
        }
        else if(i == length-1)
        {
          _arr.pop();  //删除并返回数组的最后一个元素
          return;
        }
        else
        {
          _arr.splice(i,1); //删除下标为i的元素
          return;
        }
      }
    }
  };

  window.$util = u;
})(window);
