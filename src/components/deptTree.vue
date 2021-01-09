<template>
	<div>
		<h2>行政区划树</h2>
		<Tree ref="tree" :data="data1" @on-select-change="selectVal"></Tree>
	</div>
    
</template>
<script>
    export default {
        data () {
            return {
                data1: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
        	selectVal(arr, item){
        		// console.log("item===========>", item.title)
        		this.$emit("nodeTitle", item.title)
                // this.$emit("nodeOrgTitle", item.title)
        	}
        }
    }
</script>
