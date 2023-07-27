<template>
    <PageFormat 
        :experimentObject="this.experimentObject"
        v-if="samplePhotoObject !== ''"
        :serviceCode="`SAMPLE_PHOTO`"
    >
        <div class="d-flex justify-content-around align-items-end" >
            <div class="pt-2">
                <img class="img-fluid card-img-top img-max-height" :src="samplePhotoObject.link" :alt="samplePhotoObject.sampleName">
            </div>
        </div>
    </PageFormat>
</template>

<script>
    import PageFormat from './PageFormat.vue';

    export default {
        name: 'ExperimentResultSamplePhoto',
        props: ['experimentsBasedOnSample'],
        data(){
            return {
                experimentObject: {},
            }
        },
        components: {
            PageFormat,
        },
        computed:{
            samplePhotoObject(){
                this.experimentObject = this.experimentsBasedOnSample?.[0];
                if(this.experimentObject.samplePhoto.length === 0) return '';
                return this.experimentObject.samplePhoto[0];
            },
        }
    }
</script>

<style scoped>
    .img-max-height{
        max-height: 467px;
    }
</style>