<template>
    <template v-for="({rowIndex, columns, files}) in noticesData" :key="rowIndex">
        <p class="m-0 pt-1">
            <span class="fw-bold">تذکر {{this.toPersian(rowIndex)}}: </span>
            <span>{{this.getColumnText(columns, 'NOTICE_ROW')}}</span>
        </p>
        <ExperimentResultPhotoOrExcel :files="files ? files : []" />
    </template>
</template>

<script>
    import ExperimentResultPhotoOrExcel from './ExperimentResultPhotoOrExcel.vue';

    export default {
        name: 'GridNotices',
        props: ['experimentObject'],
        components: {
            ExperimentResultPhotoOrExcel,
        },
        computed: {
            noticesData(){
                const result = this.getGridData('NOTICES');
                return (result?.idValueObject || []);
            },
        },
    }
</script>

<style>

</style>