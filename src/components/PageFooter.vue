<template>
    <footer class="fit-available-space">
        <div class="d-flex border-top">
            <div class="flex-grow-1 d-flex flex-column justify-content-center ">
                <div class="d-flex justify-content-center gap-4" style="padding-right: 1em;">
                    <span>تنها اصل گزارش با برچسب هولوگرام مورد تایید است</span>
                    <span>مسئولیت تطابق نام نمونه با قطعه ارسالی بر عهده آزمایشگاه نمی‌باشد</span>
                    <span>نمونه‌های آزمون و باقیمانده آنها حداکثر به مدت یک ماه نگهداری خواهند شد</span>
                </div>
                <div class="d-flex justify-content-center gap-4">
                    <span>نشانی: تهران، خیابان آزادی، خیابان شهید صادقی، روبروی درب شمال غربی دانشگاه شریف، مجتمع جهاد دانشگاهی شریف</span>
                    <span>وب سایت: www.jdsharif-met.com</span>
                    <span>ایمیل: material@tdins.org</span>
                </div>
                <div class="d-flex justify-content-center gap-3">
                    <span>تلفن مستقیم پذیرش: ۲-۶۷۶۴۱۲۳۱</span>
                    <span>فاکس: ۶۶۰۷۵۲۰۰</span>
                    <span>صدای مشتری: ۶۷۶۴۱۲۳۳</span>
                </div>
            </div>
            <div class="info border-end p-1">
                <div><span>کد سند: {{serviceCode}}</span></div>
                <div><span>شماره بازنگری: ۸</span></div>
                <div><span>تاریخ بازنگری: ۹۴/۱۰/۱۹</span></div>
                <div><span :data-page-number-sample="sampleRowIndex">شماره صفحه: <span data-page-number></span> از <span data-page-all></span></span></div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
        props: ['experimentObject', 'serviceCode'],
        computed:{
            sampleRowIndex(){
                return this.getProperty('SAMPLE_ROW_INDEX');
            },
            serviceCode(){
                if(this.serviceCode === 'SAMPLE_PHOTO') return 'F-Lab.00';
                return (this.serviceCode || this.getProperty('SERVICE_CODE'));
            }
        }
    }
</script>

<style scoped>
    span {
        font-size: 13px;
    }
</style>