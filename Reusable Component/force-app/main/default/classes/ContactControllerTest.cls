@isTest
private class ContactControllerTest {
    
    @isTest static void getContactsTest()
    {
        Contact contact = new Contact();
        contact.lastname = 'test';
        Test.startTest();
        Insert contact;
        Test.stopTest();
        System.assertEquals(1, ContactController.getContacts().size());
        
    }
}
