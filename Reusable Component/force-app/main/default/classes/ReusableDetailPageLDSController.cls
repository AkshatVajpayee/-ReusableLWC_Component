public class ReusableDetailPageLDSController {

	@AuraEnabled(Cacheable=true)
	public static String getFieldLabels(String objectName, String fields)
	{ 
        Schema.SObjectType schemaObj = Schema.getGlobalDescribe().get(objectName) ;
		Map<String, Schema.SObjectField> fieldMap = schemaObj.getDescribe().fields.getMap();
		Map<String,String> fieldLabelMap = new Map<String,String>(); 
		for(String fieldAPIName:fields.replaceAll( '\\s+', '').split(','))
		{
			Schema.SObjectField field = fieldMap.get(fieldAPIName);
			if(field!=null)
			{
				String fieldLabel = field.getDescribe().getLabel(); 
				fieldLabelMap.put(fieldAPIName,fieldLabel);
			}  

		} 
    	return JSON.serialize(fieldLabelMap); 
	}
}