<template>
    <header class="fit-available-space">
        <div class="row m-0 border-bottom">
            <PageHeaderLogo />
            <PageHeaderTitle />
            <PageHeaderInfo 
                :experimentObject="experimentObject"
                :serviceCode="serviceCode"
            />
        </div>
    </header>
    
</template>

<script>
    import PageHeaderLogo from './PageHeaderLogo.vue';
    import PageHeaderTitle from './PageHeaderTitle.vue';
    import PageHeaderInfo from './PageHeaderInfo.vue';

    export default {
        name: 'Header',
        props: ['experimentObject', 'serviceCode'],
        components: {
            PageHeaderLogo,
            PageHeaderTitle,
            PageHeaderInfo,
        },
    }
</script>

<style scoped>

</style>