<template>
	<div class="menue1-3">
		<div class="_top">
			<Carousel autoplay v-model="value1" class="lunboHeight">
				<CarouselItem>
					<img src="../../public/img/bgTittle.png" class="lunboImg">
				</CarouselItem>
				<CarouselItem>
					<img src="../../public/img/bg.png" class="lunboImg">
				</CarouselItem>
			</Carousel>
		</div>
		<div class="_bottom">
			<div class="_bottomL">
				<listShow :title="listTitle"></listShow>
			</div>
			<div class="_bottomR">_bottomR</div>
		</div>
	</div>
</template>

<script>
	import listShow from '../components/list.vue'
	export default {
	    components:{
	        listShow
	    },
		data () {
			return {
				split2: 0.5,
				value1: 0,
				listTitle: "消息展示列表",
				listData: [],
			}
		},
		created(){
		    this.getListData();
		},
		methods:{
			getListData(){
				this.$http.get("/json/list1-3.json").then(res=>{
				    this.listData =res.data;
				});
			}
		}
	    
	}
</script>

<style lang="less">
	.menue1-3{
		display: flex;
		flex-direction: column;
		flex: 1;
		._top{
			order: 1;
			height: 12.5rem;
			background-color: #eef0f1;
			.lunboHeight{
				height: 12.5rem;
				.lunboImg{
					width: 100%;
					height: 12.5rem;
				}
			}
		}
		._bottom{
			order: 2;
			padding-top: 1.25rem;
			display: flex;
			flex-direction: row;
			flex: 1;
			justify-content: space-between;
			._bottomL{
				order: 1;
			}
			._bottomR{
				order: 2;
			}
		}
	}
	// list列表样式修改
	@alignL: left;
	.textAlign{
		text-align: @alignL;
	}
	.ivu-list-header{
		color: #2D8CF0;
		background-color: #e4eaf1;
		.textAlign();
	}
	.ivu-list-item-meta-title{
		.textAlign();
	}
	
</style>
