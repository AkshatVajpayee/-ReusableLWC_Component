import { LightningElement } from 'lwc';

export default class ReusableDependentPicklistTest extends LightningElement {

    selectedvalues;
    handlePicklist(event) {
        let selectedValues = event.detail.pickListValue;
        window.console.log('\n **** selectedValues **** \n ', selectedValues);
        this.selectedvalues = JSON.parse(JSON.stringify(selectedValues));
    }
}