<style type="text/css">
	.tablist{
		margin-top: 10px;
	}
</style>
<template>
	<div class="TabList">
	    <Table border :columns="columns" :data="data" :class="['tablist']">
	    	<template v-for="(item, ins) in columns" slot-scope="{ row, index }" :slot="item.slot">
                <div v-for="[key, val] of Object.entries(row)" > 
                    <strong v-if="item.slot == key"> {{val}} </strong>
                </div> 
                <strong v-if=" item.slot == 'action'"> 
                    <Button type="info" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                    <Button type="warning" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button> 
                </strong>
	    	</template>
	    </Table>
    </div>
</template>
<script>
    import ModalViewOrEdit from '@/components/ModalViewOrEdit.vue'
    export default {
    	inject: ['reload'],
        data () {
            return {
            	columns: [],
            	data: [],
                editData:[]
            }
        },
       	created(){
       		this.getTabList();
       	},
        methods: {
        	getTabList(){
                //  列名
        		this.$http.get("/json/TabList1-1.json").then(res=>{
        			this.columns =res.data[0].columns;
                });
                 // 获取表格里的内容
                this.$http.get("/api/camera/queryList").then(res=>{
                    this.data =res.data.data;
                })
        	},
            show (index) {
                this.$Modal.info({
                    title: '查看menue1-1信息',          
                    render: (h) => {            
                        return h(ModalViewOrEdit, {//在此处使用引入的组件
                            props: {
                                value: {
                                    colName: this.columns,
                                    tabData: this.data[index],
                                    flag: 'view'
                                }
                            },
                        })
                    },          
                    width: 600,          
                    closable: true,          
                    okText: "确定",              
                    loading: false
                })
            },
            edit(index){
            	this.$Modal.confirm({
                    title: '编辑menue1-1信息',  
                    render: (h) => {
                        return h(ModalViewOrEdit, {
                            props: {
                                value: {
                                    colName: this.columns,
                                    tabData: this.data[index],
                                    flag: 'edit'
                                },
                                autofocus: true,
                                placeholder: 'Please enter...'
                            },
                            on:{
                                colText:(res)=>{    
                                    this.editData.push(res);
                                },
                                colSelectText:(res)=>{
                                    console.log("res=============>", res)
                                }

                            }
                        })
                    },
                    width: 600,          
                    closable: true,          
                    okText: "确定",         
                    cancelText: "取消",          
                    loading: true,
                    onOk: ()=>{
                        //  this.editData 是表单里的最新数据,提交给后端,然后关闭弹窗,刷新表格
                        setTimeout(() => {
                            this.loading = false;
                            
                            if (this.editData.length == 0){
                                console.log("数据未发生变化")
                            }else{
                                //  提交给后端
                                console.log("表单的最新数据=================>", this.editData)
                            }
                            this.$Modal.remove();
                            //  刷新表格组件
                            this.reload();
                        }, 2000);
                    }
                })
            },
            remove (index) {
                this.data.splice(index, 1);
            }
        }
    }
</script>
