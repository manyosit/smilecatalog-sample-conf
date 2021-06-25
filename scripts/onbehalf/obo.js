const query = "'Profile Status'=\"Enabled\" AND 'Remedy Login ID' != $NULL$";
if (params.checkOnBehalfOf === true) {
    const queryOboAllowed = `${query} AND 'Remedy Login ID' = "${customer['Remedy Login ID']}"`;
    const queryOboParams = {
        query: queryOboAllowed,
        form: "CTM:People",
        labelField: "Full Name",
        valueField: "Remedy Login ID",
        sortOnLabel: params.sortOnLabel,
        currentValue: params.currentValue
    };
    const oboAllowedResult = await script('remedy/ars101', {}, queryOboParams, "global");
    const oboAllowed = oboAllowedResult.find(element => element.value === customer['Remedy Login ID']) !== undefined
    resolve(oboAllowed);
} else {
    const queryWithValue = query + " AND ('Full Name' LIKE \"%${params.currentValue.value}%\" OR 'Remedy Login ID' LIKE \"%${params.currentValue.value}%\")";
    const queryParams = {
        query: query,
        queryWithValue,
        form: "CTM:People",
        labelField: "Full Name",
        valueField: "Remedy Login ID",
        sortOnLabel: params.sortOnLabel,
        currentValue: params.currentValue
    };
    const userList = await script('remedy/ars101', {}, queryParams, "global");
    resolve(userList);
}