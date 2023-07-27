<template>
    <div class="col-4">
        <div class="row">
            <div class="col"><span>درخواست کننده: {{getProperty('FK_PERSON_ID')}}</span></div>
        </div>
        <div class="row">
            <div class="col"><span>نشانی: {{getProperty('BUYER_ADDRESS')}}</span></div>
        </div>
        <div class="row">
            <div class="col"><span>نام نمونه: {{getProperty('SAMPLE')}}</span></div>
        </div>
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-between">
                    <span class="">شماره شناسایی:</span>
                    <!-- <span class="">{{TRACKING_CODE}}</span> -->
                    <span class="">{{`${this.toPersian(getProperty('TRACKING_CODE'))}-`}}<span>{{this.sampleRowIndex}}</span></span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>تاریخ انجام آزمون:</span>
                    <span>{{this.padDate(getProperty('EXPERIMENT_EXECUTION_DATE'))}}</span>
                </div>
            </div>
            <div class="col">
                <div class="d-flex justify-content-between">
                    <span>تاریخ درخواست:</span>
                    <span>{{this.padDate(getProperty('DATE_REQUEST'))}}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>تاریخ صدور گزارش:</span>
                    <span>{{this.padDate(this.getPersianDate())}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderInfo',
        props: ['experimentObject', 'serviceCode'],
        computed: {
            sampleRowIndex(){
                return this.toPersian(this.getProperty('SAMPLE_ROW_INDEX'));
            }
        }
    }
</script>

<style scoped>
    span{
        font-size: 13px;
    }
</style>
