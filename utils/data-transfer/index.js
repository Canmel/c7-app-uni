const transfer = {};
transfer.commonTransfer = function(data, base, formate, tag, options) {
	const result = [];
	if (data && data.length > 0) {
		data.forEach(function(value, index) {
			const item = {};
			item.data = [];
			for (let key in formate) {
				const itemData = {};
				if (key === 'createdAt') {
					const date = new Date(value[key]);
					const Y = date.getFullYear() + '-';
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
					const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
					const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
					const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
					const sdata = Y + M + D + h + m + s;
					itemData.value = sdata;
					item.data.push(itemData);
				} else if (key.indexOf('.') > -1) {
					const tmpKey = key.split('.');
					itemData.value = value[tmpKey[0]] ? value[tmpKey[0]][tmpKey[1]] : '';
					item.data.push(itemData);
				} else {
					itemData.value = value[key];
					item.data.push(itemData);
				}
				itemData.name = formate[key];

			}
			for (let key in base) {
				item[key] = value[base[key]];
			}
			if(base['image']) {
				item['image'] = base['image']
			}
			// tag
			if (tag) {
				item.tags = [];
				if (value[tag.name] === '0' || value[tag.name] === 0) {
					item.tags.push({
						name: '移除',
						color: 'red'
					})
				}
				if (value[tag.name] === '1' || value[tag.name] === 1) {
					item.tags.push({
						name: '正常',
						color: 'green'
					})
				}
			}

			if (options) {
				item.options = options;
			}

			if (value['remark']) {
				item.desc = value['remark'];
			}
			result.push(item);
		});
	}
	return result;
}

export {
	transfer
}

// {
// 	name: '手提式强光巡检工作灯',
// 	image: 'static/img/drawable-xhdpi/shoutao.png',
// 	data: [{
// 			name: '登记总数',
// 			value: '12',
// 			icolor: 'green'
// 		},
// 		{
// 			name: '超期未检',
// 			value: '1',
// 			icon: 'search',
// 			icolor: 'yellow'
// 		},
// 		{
// 			name: '在库',
// 			value: '11'
// 		},
// 		{
// 			name: '试验到期',
// 			value: '0'
// 		},
// 		{
// 			name: '离枯',
// 			value: '1'
// 		},
// 		{
// 			name: '超期服役',
// 			value: '3',
// 			icolor: 'red'
// 		}
// 	],
// 	tags: [{
// 		name: '正常',
// 		color: 'green'
// 	}, {
// 		name: '未充电',
// 		color: 'red'
// 	}],
// 	options: [{
// 		name: '编辑',
// 		method: 'details',
// 		color: 'gray'
// 	}, {
// 		name: '删除',
// 		method: 'delete',
// 		color: 'red'
// 	}]
// }, {
// 	name: '手提式强光巡检工作灯',
// 	image: 'static/img/drawable-xhdpi/shoutao.png',
// 	data: [{
// 			name: '登记总数',
// 			value: '12',
// 			icolor: 'green'
// 		},
// 		{
// 			name: '超期未检',
// 			value: '1',
// 			icon: 'search',
// 			icolor: 'yellow'
// 		},
// 		{
// 			name: '在库',
// 			value: '11'
// 		},
// 		{
// 			name: '试验到期',
// 			value: '0'
// 		},
// 		{
// 			name: '离枯',
// 			value: '1'
// 		},
// 		{
// 			name: '超期服役',
// 			value: '3',
// 			icolor: 'red'
// 		}
// 	],
// 	tags: [{
// 		name: '正常',
// 		color: 'green'
// 	}, {
// 		name: '未充电',
// 		color: 'red'
// 	}],
// 	options: [{
// 		name: '编辑',
// 		method: 'details',
// 		color: 'gray'
// 	}, {
// 		name: '删除',
// 		method: 'delete',
// 		color: 'red'
// 	}]
// }
