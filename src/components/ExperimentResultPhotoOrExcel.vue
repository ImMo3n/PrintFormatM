<template>
    <div v-for="({LINK, FILE_NAME}) in files" :key="FILE_NAME">
        <ExperimentPhoto v-if="this.isFileImage(FILE_NAME)" :alt="FILE_NAME" :link="LINK"/>
        <ExcelTables v-if="this.isFileExcel(FILE_NAME)" :links="[LINK]"/>
    </div>
</template>

<script>
    import ExcelTables from './ExperimentResultExcelTables.vue';
    import ExperimentPhoto from './ExperimentPhoto.vue';

    export default {
        name: 'ExperimentResultPhotoOrExcel',
        props: ['files'],
        components: {
            ExcelTables,
            ExperimentPhoto,
        },
        methods: {
            isFileImage(fileName){
                const regex = /(jpg|png|jpeg)$/gmi;
                return regex.test(fileName);
            },
            isFileExcel(fileName){
                const regex = /xls$/gm;
                return regex.test(fileName);
            },
        },
    }
</script>
