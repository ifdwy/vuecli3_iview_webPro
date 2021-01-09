<style type="text/css">

</style>
<template>
	<div class="menue1-2">
        <QueryList :menueId="2"></QueryList>
        <TabList12></TabList12>
    </div>
</template>
<script>
    import QueryList from '../components/QueryList.vue'
    import TabList12 from '../components/TabList1-2.vue'
    export default {
        components:{
            QueryList,
            TabList12
        }
        
    }
</script>