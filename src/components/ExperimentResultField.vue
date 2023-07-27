<template>
    <p v-if="isDisplayed" class="content m-0">{{this.label}} {{this.data}}</p>
</template>

<script>
    export default {
        name: 'ExperimentField',
        props: ['experimentObject', 'formField'],
        data(){
            return {
                isDisplayed: false,
                data: '',
                label: '',
            }
        },
        methods: {
            updateIsDisplayed(){
                const formFields = this.experimentObject?.formFields;
                const formFieldObject = formFields?.find?.(formField => formField.id === this.formField);
                if(!formFieldObject) return;
                const {value, label} = formFieldObject;
                if(!value) this.isDisplayed = false;
                else {
                    this.isDisplayed = true;
                    this.data = value;
                    this.label = label;
                }
            },
        },
        created(){
            this.updateIsDisplayed();
        }
    }
</script>