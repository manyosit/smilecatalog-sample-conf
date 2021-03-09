const settings = {
    "createForm":"SRM:RequestInterface_Create",
    "dataField": "SR Type Field 1",
    "numberField": "Request Number",
    "entry": {
        "Source Keyword": "SMILEcatalog",
        "Company": "Calbro Services",
        "AppRequestSummary": "Da geht was!!!",
        "TitleInstanceID": "SRGAA5V0GENAWAO6U07LO5YL6Q945Z"
    }
};
settings.entry['Login ID'] = customer['Remedy Login ID'];

settings.entry['AppRequestSummary'] = requestData.title;

//Store data in Request
settings.entry[settings.dataField] = JSON.stringify(requestData.requestDefinition.instances, null, 2);
//Create Service Request
const resultCreate = await adapter.remedy.create(settings.createForm, settings.entry);
//Lookup number
const resultSearch = await adapter.remedy.search(settings.createForm, `'1' = "${resultCreate}"`, settings.numberField);
requestData.serviceRequestId = resultSearch.data[0]['Request Number'];
resolve(requestData.serviceRequestId);
