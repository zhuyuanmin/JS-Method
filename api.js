/**
 * 拼接url：domain主域名，obj参数
*/
function getJoinUrl(domain, obj) {
  return urlJoin(domain, joinStr(obj));

  function joinStr(e) {
    var t = [];
    for (var i in e) {
      t[t.length] = i + "=" + encodeURIComponent(e[i])
    }
    return t.join("&").replace(/%20/g, "+").replace(/%25/g, "%")
  }

  function urlJoin(e, t) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      var s = arguments[i];
      if (s !== undefined) {
        if (s.indexOf("?") === 0 || s.indexOf("&") === 0) s = s.substr(1);
        var r = i > 1 ? "&" : e.indexOf("?") > -1 ? "&" : "?";
        e += r + s
      }
    }
    return e;
  }
}

/**
 * 设置cookie
 */
function setCookie(cname, cvalue, exdays) {
  if (exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  } else {
    document.cookie = cname + "=" + cvalue + ";"
  }
}

/**
 * 获取cookie
 */
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * 查询url参数
 */
/* getQueryStr(location.href, 'index') */
function getQueryStr(_url, _param) {
  var rs = new RegExp("(^|)" + _param + "=([^\&]*)(\&|$)", "g").exec(_url),
    tmp;
  if (tmp = rs) {
    return tmp[2];
  }
  return "";
}

/**
 * 时间日期格式化
 */
/* getTimeDate().now() */
function getTimeDate() {
  var myDate = new Date();
  var weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  var DATE = {
    now: function () {
      return DATE.date() + ' ' + DATE.time();
    },
    date: function () {
      return myDate.getFullYear() + '-' + format(myDate.getMonth() + 1) + '-' + format(myDate.getDate());
    },
    time: function () {
      return format(myDate.getHours()) + ':' + format(myDate.getMinutes()) + ':' + format(myDate.getSeconds());
    },
    timestamp: function () {
      return myDate.getTime();
    },
    week: function () {
      return weekList[myDate.getDay()];
    },
    setDate: function (days) {
      myDate.setDate(myDate.getDate() + days);
      return DATE.date();
    }
  }

  function format(item) {
    if (Number(item) < 10) {
      return '0' + item;
    } else {
      return item
    }
  }

  return DATE;
}

/**
 * 删除URL全部携带参数
 */
/* delUrlAllArguments(location.href) */
function delUrlAllArguments(address) {
  if (address.indexOf("?") != -1) {
    return address.split("?")[0];
  } else {
    return address;
  }
}

/**
 * 删除URL单个携带参数
 */
/*
  var url = delUrlArgument(location.href, 'lastIndex');
  url = delUrlArgument(url, '_id'); 
*/
function delUrlArgument(address, name) {
  var baseUrl = address.split('?')[0] + "?";
  var query = address.split('?')[1];
  if (query.indexOf(name) > -1) {
    var obj = {};
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    };
    delete obj[name];
    var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
    if (url.split('?')[1] == '') {
      url = url.split('?')[0];
    }
    return url;
  } else {
    return address;
  }
}


/**
 * @name scroll
 * @param {number} $width 滚动文字长度
 * @param {number} f_width 容器长度
 * @param {string} ele 滚动元素
 * @description 文字水平无限滚动
 */
function scroll($width, f_width, ele) {
  var temp = 0;
  if ($width > f_width) { //判断是否需要滚动
    var timer = setInterval(function () {
      roll($width, f_width, ele);
    }, 30);
  }

  function roll($width, f_width, ele) {
    temp++;
    ele.style.transform = "translateX(-" + temp + "px)";
    //当滚动条到达右边顶端时 
    if (temp == $width - f_width) {
      ele.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ele.innerHTML;
    }
    //当滚动条滚动了初始内容的宽度时滚动条回到最左端 
    if (temp >= $width + 28) {
      temp = 0;
      ele.style.transform = "translateX(0px)";
    }
  }
}

/**
 * @name startMove
 * @param {string} obj 动画元素
 * @param {obj} json 需要动画的属性
 * @param {function} fn 动画结束回调
 * @description 原生动画
 */

/*
  startMove(div, {
    width: 500,
    height: 350,
    opacity: 100
  }, callback)
*/
function startMove(obj, json, fn) {
  var all = true; //假设所有运动到达目标值
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    for (var attr in json) { //遍历取出json里的值
      //通过in操作符，取得当前的属性值
      var value = 0;
      if (attr === 'opacity') {
        value = Math.round(parseInt(getStyle(obj, attr) * 100))
      } else {
        value = parseInt(getStyle(obj, attr));
      }
      //计算速度
      var speed = (json[attr] - value) / 8;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (value !== json[attr]) {
        all = false;
      }
      // 设置属性
      if (attr === 'opacity') {
        obj.style.filter = 'alpha:(opacity:' + value + speed + ')';
        obj.style.opacity = (value + speed) / 100;
      } else {
        obj.style[attr] = value + speed + 'px';
      }
    }
    if (all) {
      clearInterval(obj.timer);
      if (fn) {
        fn()
      }
    } else {
      all = true;
    }
  }, 30)

  function getStyle(obj, attr) {
    if (obj.currentStyle) { //IE浏览器
      return obj.currentStyle[attr]
    } else { //Chrome浏览器
      return getComputedStyle(obj, false)[attr]
    }
  }
}
