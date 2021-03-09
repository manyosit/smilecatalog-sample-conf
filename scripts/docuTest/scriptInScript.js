//prepare params
const params = {
    "query": "'Remedy Login ID'=\"astern\"",
    "form": "CTM:People",
    "labelField": "Full Name",
    "valueField": "Remedy Login ID"
};
//execute script
const personResult = await script('remedy/ars101', {}, params, "global");
//return parameter
resolve(personResult);