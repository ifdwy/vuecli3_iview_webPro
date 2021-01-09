<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.bgcolor{
	background-color: #fff;
}
.padding{
	padding: 0 24px 24px;
}
.margin{
	margin: 24px 0;
    padding-right: 1514px;
}
.minHeight{
	min-height: 580px;
}
.newPadding{
	padding: 24px;
}

/***重写iview****/
.ivu-layout-header{
	background: #2d8cf0;
}

</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="primary" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger>
                    <!-- <Menu ref="menu" theme="dark" :open-names="['1']" :active-name="activeName"  width="auto" accordion @on-select="menueRouter">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                内容管理
                            </template>
                            <MenuItem name="1-1">文章管理</MenuItem>
                            <MenuItem name="1-2">评论管理</MenuItem>
                            <MenuItem name="1-3">举报管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people" />
                                用户管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>
                    </Menu> -->
                	<Menu ref="menu" :open-names="openname" :active-name="activeName" theme="dark" width="auto" accordion @on-select="menueRouter" @on-open-change="getPosition">
                        <Submenu v-for="(menue, index) in menues" :name="menue.name" :key="index">
                            <template slot="title">
                                <Icon :type="menue.icon"></Icon>
                                    {{menue.name}}
                                </template>
                            <MenuItem v-for="(child, ins) in menue.childrens" :name="child.name"  :key="ins">
                                {{child.name}}
                            </MenuItem>
                            <!--嵌套子菜单 -->
                            <div v-if="menue.level">
                                <Submenu v-for="(leve, inx) in menue.level" :name="leve.name" :key="inx">
                                    <template slot="title">
                                        <Icon :type="leve.icon"></Icon>
                                            {{leve.name}}
                                    </template>
                                    <MenuItem v-for="(levechild, inss) in leve.childrens" :name="levechild.name"  :key="inss">
                                        {{levechild.name}}
                                    </MenuItem>
                                </Submenu>
                            </div>
                        </Submenu>
                    </Menu> 
                </Sider>
                <Layout :class="['padding']">
                    <!-- <Breadcrumb :class="['margin']">
                        <BreadcrumbItem>{{parentPosition}}</BreadcrumbItem>
                        <BreadcrumbItem>{{position}}</BreadcrumbItem>
                    </Breadcrumb> -->
                    <Content :class="['newPadding', 'bgcolor', 'minHeight']">
						<router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
    	name: "layout",
    	data(){
    		return {
    			menues: [],
                parentPosition: '',
                position: '',
                openname: [],
                activeName: ''
    		}
    	},
        mounted() {
            this.getMenu();
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
                this.$refs.menu.updateActiveName();
            })
        },
        methods:{
            //  获取菜单栏列表
            getMenu(){
                this.$http.get("/json/menues.json").then(res=>{
                    this.menues =res.data;
                })
            },
            //  展开菜单栏
            getPosition(name){
                this.parentPosition = name[0];
                this.position ='';
            },
        	//	点击具体菜单栏
        	menueRouter(name){
        		//	根据name的不同跳转至不同的页面
        		this.$router.push("/index/"+name).catch(err =>{err})
                this.position = name;
        	}
        }
    }
</script>