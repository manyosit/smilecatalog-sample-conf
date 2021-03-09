const form = "SRM:WorkInfo"
const query = `'Request Number' = "${params.currentValue.value}"`;
const fields = "Summary, Request Number, Notes, WorkInfoSubmitter, WorkInfoSubmitDate"

// PersonRole, PeopleGroup Form Entry ID

const columns = [
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
            multiple: 2
        },
    },
    {
        title: 'Submitter',
        dataIndex: 'submitter',
        key: 'submitter'
    },
    {
        title: 'Submit Date',
        dataIndex: 'submitDate',
        key: 'submitDate'
    }
    
];

const result = await adapter.remedy.search(form, query, fields);
result.data = result.data.sort(function(a,b){
  return new Date(b['WorkInfoSubmitDate']) - new Date(a['WorkInfoSubmitDate']);
});

const datasource = result.data.map(item => {
    return {
        key: item['Request Number'],
        summary: item['Summary'],
        notes: item['Notes'],
        submitDate: item['WorkInfoSubmitDate'],
        submitter: item['WorkInfoSubmitter'],
    }
});

resolve({datasource, columns});