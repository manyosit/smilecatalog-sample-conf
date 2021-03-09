const form = "SRM:Request"
//params = JSON.parse(params);
const query = `'Status' <"Closed"`;
//const query = "1=1"
const fields = "Summary, Request Number, Status, Customer First Name, Customer Last Name, Notes, Submit Date, Required Date"

// PersonRole, PeopleGroup Form Entry ID

const columns = [
  {
      title: 'Request Number',
      dataIndex: 'requestNumber',
      key: 'requestNumber',
  },
    {
        title: 'Summary',
        dataIndex: 'summary',
        key: 'summary',
        sorter: {
            multiple: 1,
            compare: (a, b) => a.summary.length - b.summary.length,
        }
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
        sorter: {
            multiple: 1,
            compare: (a, b) => a.summary.length - b.summary.length,
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
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        sorter: {
            multiple: 3
        }
    },
    {
        title: 'Submit Date',
        dataIndex: 'dateSubmit',
        key: 'dateSubmit'
    },
    {
        title: 'Required Date',
        dataIndex: 'dateRequired',
        key: 'dateRequired'
    }
];

const result = await adapter.remedy.search(form, query, fields);

const datasource = result.data.map(item => {
    return {
        key: item['Request Number'],
        summary: item['Summary'],
        notes: item['Notes'],
        status: item['Status'],
        requestNumber: item['Request Number'],
        customer: item['Customer First Name'] + ' ' + item['Customer Last Name'],
	    dateSubmit: item['Submit Date'],
	    dateRequired: item['Required Date']
    }
});

resolve({datasource, columns});