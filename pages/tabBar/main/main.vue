<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-master">
			<block slot="right"><navigator class="lg cuIcon-peoplefill" url="../../profile/profile" style="font-size: 50upx; margin-left: 20upx;"></navigator></block>
			<block slot="content">首页</block>
			<block slot="right"><navigator class="lg cuIcon-notice" style="margin-right: 20upx; font-size: 50upx;" url="../../warning/warning"></navigator></block>
		</cu-custom>

		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">工器具概况</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>

		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">工器具状态分布</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @touchstart="touchRadar"></canvas>
		</view>
		
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">备品备件状态分布</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasArea" id="canvasArea" class="chartsa" ></canvas>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uCharts from '@/components/u-charts/u-charts.js';

var _self;
// column(柱状图
var canvaColumn = null;
// radar(雷达图)
var canvaRadar = null;
// area(多重圆弧进度条)
var canvaArea = null;

export default {
	data() {
		return {
			cWidth:'',
			cHeight:'',
			pixelRatio:1,
			arcbarWidth:0,
			cServerData:'',// column
			rServerData:'',//radar
			aServerData:'',// area
			test : 1
		}
	},
	onLoad() {
		_self = this;
		this.cWidth=uni.upx2px(750);
		this.cHeight=uni.upx2px(380);
		
		// column
		this.getColumnServerData();
		// radar
		this.getRadarServerData();
		// area
		this.arcbarWidth=uni.upx2px(26);
		this.getAreaServerData();
	},
	methods: {
		// ---------------------------------------- column ----------------------------------------
		getColumnServerData(){
			/* uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data:{
				},
				success: function(res) {
					//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
					_self.cServerData=res.data.data;
					
				},
				fail: () => {
					_self.tips="网络错误，小程序端请检查合法域名";
				},
			}); */
			let Column={categories:[],series:[]};
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// Column.categories=res.data.data.Column.categories;
			// Column.series=res.data.data.Column.series;
			Column.categories.push("总数", "生产工器具", "安全工器具", "库存数", "借调数", "新购数", "报废数", "即将到期数", "超期未检数", "超期未还数", "超期服役数");
			Column.series.push({
				"name": "工器具概况",
				"data": [15, {"value": 20,"color": "#f04864"}, 45, 37, 43, 80, 99, 12, 52, 65, 23]
			  });
			_self.showColumn("canvasColumn",Column);
		},
		showColumn(canvasId,chartData){
			canvaColumn=new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'column',
				legend:{show:false},
				dataPointShape:true,
				fontSize:11,
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid:true,
					rotateLabel: true
				},
				yAxis: {
					//disabled:true
					disableGrid:true,
				},
				dataLabel: true,
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				extra: {
					column: {
						type:'group',
						width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
					}
				  }
			});

		},
		touchColumn(e){
			canvaColumn.showToolTip(e, {
				format: function (item, category) {
					if(typeof item.data === 'object'){
						return category + ' ' + item.name + ':' + item.data.value
					}else{
						return category + ' ' + item.name + ':' + item.data
					}
				}
			});
		},
		// ---------------------------------------- radar ----------------------------------------
		getRadarServerData(){
			/* uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data:{
				},
				success: function(res) {
					_self.rServerData = JSON.stringify(res.data.data.Radar);
				},
				fail: () => {
					_self.tips="网络错误，小程序端请检查合法域名";
				},
			}); */
			let Radar={categories:[],series:[]};
			// Radar.categories=res.data.data.Radar.categories;
			// Radar.series=res.data.data.Radar.series;
			Radar.categories.push("新增未入库", "待报废", "暂时封存", "待维修", "待试验", "使用中", "库存可用");
			Radar.series.push({
				"name": "生产工器具数",
				"data": [97, 120, 79, 137, 143, 20, 99]
			  },{
				"name": "安全工器具数",
				"data": [115, 20, 145, 37, 43, 80, 99]
			  });
			
			_self.showRadar("canvasRadar",Radar);
		},
		showRadar(canvasId,chartData){
			canvaRadar=new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'radar',
				fontSize:11,
				padding:[15,15,0,15],
				legend:{
					show:true,
					padding:5,
					lineHeight:11,
					margin:0,
				},
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				animation: true,
				dataLabel: true,
				categories: chartData.categories,
				series: chartData.series,
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				extra: {
					radar: {
						max: 200//雷达数值的最大值
					}
				}
			});
		},
		touchRadar(e){
			canvaRadar.touchLegend(e);
			canvaRadar.showToolTip(e, {
				format: function (item) {
					return item.name + ':' + item.data
				}
			});
		},
		// ---------------------------------------- area ----------------------------------------
		getAreaServerData(){
			let Area={series:[{name:'分数',data:123},{name:'排名',data:1001},{name:'排名',data:56}]};
			this.textarea = JSON.stringify(Area);
			this.showArea("canvasArea",Area);
		},
		showArea(canvasId,chartData){
			let border=this.arcbarWidth;
			let aWidth=this.cWidth/2-border;
			let aHeight=this.cHeight-border;
			let radius=(aWidth*aWidth+aHeight*aHeight)/aHeight/2;
			let centerPoint={
				x:this.cWidth/2*this.pixelRatio,
				y:(radius+border)*this.pixelRatio
			};
			canvaArea=new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'arcbar',
				fontSize:11,
				// colors:['#FF0000','#FF7F00','#FFFF00'],
				legend:{show:false},
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				extra: {
					arcbar:{
						type:'default',
						width: border*_self.pixelRatio,
						backgroundColor:'rgba(233,233,233,0.4)',
						startAngle:9999,
						endAngle:1,
						radius:radius*_self.pixelRatio,
						gap:5*_self.pixelRatio,
						center:centerPoint
					}
				}
			});
			
		},
	}
}
</script>

<style>
page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
.qiun-common-mt{
	margin-top:10upx;
}
.qiun-bg-white{
	background:#FFFFFF;
}
.qiun-title-bar{
	width: 100%;
	padding: 10upx 2%;
	flex-wrap:nowrap;
}
.qiun-title-dot-light{
	border-left: 10upx solid #0ea391;
	padding-left: 10upx;
	font-size: 32upx;
	color: #000000
}
.qiun-charts{
	width: 750upx;
	height:380upx;
	background-color: #FFFFFF;
}
.charts{
	width: 750upx;
	height:380upx;
	background-color: #FFFFFF;
}
</style>
