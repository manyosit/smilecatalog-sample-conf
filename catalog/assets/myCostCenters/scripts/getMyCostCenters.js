const formCostCenter = "FIN:ConfigCostCentersRepository";
const queryCostCenter = `'LoginName_tmp' = "${customer['Remedy Login ID']}"`;
//const query = "1=1"
const fieldsCostCenter = "Cost Center Code, Cost Center Name, Status"

// PersonRole, PeopleGroup Form Entry ID

const columns = [
    {
        title: 'Cost Center',
        dataIndex: 'costCenter',
        key: 'costCenter',
        sorter: {
            multiple: 1,
            compare: (a, b) => a.name.length - b.name.length,
        }
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: {
            multiple: 2
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: {
            multiple: 2
        },
    }
];

const costCenters = await adapter.remedy.search(formCostCenter, queryCostCenter, fieldsCostCenter);
//sort

let datasource = costCenters.data.map(item => {
    return {
        key: item['Cost Center Code'],
        name: item['Cost Center Name'],
        status: item['Status'],
        costCenter: item['Cost Center Code']
    }
});

datasource = datasource.sort(function(a, b) {
    const labelA = a.name.toUpperCase(); // Groß-/Kleinschreibung ignorieren
    const labelB = b.name.toUpperCase(); // Groß-/Kleinschreibung ignorieren
    if (labelA < labelB) {
        return -1;
    }
    if (labelA > labelB) {
        return 1;
    }
    // Namen müssen gleich sein
    return 0;
});

resolve({columns, datasource});