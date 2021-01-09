<style type="text/css">
    /*****查询条件中的箭头*****/
    .ivu-icon-ios-arrow-forward{
        float: right;
        margin-top: 10px;
        font-size: 18px;
    }
    .querySpan{
        margin-right: 10px; 
    }
    .col{
        margin-bottom: 10px;
    }
    .queryBtn{
        margin-left: 15px;
    }

</style>
<template>
    <div class="">
        <Collapse v-model="value1">
            <Panel name="1">
                <h5 style="float: left;">查询条件</h5>
                <div slot="content">
                    <Row v-for="(query, index) in queryList" type="flex" justify="space-between" :key="index">
                        <Col span="3" v-for="(list, ins) in query" :key="ins"  :class="['col']">
                            <!--input框-->
                            <div v-if="list.typeList == 'input'">
                                <span class="querySpan">{{list.queryText}}：</span>
                                <Input v-model="list.queryValue" :placeholder="list.queryText" clearable style="width: 200px;" />
                            </div>
                            <!--select框-->
                            <div v-if="list.typeList == 'select'">
                                <span class="querySpan">{{list.queryText}}：</span>
                                    <Select v-model="list.queryValue" clearable style="width:200px">
                                        <Option v-for="item in list.option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                            </div>
                            
                        </Col>
                    </Row> 
                    <div>
                        <Button type="primary" @click="submit">查询</Button>
                        <Button type="warning" :class="['queryBtn']" @click="rest">重置</Button>
                    </div>

                </div>
            </Panel>
        </Collapse>
    </div>
</template>
<script>
    export default {
        data(){
            let url="";
            if (this.menueId ==1) {
                url ="/json/queryList.json";
            }else if (this.menueId ==2) {
                url ="/json/queryList1-2.json";
            }
            this.$http.get(url).then((res)=>{
                this.queryList = res.data;
                console.log("this.queryList===>", this.queryList)
            })
            return {
                value1: '1',
                queryList: []
            }
        },
        props:{
            menueId: Number
        },
        watch:{
            menueId(){
                let url="";
                if (this.menueId ==1) {
                    url ="/json/queryList.json";
                }else if (this.menueId ==2) {
                    url ="/json/queryList1-2.json";
                }
                this.$http.get(url).then((res)=>{
                    this.queryList = res.data;
                })
                return{
                    queryList: []
                }
            }
        },
        // //  在页面初始化的时候发送请求
        // created(){
        //     // 获取查询条件列表
        //     this.getQueryList();
        // },
        methods:{
            // //  获取查询条件列表
            // getQueryList(){
            //     this.$http.get("json/queryList.json").then(queryRes=>{
            //         this.queryList = queryRes.data;
            //     })
            // },
            //  查询按钮事件
            submit(){
                let queryArr=[];
                let map={};
                for(let item of (this.queryList).flat()){
                    if (item.queryValue !="" && item.queryValue !=undefined) {
                        map={
                            "queryName": item.queryName,
                            "queryValue": item.queryValue
                        }
                        queryArr.push(map);
                    }
                }
                if (queryArr.length !=0) {
                    //  根据不同的查询菜单栏发送请求
                    console.log("queryArr=============>", queryArr);
                    if (this.menueId ==1) {
                        this.$http.post("/queryList", queryArr).then(res=>{
                            console.log("查询成功!")
                        })
                    }else if(this.menueId ==2){
                        this.$http.post("/queryList1-2", queryArr).then(res=>{
                            console.log("查询1-2成功!")
                        })
                    }

                }else{
                    console.log("没有查询条件")
                }
                
            },
            //  重置按钮事件
            rest(){
                for(let item of (this.queryList).flat()){
                    item.queryValue ='';
                }
            }
        }
    }


</script>
