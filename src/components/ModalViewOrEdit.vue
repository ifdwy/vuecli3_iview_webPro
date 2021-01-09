<style type="text/css">
    .ivu-input[disabled]{
        color: #000000c2;
    }
</style>
<template>
    <div>
        <Form :label-width="80">
            <FormItem v-for="(item, index) in detail.colName" v-if="item.slot !='action'" :label="item.title">
                <div v-for="[key, val] of Object.entries(detail.tabData)"> 
                    <!--查看基本信息-->
                    <div  v-if="detail.flag == 'view'">
                        <Input v-if="detail.flag == 'view' && item.slot == key" v-model="val" :name="key" :value="val" disabled></Input>
                    </div>
                    <!--编辑基本信息-->
                    <div v-else-if="detail.flag == 'edit'">
                        <!--input框-->
                        <div v-if="item.type =='input'"> 
                            <Input v-if="item.slot == key" :name="key" v-model="val" :value="val" @on-blur="getInputVal"></Input>
                        </div>
                        <!--select框-->
                        <div v-if="item.type =='select'"> 
                            <Select v-if="item.slot == key" :name="key" v-model="val" @on-change="selectVal" :label-in-value="true">
                                <Option v-for="(op, ops) in item.option" :value="op.name" :key="ops.code">{{ op.name }}</Option>
                            </Select>
                        </div>
                        <!--树 行政区划树-->
                        <div v-if="item.type =='tree' && item.slot == key && item.treeType == 'deptTree'"> 
                            <Input :name="key" v-model="val" ref="treeVal" :value="val" @on-focus="showZtree" @on-change="inputChange"></Input>
                            <Modal v-model="showModal" :mask="false" @on-ok="ok">
                                <DeptTree @nodeTitle="childVal"></DeptTree>
                            </Modal>
                        </div>
                        <!--树 所属组织划树-->
                        <div v-if="item.type =='tree' && item.slot == key && item.treeType == 'organizationTree'"> 
                            <Input :name="key" v-model="val" ref="orgTreeVal" :value="val" @on-focus="showOrgZtree" @on-change="inputChange"></Input>
                            <Modal v-model="showOrgModal" @on-ok="okOrg">
                                <OrgTree @nodeOrgTitle="childOrgVal"></OrgTree>
                            </Modal>
                        </div>
                    </div>
                    <!-- <Input v-if="detail.flag == 'view' && item.slot == key" v-model="val" :name="key" :value="val" disabled></Input> -->
                    <!-- <Input v-else-if="detail.flag == 'edit' && item.slot == key" :name="key" v-model="val" :value="val" @on-blur="getVal"></Input> -->
                </div> 
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import DeptTree from '@/components/deptTree.vue'
    import OrgTree from '@/components/orgTree.vue'
    export default {
        data () {
            return {
                nodeName:'',
                nodeOrgName:'',
                showModal: false,
                showOrgModal: false,
                detail: {}
            }
        },
        components:{
            DeptTree,
            OrgTree
        },
        props: {
            value: Object
        },
        created () {
            this.init();
        },
        watch:{
            value (data) {
              this.init();
            }
        },
        methods: {
            init () {//  获取字段中文名/填充的字段内容
                this.detail = this.value;
                console.log("this.detail 编辑================>", this.detail)
            },
            getInputVal(e){//   input框失焦后将input框里的内容传给父组件
                this.$emit("colText", {
                    name: e.target.name,
                    val: e.target.value
                })
            },
            selectVal(data){//  下拉框选中之后将值传给父组件
                this.$emit("colSelectText", {
                    // name: e.target.name,
                    // val: e.target.value
                })
                console.log("data==========>", data)
                // 用这种方法行不通         
                
                




            },
            showZtree(){//  弹出不同的树
                this.showModal = true;
            },
            showOrgZtree(){//  弹出不同的树
                this.showOrgModal = true;
            },
            ok(){// 行政区划树的确定事件,将节点名传回input框
                this.$refs.treeVal[0].currentValue = this.nodeName
            },
            okOrg(){// 所属组织树的确定事件,将节点名传回input框
                this.$refs.orgTreeVal[0].currentValue = this.nodeOrgName
            },
            childVal(data){// 子组件传过来的选中的行政节点名
                this.nodeName =data;
            },
            childOrgVal(data){// 子组件传过来的选中的行政节点名
                this.nodeOrgName =data;
            },
            inputChange(e){
                console.log("input框内容发生改变============>", e)

            }
            
        }
    }
</script>
