<template>
    <table class="table table-fixed table-sm table-striped table-bordered mb-3 text-center">
        <tbody>
            <tr>
                <th v-for="header in headers" :key="header">
                    {{header}}
                </th>
            </tr>
            <tr>
                <td v-for="singleData in data" :key="singleData">
                    {{singleData}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'ExperimentInfo',
        props: ['experimentObject'],
        data(){
            return {
                headers: [],
                data: [],
            }
        },
        methods: {
            getExperimentInfo(){
                const nonInfoFields = ['SUBMIT_EXP_RESULT_OVERVIEW', 'NOTICE', 'REFERENCE_FK_STANDARD_ID', 'ENVIRONMENT_FK_STANDARD_ID'];
                const formFields = this.experimentObject?.formFields?.filter?.(({id}) => {
                    return !nonInfoFields.includes(id);
                });
                if(!formFields || formFields.length === 0) return;

                const headers = formFields.map(formField => {
                    return formField.label;
                });
                const data = formFields.map(formField => {
                    return formField.value;
                });

                return {headers, data};
            },
            setHeaderAndData(){
                const result = this.getExperimentInfo();
                if(!result) return;
                const {headers, data} = result;
                this.headers = headers;
                this.data = data;
            }
        },
        created(){
            this.setHeaderAndData();
        }
    }
</script>