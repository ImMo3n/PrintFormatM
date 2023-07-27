<template>
    <div 
        v-if="displayOriginalTemplate" 
        ref="template" 
        class="template border d-flex flex-column justify-content-between overflow-hidden position-relative" 
        style="height: 205.582mm; !important; width: 300mm !important;"
    >
        <span v-if="displayWatermark" class="watermark">بخشی از آزمایش</span>
        <PageHeader 
            ref="headerMain"
            :experimentObject="this.experimentObject" 
            :serviceCode="serviceCode" 
        />
        <div class="d-flex flex-grow-1">
            <div class="w-100 d-flex flex-column">
                <div ref="headerExperimentInfo" class="headerExperimentInfo d-flex justify-content-between p-1 border-start border-bottom">
                    <div>
                        <span>نوع آزمون: {{this.getService}}</span>
                    </div>
                    <div><span>نمونه برداری توسط مشتری انجام شده و نتایج فقط برای نمونه‌های ارسالی معتبر است.</span></div>
                </div>
                <main 
                    ref="contents" 
                    class="flex-grow-1 px-2 pt-1 border-start"
                >
                    <slot></slot>
                </main>
                <div ref="footerSignature" class="footerSignature d-flex justify-content-around border-start p-1">
                    <div><span>کارشناس آزمون</span></div>
                    <div><span style="font-size: 6px;">هولوگرام</span></div>
                    <div><span>مدیر فنی آزمایشگاه</span></div>
                </div>
            </div>
            <PageTrustedLogos ref="aside"/>
        </div>
        <PageFooter 
            ref="footerMain"
            :experimentObject="this.experimentObject" 
            :serviceCode="serviceCode" 
        />
    </div>
    <div v-html="printHtml"></div>
</template>

<script>
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';
import PageTrustedLogos from './PageTrustedLogos.vue';

export default {
    name: 'PageFormat',
    props: ['experimentObject', 'serviceCode', 'refresh'],
    emits: ['Error:LargeElement'],
    components: {
        PageHeader,
        PageFooter,
        PageTrustedLogos,
    },
    watch: {
        refresh(newValue){
            console.log(newValue);
            // this.createTemplate();
        } 
    },
    data(){
        return {
            printHtml: '',
            templateHTML: '',
            displayOriginalTemplate: true,
            contents: [],
            delay: 3000,
        }
    },
    methods: {
        getClientHeightOfRef(refName){
            let reference = this.$refs[refName];
            if(reference?.$el) reference = reference.$el;
            return (reference.clientHeight || 0);
        },
        addTemplateToDOM(contentElement){
            const templateString = this.templateHTML;
            const domElement = new DOMParser().parseFromString(templateString, "text/html").querySelector('.template');
            if(contentElement){
                contentElement.forEach(content => {
                    domElement.querySelector('main').appendChild(content);
                })
            }
            const newTemplateString = domElement.outerHTML;
            this.printHtml = this.printHtml.concat(newTemplateString);
            return domElement;
        },
        createTemplate(){
            this.printHtml = '';
            this.displayOriginalTemplate = true;
            this.contents = this.getContents;

            const copyOfTemplate = this.$refs.template.cloneNode(true);
            copyOfTemplate.querySelector('main').innerHTML = '';
            this.templateHTML = copyOfTemplate.outerHTML;

            const mainOffset = 0;
            const mainHeightLimit = this.templateHeight - this.headerFooterHeight - mainOffset;
            const result = [];

            this.contents.reduce((contents, currentContent, currentContentIndex) => {
                const contentsHeight = contents.length !== 0 ? contents.map(content => content.clientHeight)
                                        .reduce((currentHeight, contentHeight) => {
                                            return currentHeight + contentHeight;
                                        }, 0) : 0;
                const currentContentHeight = currentContent.clientHeight;
                if(contentsHeight + currentContentHeight > mainHeightLimit){
                    if(contents.length === 0) this.$emit('Error:LargeElement');
                    result.push(contents);
                    contents = [];
                }
                contents.push(currentContent);
                if(currentContentIndex === this.contents.length - 1) result.push(contents);
                return contents;
            }, []);

            result.forEach(arrayOfContents => {
                this.addTemplateToDOM(arrayOfContents.map(content => content.cloneNode(true)));
            });
            if(this.contents.length > 0) this.displayOriginalTemplate = false;
        }
    },
    computed: {
        getContents(){
            const elementTemplate = this.$refs.template;
            const elementContents = elementTemplate.querySelector('main').children;
            return Object.values(elementContents);
        },
        headerFooterHeight(){
            const headerHeight = this.getClientHeightOfRef('headerMain') + this.getClientHeightOfRef('headerExperimentInfo');
            const footerHeight = this.getClientHeightOfRef('footerMain') + this.getClientHeightOfRef('footerSignature');
            return headerHeight + footerHeight;
        },
        templateHeight(){
            const templateHeight = this.getClientHeightOfRef('template');
            return templateHeight;
        },
        displayWatermark(){
            const isIncomplete = this.getProperty('EXPERIMENTS_ARE_INCOMPLETE');
            return isIncomplete;
        },
        getService(){
            if(this.serviceCode === 'SAMPLE_PHOTO') return 'عکس نمونه';
            if(this.serviceCode === 'F-Exp.00') return 'گزارش کارشناسی';
            return (this.getProperty('ALIAS') || this.getProperty('SERVICE'));
        }
    },
    mounted(){
        window.addEventListener("load", () => {
            setTimeout(()=>{
                this.createTemplate();
            }, this.delay)
        });
    }
}
</script>

<style scoped>
    .watermark {
        position: absolute;
        top: 25%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 14em;
        transform: rotate(-24deg);
        color: pink;
        opacity: 0.1;
    }
</style>