<template>
    <PageFormat v-if="displayQaReports" :experimentObject="this.experimentObject" :serviceCode="`F-Exp.00`">
        <table class="table thead-light table-bordered text-center">
            <thead>
                <tr>
                    <td>آزمون</td>
                    <td>گرید</td>
                    <td>استاندارد</td>
                    <td>نتیجه آزمون</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="qaReportObject in qaReports" :key="JSON.stringify(qaReportObject)">
                    <td>{{this.getColumnText(qaReportObject.columns, 'QA_REPORT_SERVICE')}}</td>
                    <td>{{this.getColumnText(qaReportObject.columns, 'QA_REPORT_GRID')}}</td>
                    <td>{{this.getColumnText(qaReportObject.columns, 'QA_REPORT_STANDARD')}}</td>
                    <td>{{this.getColumnText(qaReportObject.columns, 'QA_REPORT_RESULT')}}</td>
                </tr>
            </tbody>
        </table>
    </PageFormat>
</template>

<script>
    import PageFormat from './PageFormat.vue';

    export default {
        name: 'ExperimentQAReport',
        props: ['experimentsBasedOnSample'],
        data(){
            return {
                experimentObject: {},
            }
        },
        components: {
            PageFormat,
        },
        computed: {
            qaReports(){
                this.experimentObject = this.experimentsBasedOnSample?.[0];
                const sampleName = this.getProperty('SAMPLE');
                const qaReportsRelatedToSample = this.experimentObject?.qaReportResult?.idValueObject?.filter(rowData => {
                    const sampleNameToCompare = this.getColumnText(rowData.columns, 'QA_REPORT_SAMPLE');
                    return sampleNameToCompare === sampleName;
                });
                return qaReportsRelatedToSample;
            },
            displayQaReports(){
                if(!this.qaReports) return false;
                if(this.qaReports.length === 0) return false;
                return true;
            }
        },
    }
</script>
