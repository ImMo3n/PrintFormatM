<template>
    <h6 v-if="this.conditionsData.length !== 0" class="fw-bold py-2 m-0">شرایط انجام آزمون</h6>
    <template v-for="({rowIndex, columns, files}) in conditionsData" :key="rowIndex">
        <li>
            <span class="fw-bold">{{this.getColumnText(columns, 'CONDITION_TITLE')}}: </span>
            <span>{{this.getColumnText(columns, 'CONDITION')}}</span>
        </li>
        <ExperimentResultPhotoOrExcel :files="files ? files : []" />
    </template>
</template>

<script>
    import ExperimentResultPhotoOrExcel from './ExperimentResultPhotoOrExcel.vue';

    export default {
        name: 'GridConditions',
        props: ['experimentObject'],
        components: {
            ExperimentResultPhotoOrExcel,
        },
        computed: {
            conditionsData(){
                const result = this.getGridData('CONDITIONS');
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