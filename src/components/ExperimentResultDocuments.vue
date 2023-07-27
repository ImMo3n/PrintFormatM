<template>
    <PageFormat 
        :experimentObject="this.experimentObject"
        v-for="outerArrayOfDocuments in this.documents" 
        :key="JSON.stringify(outerArrayOfDocuments)"
    >
        <div class="d-flex justify-content-around align-items-end" >
            <div class="pt-2" v-for="documentObject in outerArrayOfDocuments" :key="JSON.stringify(documentObject)">
                <img class="img-fluid card-img-top img-max-height" :src="documentObject.link" :alt="documentObject.document_label">
                <h6 class="mt-2 card-title text-center">{{documentObject.description}}</h6>
            </div>
        </div>
    </PageFormat>
</template>

<script>
    import PageFormat from './PageFormat.vue';

    export default {
        name: 'ExperimentDocuments',
        props: ['experimentObject'],
        components: {
            PageFormat,
        },
        computed: {
            documents(){
                return this.seperateArrayByNumber(this.experimentObject.documents, 1);
            },
        },
    }
</script>

<style scoped>
    .img-max-height{
        max-height: 467px;
    }
</style>