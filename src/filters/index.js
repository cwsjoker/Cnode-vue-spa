// 时间格式YYYY-MM-DD HH:mm:ss 转化为YYYY-MM-DD
export function getDateTime(dataTime) {
	let time = dataTime;
	let str = time.substring(0, 10);
	return str;
}

// 获取本帖的标签
export function getArticleTab(tab, good, top) {
	let str = '';
	if (top) {
		str = '置顶';
	} else if (good){
		str = '精华';
	} else {
		switch(tab) {
			case 'share':
				str = '分享';
				break;
			case 'ask':
				str = '问答';
				break;
			case 'job':
				str = '招聘';
				break;
			default:
                str = "无";
                break;
		}
	}
	return str;
}

// 判断是否为置顶或是精华的帖子
export function getArticleClass(good, top) {
	let className = '';
	if (top) {
		className = 'put_top';
	} else if (good) {
		className = 'put_good';
	} else {
		className = '';
	}
	return className;
}

// 判断发帖时间与现在时间的间隔
export function getLastTime(creatTime) {
	let oldtime = new Date(creatTime);
	let newtime = (new Date() - oldtime)/1000;
	let month = Math.floor(newtime/3600/24/30);
	let day = Math.floor(newtime/3600/24);
	let hours = Math.floor(newtime/3600);
	let mins = Math.floor(newtime/60);
	let str = '';
	if (hours === 0) {
		if (mins <= 3) {
			str = '刚刚';
		} else {
			str = mins + '分钟前';
		}
	} else if (day === 0){
		str = hours + '小时前';
	} else if (month === 0){
		str = day + '天前';
	} else {
		str = month + '月前';
	}
	return str;
}