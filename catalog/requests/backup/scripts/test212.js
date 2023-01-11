const qParams = {
    query: '1=1',
    form: "AST:BaseElement",
    fields: "Name",
    getAllRecords: true
}
const value = await script('remedy/ars212',{}, qParams, 'global')
resolve(value)