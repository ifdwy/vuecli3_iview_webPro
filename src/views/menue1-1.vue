<style type="text/css">

</style>
<template>
	<div class="menue1-1">
        <QueryList :menueId="1"></QueryList>
        <TabList v-if="isRouterAlive"></TabList>
    </div>
</template>
<script>
    import QueryList from '../components/QueryList.vue'
    import TabList from '../components/TabList.vue'
    export default {
        components:{
            QueryList,
            TabList
        },
        provide () {
            return {
                reload: this.reload
            }
        },
        data () {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;
                this.$nextTick(()=> {
                  this.isRouterAlive = true;
                })
            }
        }
        
    }
</script>
