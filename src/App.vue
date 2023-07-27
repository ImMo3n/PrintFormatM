<template>
  <Error v-if="hasError" :errorMessage="errorMessage"/>
  <div v-if="!hasError">
    <div 
      v-for="experimentsBasedOnSample in experimentObjects" 
      :key="JSON.stringify(experimentsBasedOnSample)"
    >
      <ExperimentResultSamplePhoto :experimentsBasedOnSample="experimentsBasedOnSample"/>
      <!-- <ExperimentQAReport :experimentsBasedOnSample="experimentsBasedOnSample"/> -->
      <ExperimentResult
        v-for="experimentObject in experimentsBasedOnSample" 
        :experimentObject="experimentObject" 
        :key="JSON.stringify(experimentObject)"
        @Error:LargeElement="() => {this.displayError('امکان نتیجه‌ی یکی از آزمایش‌ها وجود ندارد.')}"
        @Error:CreatingTable="errorMessage => {this.displayError(`${errorMessage} \nبارگذاری جدول موفق نبود.`)}"
        @Loaded:Tables="() => this.refresh = !this.refresh"
        :refresh="refresh"
      />
    </div>
    <div>
      <button v-if="isLoading === false" class="btn btn-primary position-fixed print-btn-position" @click="() => this.printDocument()">پرینت</button>
      <div v-else class="spinner-border text-primary position-fixed print-btn-position" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import ExperimentResult from './components/ExperimentResult.vue';
  import Error from './components/ExperimentError.vue';
  import ExperimentQAReport from './components/ExperimentQAReport.vue';
  import ExperimentResultSamplePhoto from './components/ExperimentResultSamplePhoto.vue';

  export default {
    name: 'App',
    components: {
      ExperimentResult,
      Error,
      ExperimentQAReport,
      ExperimentResultSamplePhoto,
    },
    data(){
      return {
        hasError: false,
        errorMessage: '',
        isLoading: true,
        refresh: false,
        delay: 3000,
      }
    },
    methods: {
      loadExperiments(){
        // localStorage.setItem('experimentObjects', '[{"formFields":[{"id":"REFERENCE_FK_STANDARD_ID","value":"API 5L(2018), ASTM A105/A105M-21","label":"استاندارد مرجع:"},{"id":"ENVIRONMENT_FK_STANDARD_ID","value":"استاندارد محیط","label":"استاندارد کنترل شرایط محیط:"}],"resultGrids":[{"gridName":"RESULTS","idValueObject":[{"rowIndex":1,"columns":[{"id":"RESULT_ROW","value":"نتیجه 1","text":"نتیجه 1","label":"نتیجه"}]},{"rowIndex":2,"columns":[{"id":"RESULT_ROW","value":"نتیجه 2","text":"نتیجه 2","label":"نتیجه"}]},{"rowIndex":3,"columns":[{"id":"RESULT_ROW","value":"نتیجه 3","text":"نتیجه 3","label":"نتیجه"}]}]},{"gridName":"NOTICES","idValueObject":[{"rowIndex":1,"columns":[{"id":"NOTICE_ROW","value":"تذکر 1","text":"تذکر 1","label":"تذکر"}]},{"rowIndex":2,"columns":[{"id":"NOTICE_ROW","value":"تذکر 2","text":"تذکر 2","label":"تذکر"}]},{"rowIndex":3,"columns":[{"id":"NOTICE_ROW","value":"تذکر 3","text":"تذکر 3","label":"تذکر"}]}]},{"gridName":"CONDITIONS","idValueObject":[{"rowIndex":1,"columns":[{"id":"CONDITION_TITLE","value":"عنوان شرایط آزمون 1","text":"عنوان شرایط آزمون 1","label":"عنوان شرایط انجام آزمون"},{"id":"CONDITION","value":"شرایط آزمون 1","text":"شرایط آزمون 1","label":"متن شرایط آزمون"}]},{"rowIndex":2,"columns":[{"id":"CONDITION_TITLE","value":"عنوان شرایط آزمون 2","text":"عنوان شرایط آزمون 2","label":"عنوان شرایط انجام آزمون"},{"id":"CONDITION","value":"شرایط آزمون 2","text":"شرایط آزمون 2","label":"متن شرایط آزمون"}]},{"rowIndex":3,"columns":[{"id":"CONDITION_TITLE","value":"عنوان شرایط آزمون 3","text":"عنوان شرایط آزمون 3","label":"عنوان شرایط انجام آزمون"},{"id":"CONDITION","value":"شرایط آزمون 3","text":"شرایط آزمون 3","label":"متن شرایط آزمون"}]}]}],"excels":[{"link":"http://192.168.0.23/sysworkflow/en/{skin}/cases/cases_ShowDocument?a=91860962263ccd747354713079625667&v=1"}],"documents":[],"qaReportResult":{"gridName":"QA_REPORT","idValueObject":[]},"generalInfo":[{"id":"TRACKING_CODE","value":"40111005"},{"id":"DATE_REQUEST","value":"۱۴۰۱/۱۱/۲"},{"id":"DATE_CURRENT","value":"۱۴۰۱/۱۱/۱۳"},{"id":"EXPERIMENT_EXECUTION_DATE","value":"۱۴۰۱/۱۱/۲"},{"id":"FK_PERSON_ID","value":"وزارت فرهنگ و ارشاد اسلامی"},{"id":"SAMPLE","value":"نمونه"},{"id":"SERVICE","value":"Break Test, NickBreak, Flare Test, Peel Test"},{"id":"SERVICE_CODE","value":"F-Mec.00"},{"id":"BUYER_ADDRESS","value":""},{"id":"ROW_INDEX","value":1},{"id":"EXPERIMENTS_ARE_INCOMPLETE","value":true}],"samplePhoto":[]}]')
        const experimentObjects = localStorage.getItem('experimentObjects');
        if(!experimentObjects) {
          this.displayError('آرایه‌ی آزمایش‌ها در حافظه localStorage یافت نشد.');
          return;
        }
        const parsedObjects = JSON.parse(experimentObjects);
        if(!parsedObjects){
          this.displayError('آرایه‌ی آزمایش‌ها خوانده شده اما json قادر به parse آن نبود');
        }
        if(parsedObjects) {
          return parsedObjects;
        }
      },
      displayError(errorMessage){ 
        this.hasError = true;
        this.errorMessage = errorMessage;
      },
      editDocumentTitle(){
        const experiments = this.loadExperiments();
        const trackingCodeObject = experiments[0].generalInfo.find(infoObject => infoObject.id === 'TRACKING_CODE');
        document.title = `${trackingCodeObject.value}`;
      },
      applyPageNumbers(){
        setTimeout(() => {
          const pageNumberElements = document.querySelectorAll('[data-page-number-sample]');
          if(pageNumberElements.length === 0) return;

          const uniqueSampleNames = [...new Set(Object.values(pageNumberElements).map(nodeElement => {
            const sampleName = nodeElement.getAttribute('data-page-number-sample');
            return sampleName;
          }))];

          uniqueSampleNames.forEach(sampleName => {
            const elementsWithSameSampleName = document.querySelectorAll(`[data-page-number-sample="${sampleName}"]`);
            const totalPagesForSample = Object.values(elementsWithSameSampleName).length;
            Object.values(elementsWithSameSampleName).forEach((pageNumberElement, index) => {
              pageNumberElement.querySelector('[data-page-number]').innerText = this.toPersian(index + 1);
              pageNumberElement.querySelector('[data-page-all]').innerText = this.toPersian(totalPagesForSample);
            });
          });
          // window.addEventListener("DOMContentLoaded", () => {
            this.loaded();
          // });
        }, this.delay);
      },
      printDocument(){
        window.print();
      },
      loaded(){
        this.isLoading = false;
      }
    },
    computed: {
      experimentObjects(){
        const SERVICE_GROUP_QA = 122;
        let experiments = this.loadExperiments();
        const experimentsOrderedBySampleName = orderExperimentsBasedOnSampleName(experiments);
        console.log(experimentsOrderedBySampleName);
        return experimentsOrderedBySampleName;

        function orderExperimentsBasedOnSampleName(experiments){
          const uniqueSampleNames = [...new Set(experiments
            .map(experiment => experiment.generalInfo.find(infoObject => infoObject.id === 'SAMPLE').value))
          ];

          const experimentsSortedBySampleNames = uniqueSampleNames.reduce((currentExperiments, uniqueSample) => {
            experiments.forEach(experiment => {
              const sampleName = experiment.generalInfo.find(infoObject => infoObject.id === 'SAMPLE').value;
              if(sampleName === uniqueSample) currentExperiments.push(experiment);
            });
            return currentExperiments;
          }, []);

          const arrayOfExperimentsSortedBasedOnSampleNames = [];
          uniqueSampleNames.forEach(uniqueSampleName => {
            const experimentsWithSameName = 
            experimentsSortedBySampleNames
              .filter(experiment => experiment.generalInfo.find(infoObject => infoObject.id === 'SAMPLE').value === uniqueSampleName)
              .filter(experiment => experiment.generalInfo.find(infoObject => infoObject.id === 'SERVICE_GROUP_ID').value != SERVICE_GROUP_QA)
              .sort((firstExperiment, secondExperiment) => {
                const firstExperimentServiceGroup = firstExperiment.generalInfo.find(infoObject => infoObject.id === 'SERVICE_GROUP_ID').value;
                const secondExperimentServiceGroup = secondExperiment.generalInfo.find(infoObject => infoObject.id === 'SERVICE_GROUP_ID').value;
                if(firstExperimentServiceGroup > secondExperimentServiceGroup) return 1;
                else if(firstExperimentServiceGroup > secondExperimentServiceGroup) return -1;
                else return 0;
              });

            experimentsSortedBySampleNames
              .filter(experiment => experiment.generalInfo.find(infoObject => infoObject.id === 'SAMPLE').value === uniqueSampleName)
              .filter(experiment => experiment.generalInfo.find(infoObject => infoObject.id === 'SERVICE_GROUP_ID').value == SERVICE_GROUP_QA)
              .forEach(experiment => experimentsWithSameName.unshift(experiment));

            arrayOfExperimentsSortedBasedOnSampleNames.push(experimentsWithSameName);
          });

          return arrayOfExperimentsSortedBasedOnSampleNames;
        }
      },
    },
    mounted(){
      this.editDocumentTitle();
      window.addEventListener("load", () => {
        this.applyPageNumbers();
      });
    }
  }
</script>

<style>
  * {
      font-family: Nazanin, Vazirmatn, sans-serif;
  }

  
  body{
      direction: rtl;
      font-size: 13px;
  }

  body .border, body .border-bottom, body .border-top, body .border-start, body .border-end, body .table-bordered, body table{
    border-color: black !important;
  }

  .print-btn-position{
    left: 10px;
    top: 10px;
  }

  @media print {
    @page{
      size: A4 landscape;
      margin: 10.5mm;
    }

    .print-btn-position{
      display: none;
    }
  }
  
</style>
