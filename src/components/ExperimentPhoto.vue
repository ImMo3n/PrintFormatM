<template>
    <div class="d-flex justify-content-around align-items-end" >
        <div class="pt-2">
            <img class="img-fluid card-img-top img-max-height" :src="link" :alt="alt">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ExperimentPhoto',
        props: ['link', 'alt'],
    }
</script>

<style scoped>
    .img-max-height{
        max-height: 467px;
    }
</style>