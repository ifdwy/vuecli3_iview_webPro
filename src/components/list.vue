<template>
	<div>
		<List :header="title" :footer="footer" border>
			<ListItem v-for="(item, index) in listData" :key="index" >
				<ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
					<template slot="action">
						<li>
							<a :href="toUrl">更多</a>
						</li>
					</template>
			</ListItem>
		</List>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				listData: [],
				toUrl: '',
			}
		},
		props: ['title','footer'],
		created(){
			this.getListData();
		},
		methods:{
			getListData(){
				//模拟静态的json数据
				this.$http.get("/json/list1-3.json").then(res=>{
					this.listData =res.data;
				});
			}
		},
	}
</script>

<style>
</style>
