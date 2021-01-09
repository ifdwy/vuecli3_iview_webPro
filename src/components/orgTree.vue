<template>
	<div>
		<h2>所属组织树</h2>
		<Tree ref="orgTree" :data="data" @on-select-change="selectVal"></Tree>
	</div>
    
</template>
<script>
    export default {
        data () {
            return {
                data: [
                    {
                        title: '组织 1',
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
                this.$emit("nodeOrgTitle", item.title)
        	}
        }
    }
</script>
