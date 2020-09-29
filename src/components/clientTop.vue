<!-- 客户端顶部拖放 -->
<template>
	<div class="client-top">
		<div class="su-top" id="su-top">
			<div class="su-top-left">
				<img src="" alt="">
				<span>Electron客户端开发小工具</span>
			</div>
			<div class="su-top-right win-operate-div">
				<i class="win-operate el-icon-minus" title="最小化" @click="toMinimize"></i>
				<i class="win-operate" :class="maximize?'el-icon-crop':'el-icon-full-screen'" :title="maximizeTitle" @click="toMaximize"></i>
				<i class="win-operate el-icon-close" title="关闭" @click="toClose"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'client-top',
	components: {},
	data() {
		return {
			maximize:false,// 是否最大化
			maximizeTitle:'最大化',
		};
	},
	mounted() {
		let _this = this;
		dragElement(document.getElementById(("su-top")));
		function dragElement(elmnt) {
			let [pos1,pos2,pos3,pos4] = [0,0,0,0];
			if (document.getElementById(elmnt.id + "header")) {
				/* if present, the header is where you move the DIV from:*/
				document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
			} else {
				/* otherwise, move the DIV from anywhere inside the DIV:*/
				elmnt.onmousedown = dragMouseDown;
			}
			function dragMouseDown(e) {
				e = e || window.event;
				// get the mouse cursor position at startup:
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				document.onmousemove = elementDrag;
			}
		
			function elementDrag(e) {
				e = e || window.event;
				var param = e.movementX + "," + e.movementY;
				_this.$electron.send('changeWinPosition',param);
			}
			function closeDragElement() {
				/* stop moving when mouse button is released:*/
				document.onmouseup = null;
				document.onmousemove = null;
			}
		}
	},
	methods: {
		// 最小化
		toMinimize(e){
			e.stopPropagation();
			this.$electron.send('toMinimize');
		},
		// 最大化&还原
		toMaximize(e){
			e.stopPropagation();
			this.maximize = !this.maximize;
			if(this.maximize){
				this.maximizeTitle = "还原";
			}else{
				this.maximizeTitle = "最大化";
			}
			if (window.require) {
				this.$electron.send('toMaximize');
			}
		},
		// 关闭窗口并结束进程
		toClose(){
			this.$electron.send('close');
		},
	}
};
</script>

<style scoped>
.su-top{position: relative;height: 40px;z-index: 20;overflow: hidden;background-color: white;}
.su-top-left{float: left;padding-left: 20px;line-height: 40px;}
.su-top-left img{width: 25px;height: 15px;background-color: #333;vertical-align: middle;display: inline-block;margin-right: 10px;}
.su-top-left span{font-size: 14px;color: #7A8199;vertical-align: middle;}
.su-top-right{float: right;width: 100px;height: 40px;line-height: 40px;padding-right: 10px;}
.win-operate-div{width: 100px;height: 40px;line-height: 40px;padding-right: 10px;position: absolute;right: 0;top: 0;}
.win-operate-div .separate-line{margin: 0 5px;}
.win-operate-div i{display: inline-block;width: 30px;height: 30px;line-height: 30px;text-align: center;vertical-align: middle;cursor: pointer;color: #333;font-size: 16px;}
.win-operate-div .win-operate:hover{background-color: #e1e1e1;}
.win-operate-div .win-operate:last-child:hover{color: white;background-color: #FF0000;}
.win-operate-div .current-company{line-height: 40px;vertical-align: middle;margin-right: 10px;}
.win-operate-div .current-company i{width: 16px;height: 16px;vertical-align: middle;padding: 0;line-height: 16px;margin-left: 10px;position: relative;top: -2px;color: #eef121;}
</style>
