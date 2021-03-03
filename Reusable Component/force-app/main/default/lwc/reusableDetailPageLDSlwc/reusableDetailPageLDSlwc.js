import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getFieldLabels from "@salesforce/apex/ReusableDetailPageLDSController.getFieldLabels";

export default class DetailFieldsLWC extends LightningElement {
    @api objectApiName;
    @api recordId;
    @api title;
    @api columns;
    @api dynamicFields;
    @api phoneFields;
    @api displayMode;
    @api phoneFieldsFetch;
    @api error;
    @api recordFields;
    @api record;
    @api object;
    @api phoneFieldsVal;
    @track record;

    get className(){
        return 'slds-m-left--xx-small slds-col slds-size--1-of-'+this.columns+' slds-col slds-has-flexi-truncate';
    }


    handleOnLoad(event) {
        this.record = event.detail.records;
        this.recordFields = this.record[this.recordId].fields; 

        getFieldLabels({'objectName':this.object, 'fields': this.phoneFieldsFetch}).then(result => {
            let response = JSON.parse(result);
            let phoneValues = []; 
            let phoneFieldsString = this.phoneFieldsFetch;
            var fields = phoneFieldsString.replace(/\s/g, '').split(','); 
                        for(var x in fields)
                        {	 
                            let field = fields[x];
                            phoneValues.push({label:response[field], value:this.recordFields[field].value})  ;                             
                        } 
                        this.phoneFieldsVal = phoneValues;
          })
          .catch(error => {
            this.error = error.body.message;
          });
    }
   
    @wire(getRecord, { recordId: '$recordId', fields: ['$objectApiName'+'.RecordTypeId'] }) record;
    
    //Pass fields up for lightning data service
    get recFields(){
        //parse fields from string to string[]
			var fieldsList = this.dynamicFields.replace(/\s/g, '').split(',');
			fieldsList = fieldsList.filter(function (el) {
			  return el != null && el!='';
            });
            return fieldsList;
    }

    //get recordtypeId in order to properly display picklists
    get rectypeId () {       
            var result;
            if(this.record.data){
            result = JSON.parse(JSON.stringify(this.record.data));
            return result.recordTypeInfo.recordTypeId;
            }
        }
}