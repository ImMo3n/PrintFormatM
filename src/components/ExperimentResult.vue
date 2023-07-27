<template>
    <PageFormat 
        :experimentObject="this.experimentObject"
        @Error:LargeElement="() => this.$emit('Error:LargeElement')"
        :refresh="refresh"
    >
        <ExperimentField  :experimentObject="this.experimentObject" :formField="'REFERENCE_FK_STANDARD_ID'"  />
        <ExperimentField  :experimentObject="this.experimentObject" :formField="'ENVIRONMENT_FK_STANDARD_ID'" />
        <GridConditions :experimentObject="this.experimentObject" />
        <ExcelTables 
            :experimentObject="this.experimentObject"
            :links="this.experimentObject?.excels?.map(({link}) => link)"
            @Error:CreatingTable="errorMessage => this.$emit('Error:CreatingTable', errorMessage)"
        />
        <GridResult :experimentObject="this.experimentObject" />
        <GridNotices :experimentObject="this.experimentObject" />
    </PageFormat>
    <ExperimentDocuments :experimentObject="this.experimentObject"/>
</template>

<script>
    import PageFormat from './PageFormat.vue';

    import ExperimentField from './ExperimentResultField.vue';
    import TrustedByLogos from './PageTrustedLogos.vue';
    import GridConditions from './ExperimentResultGridConditions.vue';
    import GridResult from './ExperimentResultGridResult.vue';
    import GridNotices from './ExperimentResultGridNotices.vue';
    import ExcelTables from './ExperimentResultExcelTables.vue';

    import ExperimentDocuments from './ExperimentResultDocuments.vue';

    export default {
        name: 'ExperimentResult',
        props: ['experimentObject', 'refresh'],
        emits: ['Loaded:Tables', 'Error:LargeElement', 'Error:CreatingTable'],
        components: {
            ExperimentField,
            TrustedByLogos,
            GridConditions,
            GridResult,
            GridNotices,
            ExcelTables,
            PageFormat,
            ExperimentDocuments,
        },
    }
</script>

<style scoped>

</style>