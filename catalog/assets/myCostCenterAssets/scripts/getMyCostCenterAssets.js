const formCostCenter = "FIN:ConfigCostCentersRepository";
const formAssets = "AST:BaseElement";
//params = JSON.parse(params);
const queryCostCenter = `'LoginName_tmp' = "${customer['Remedy Login ID']}"`;
//const query = "1=1"
const fieldsCostCenter = "Cost Center Code"
const fieldsAssets = "Name, Instance Id, AssetLifecycleStatus, Tag Number, Serial Number, Short Description, Class Id, Cost Center"

// PersonRole, PeopleGroup Form Entry ID

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: {
            multiple: 1,
            compare: (a, b) => a.name.length - b.name.length,
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: {
            multiple: 2
        },
    },
    {
        title: 'Tag Number',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
    },
    {
        title: 'Short Description',
        dataIndex: 'shortDescription',
        key: 'shortDescription',
        sorter: {
            multiple: 3
        }
    },
    {
        title: 'Serial Number',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
    },
    {
        title: 'Cost Center',
        dataIndex: 'costCenter',
        key: 'costCenter',
    },
];

const allAssets = [];

const costCenters = await adapter.remedy.search(formCostCenter, queryCostCenter, fieldsCostCenter);
//Assets der Kostenstelle suchen
for (let x=0; x<costCenters.data.length; x++) {
    const costCenter = costCenters.data[x]['Cost Center Code'];
    const queryAssets = `'Cost Center' = "${costCenter}" AND 'Data Set Id' = "BMC.ASSET"`;
    const assets = await adapter.remedy.search(formAssets, queryAssets, fieldsAssets);
    assets.data.forEach(asset=> allAssets.push(asset));
}

const datasource = allAssets.map(item => {
    return {
        key: item['Instance Id'],
        serialNumber: item['Serial Number'],
        name: item['Name'],
        tagNumber: item['Tag Number'],
        status: item['AssetLifecycleStatus'],
        shortDescription: item['Short Description'],
        classId: item['Class Id'],
        costCenter: item['Cost Center']
    }
});

resolve({columns, datasource});