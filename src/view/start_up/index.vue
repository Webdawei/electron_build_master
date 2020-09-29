<!-- 启动页 -->
<template>
	<div class="start-up">
		<clientTop />
		<div class="carousel-div">
			<div class="carousel">
				<el-carousel indicator-position="outside" :autoplay="false">
					<el-carousel-item v-for="item in carouselList" :key="item.id">
						<img :src="item.url">
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="experience-now">
				<span @click="toIndex">立即体验</span>
			</div>
		</div>
	</div>
</template>

<script>
import clientTop from '@/components/clientTop.vue';
export default {
	name: 'start-up',
	components: {clientTop,},
	data() {
		return {
			carouselList:[
				{
					id:1,
					url:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1695848480,483933094&fm=26&gp=0.jpg",
				},
				{
					id:2,
					url:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2242237789,3815354431&fm=15&gp=0.jpg",
				},
				{
					id:3,
					url:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2947063512,1325628145&fm=26&gp=0.jpg",
				},
			],
		};
	},
	created() {},
	mounted() {
		this.$success("成功引入ElementUI");
		this.$electron.send('changeWinSize',"900,600");
		this.$electron.send('changeWinPositionByScreen',window.screen.width+","+window.screen.height+",1000,600");
	},
	methods: {
		// 跳转系统首页
		toIndex(){
			this.$router.push({
				path:"/home",
				query:{
					from:'start_up'
				}
			});
		},
	}
};
</script>

<style scoped>
.carousel-div{width: 100%;height: calc(100vh - 40px);position: relative;padding-top: 40px;background-color: white;}
.carousel{width: 390px;height: 360px;margin: 0 auto;}
.el-carousel__item h3 {color: #475669;font-size: 18px;opacity: 0.75;line-height: 300px;margin: 0;}
.el-carousel__item:nth-child(2n) {background-color: #99a9bf;}
.el-carousel__item:nth-child(2n+1) {background-color: #d3dce6;}
.carousel >>> .el-carousel__indicator--horizontal{width: 8px;height: 8px;margin: 20px 5px;}
.carousel >>> .el-carousel__indicator--horizontal .el-carousel__button{width: 8px;height: 8px;border-radius: 8px;}
.carousel >>> .el-carousel__indicators--outside button{background-color: #409eff;}
.experience-now{text-align: center;}
.experience-now span{text-align: center;display: inline-block;width: 240px;height: 56px;line-height: 56px;background-color: #409eff;color: white;border-radius: 3px;font-size: 20px;cursor: pointer;}
</style>
