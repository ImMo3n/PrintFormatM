<template>
    <div
        v-for="excelObject in tables" 
        :key="JSON.stringify(excelObject)"
        class="div-with-table py-2"
    >
        <table 
            class="table table-sm table-bordered m-0" data-excel-table
        >
            <tbody>
                <tr v-for="tableRowObject in excelObject" :key="JSON.stringify(tableRowObject)">
                    <td 
                        v-for="value in tableRowObject" 
                        :key="value"
                        class="text-center"
                        :colspan="Object.keys(tableRowObject).length === 1 ? '100%' : ''"
                    >
                        {{value}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default { 
        name: 'ExcelTables',
        props: ['experimentObject', 'links'],
        emits: ['Error:CreatingTable'],
        data(){
            return {
                tables: [],
            }
        },
        methods: {
            getTables(){
                // const links = this.experimentObject?.excels?.map(({link}) => link);
                const promises = this.links.map(link => new Promise(async function(resolve, reject){
                    try{
                        const response = await fetch(link);
                        const myBlob = await response.blob();
                        const file = new File([myBlob], 
                                        'untitled.xls', 
                                        { type: "application/vnd.ms-excel" , lastModified: new Date().getTime()}, 
                                        'utf-8'
                                    );
                        const excelRow = await getExcelRows(file);
                        resolve(excelRow);
                    }
                    catch(error){
                        // this.$emit('Error:CreatingTable', error);
                        reject(error);
                    }
                }));

                Promise.all(promises)
                    .then(tables => {
                        this.tables = tables;
                    });

                function getExcelRows(file){
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const data = e.target.result;
                            const workbook = XLSX.read(data, {
                                type: 'binary'
                            });
                            
                            workbook.SheetNames.forEach(function(sheetName) {
                                const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                                resolve(XL_row_object);
                            });
                        };
                        reader.onerror = function(error) {
                            reject(error);
                        };
                        reader.readAsBinaryString(file);
                    });
                }
            },
        },
        created(){
            this.getTables();
        },
    }
</script>

<style>

</style>