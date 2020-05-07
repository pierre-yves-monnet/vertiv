# vertiv
vertiv POC

# Deployment
Deploy the REST API CONTEXT
  https://github.com/Bonitasoft-Community/restapi_context/releases/download/2.13/ContextAccess-2.13.1.zip

Deploy the Gasoline page
  https://github.com/Bonitasoft-Community/page_gasolinetruck/releases/download/1.6.3/CustomPageGasoline-1.6.3.zip

Deploy the Meteor page
https://github.com/Bonitasoft-Community/page_meteor/releases/download/3.0/CustomPageMeteor-3.0.2.zip

Deploy the BDM

Deploy the process

# Configuration
Creates theses Gasoline requests:  
ID: listCustomers  
REQUEST: select * from customer  
DATASOURCE : java:comp/env/NotManagedBizDataDS  
  
ID: listOpportunityType  
REQUEST: select * from OPPORTUNITYTYPE  
DATASOURCE : java:comp/env/NotManagedBizDataDS  

ID: listPriceList  
REQUEST: select * from PRICELIST  
DATASOURCE : java:comp/env/NotManagedBizDataDS  

ID: listItems  
REQUEST: select * from ITEM  
DATASOURCE : java:comp/env/NotManagedBizDataDS  

