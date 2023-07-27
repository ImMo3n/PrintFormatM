<template>
    <h6 v-if="this.finalResultData.length !== 0" class="fw-bold py-2 m-0">نتیجه نهایی</h6>
    <template v-for="({rowIndex, columns, files}) in finalResultData" :key="rowIndex">
        <li >
            <span>{{this.getColumnText(columns, 'RESULT_ROW')}}</span>
        </li>
        <ExperimentResultPhotoOrExcel :files="files ? files : []" />
    </template>
</template>

<script>
    import ExperimentResultPhotoOrExcel from './ExperimentResultPhotoOrExcel.vue';

    export default {
        name: 'GridResult',
        props: ['experimentObject'],
        components: {
            ExperimentResultPhotoOrExcel,
        },
        computed: {
            finalResultData(){
                const result = this.getGridData('RESULTS');
                return (result?.idValueObject || []);
            },
        },
    }
</script>

<style scoped>
    h6 {
        font-size: 14px;
    }
</style>