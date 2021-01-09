<style type="text/css">
    .tablist{
        margin-top: 10px;
    }
</style>
<template>
    <div class="TabList">
        <Table border :columns="columns" :data="data" :class="['tablist']">
            <template v-for="(item, ins) in columns" slot-scope="{ row, index }" :slot="item.slot">
                
                <strong v-if=" item.slot == 'name'"> {{row.name}} </strong>
                <strong v-else-if=" item.slot == 'age'"> {{row.age}} </strong>
                <strong v-else-if=" item.slot == 'address'"> {{row.address}} </strong>
                

                <strong v-else-if=" item.slot == 'action'"> 
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
        data () {

            return {
                columns: [],
                data: [],
                editData:{}
            }
        },
        created(){
            this.getTabList();
        },
        methods: {
            getTabList(){
                this.$http.get("/json/TabList1-2.json").then(res=>{
                    this.columns =res.data[0].columns;
                    this.data =res.data[1].content;
                });
            },
            show (index) {
                this.$Modal.info({
                    title: '查看menue1-1信息',          
                    render: (h) => {            
                        return h(ModalViewOrEdit, {//在此处使用引入的组件
                            props: {
                                value: {
                                  name: this.data[index].name,
                                  age: this.data[index].age,
                                  address: this.data[index].address,
                                  flag: 'view'
                                }
                            },
                        })
                    },          
                    width: 600,          
                    closable: false,          
                    okText: "确定",         
                    cancelText: "取消",          
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
                                    name: this.data[index].name,
                                    age: this.data[index].age,
                                    address: this.data[index].address,
                                    flag: 'edit'
                                },
                                autofocus: true,
                                placeholder: 'Please enter...'
                            },
                            on:{
                                name: (val)=>{
                                    this.editData.name =val;
                                },
                                age: val=>{
                                    this.editData.age =val;
                                },
                                address: val=>{
                                    this.editData.address =val;
                                }

                            }
                        })
                    },
                    width: 600,          
                    closable: false,          
                    okText: "确定",         
                    cancelText: "取消",          
                    loading: true,
                    onOk: ()=>{
                        //  this.editData 是表单里的最新数据,提交给后端,然后关闭弹窗,刷新表格
                        setTimeout(() => {
                            this.loading = false;
                            
                            if (this.editData.name == undefined && this.editData.age == undefined &&　this.editData.address == undefined) {
                                console.log("数据未发生变化")
                            }else{
                                //  提交给后端
                                console.log("表单的最新数据=================>", this.editData)
                            }
                            this.$Modal.remove();
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
