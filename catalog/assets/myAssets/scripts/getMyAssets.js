const form = "AST:AssetPeople_AssetBase"
    //params = JSON.parse(params);
const query = `'Form Type'="People" AND 'DatasetId' = "BMC.ASSET" AND 'PeopleGroup Form Entry ID' = "${customer['Person ID']}"`;
//const query = "1=1"
const fields = "Name, APJ_AssetLifecycleStatus, APJ_ShortDescription, SerialNumber, TagNumber, Asset ID+, AssetInstanceId, AssetClassId, Form Type, PersonRole"

// PersonRole, PeopleGroup Form Entry ID

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: {
        multiple: 1,
        compare: "default",
    }
}, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: {
        multiple: 2
    },
    filters: [{
        text: "Deployed",
        value: "Deployed"
    }, {
        text: "Ordered",
        value: "Ordered"
    }]
}, {
    title: 'Tag Number',
    dataIndex: 'tagNumber',
    key: 'tagNumber',
}, {
    title: 'Short Description',
    dataIndex: 'shortDescription',
    key: 'shortDescription',
    sorter: {
        multiple: 3
    }
}, {
    title: 'Serial Number',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
}, ];

const result = await adapter.remedy.search(form, query, fields);

const datasource = result.data.map(item => {
    return {
        key: item['AssetInstanceId'],
        serialNumber: item['SerialNumber'],
        name: item['Name'],
        tagNumber: item['TagNumber'],
        status: item['APJ_AssetLifecycleStatus'],
        shortDescription: item['APJ_ShortDescription'],
        classId: item['AssetClassId']
    }
});

resolve({
    datasource,
    columns
});
