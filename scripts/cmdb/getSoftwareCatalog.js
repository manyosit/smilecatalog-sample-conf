const queryParams = {
    query: "'AssetLifecycleStatus'=\"Deployed\"",
    form: "AST:Document",
    labelField: "Name",
    valueField: "Instance Id",
    sortOnLabel: params.sortOnLabel
};
const run = await script('remedy/ars101', {}, queryParams, "global");
resolve(run);