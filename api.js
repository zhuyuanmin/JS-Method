/*
*$(name) 传一个参数表示获取该节点；可以是id，类，标签；类和标签是数组集合。
>例如:【$('#list') || $('.left') || $('li')】
*$(name, prop) 传两个参数表示获取该节点下的样式值；目前只支持width, height, top, left;另外用类和标签选择器只对第一个操作。
>例如:【$('#list','width') || $('.left', 'top') || $('li', 'height')】
*$(name, prop, value) 传三个参数表示对该节点进行样式或者属性设置，用类和标签选择器只对第一个操作；如果第二个参数是class，表示添加类名，用类和标签选择器表示对所有节点操作。
>例如: 【$('#list','width', '300px') || $('.left', 'id', 'list') || $('li', 'class', 'active')】

*Date: 2017-7-13
*By: zym
*/
function $(name, prop, value) {
	if (name && !prop && !value) {
		if (/^#/.test(name)) {
			return  document.getElementById(name.replace(/#/, ''));
		} else if (/^\./.test(name)) {
			return document.getElementsByClassName(name.replace(/\./, ''));
		} else {
			return document.getElementsByTagName(name);
		}
	} else if (name && prop && !value) {
		if (/^#/.test(name)) {
			if (prop == 'top' || prop == 'left') {
				return  document.getElementById(name.replace(/#/, ''))['offset' + prop.charAt(0).toUpperCase() + prop.slice(1)];
			} else if (prop == 'width' || prop == 'height') {
				return  document.getElementById(name.replace(/#/, ''))['client' + prop.charAt(0).toUpperCase() + prop.slice(1)];
			}			
		} else if (/^\./.test(name)) {
			if (prop == 'top' || prop == 'left') {				
				return document.getElementsByClassName(name.replace(/\./, ''))[0]['offset' + prop.charAt(0).toUpperCase() + prop.slice(1)];
			} else if (prop == 'width' || prop == 'height') {
				return document.getElementsByClassName(name.replace(/\./, ''))[0]['client' + prop.charAt(0).toUpperCase() + prop.slice(1)];
			}						
		} else {
			if (prop == 'top' || prop == 'left') {				
				return document.getElementsByTagName(name)[0]['offset' + prop.charAt(0).toUpperCase() + prop.slice(1)];
			} else if (prop == 'width' || prop == 'height') {
				return document.getElementsByTagName(name)[0]['client' + prop.charAt(0).toUpperCase() + prop.slice(1)];
			}
		}
	} else if (name && prop && value) {
		if (/^#/.test(name)) {
			var arr = ['top', 'left', 'width', 'height', 'display', 'opacity', 'transform', 'color', 'fontSize', 'backgroundColor', 'float', 'border', 'margin'];
			if (arr.indexOf(prop) != -1) {
				document.getElementById(name.replace(/#/, '')).style[prop] = value;
				return;
			} else if (prop == 'class') {
				document.getElementById(name.replace(/#/, '')).className += " " + value;
				return;
			} else {
				document.getElementById(name.replace(/#/, '')).setAttribute(prop, value);
				return;
			}			
		} else if (/^\./.test(name)) {
			var arr = ['top', 'left', 'width', 'height', 'display', 'opacity', 'transform', 'color', 'fontSize', 'backgroundColor', 'float', 'border', 'margin'];
			if (arr.indexOf(prop) != -1) {				
				document.getElementsByClassName(name.replace(/\./, ''))[0].style[prop] = value;
				return;
			} else if (prop == 'class') {
				var o = document.getElementsByClassName(name.replace(/\./, ''));
				for (var i = 0; i < o.length; i ++) {
					o[i].className += " " + value;
				}				
				return;
			} else {
				document.getElementsByClassName(name.replace(/\./, ''))[0].setAttribute(prop, value);
				return;
			}						
		} else {
			var arr = ['top', 'left', 'width', 'height', 'display', 'opacity', 'transform', 'color', 'fontSize', 'backgroundColor', 'float', 'border', 'margin'];
			if (arr.indexOf(prop) != -1) {				
				document.getElementsByTagName(name)[0].style[prop] = value;
				return;
			} else if (prop == 'class') {
				var o = document.getElementsByTagName(name);
				for (var i = 0; i < o.length; i ++) {
					o[i].className += " " + value;
				}				
				return;
			} else {
				document.getElementsByTagName(name)[0].setAttribute(prop, value);
				return;
			}	
		}
	}
}

/* 封装ajax函数
 2  * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 3  * @param {string}opt.url 发送请求的url
 4  * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 5  * @param {object}opt.data 发送的参数，格式为对象类型
 6  * @param {function}opt.success ajax发送并接收成功调用的回调函数
 7  */
function ajax(opt) {
	opt = opt || {};
	opt.method = opt.method.toUpperCase() || 'POST';
	opt.url = opt.url || '';
	opt.async = opt.async || true;
	opt.data = opt.data || null;
	opt.success = opt.success || function () {};
	var xmlHttp = null;
	if (XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
	else {
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}var params = [];
	for (var key in opt.data){
		params.push(key + '=' + opt.data[key]);
	}
	var postData = params.join('&');
	if (opt.method.toUpperCase() === 'POST') {
		xmlHttp.open(opt.method, opt.url, opt.async);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xmlHttp.send(postData);
	}
	else if (opt.method.toUpperCase() === 'GET') {
		xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
		xmlHttp.send(null);
	} 
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			opt.success(xmlHttp.responseText);
		}
	};
 }
 
 /*
 *时间日期格式化
 *Date: 2017-7-14
 *By: zym
 */
var myDate = new Date();
var weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

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
	}
};
function format(item) {
	if (item < 10) {
		return '0' + item;
	} else {
		return item;
	}
}