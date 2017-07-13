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
