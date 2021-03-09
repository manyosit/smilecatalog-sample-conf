try {
    const result = await adapter.remedy.search(params.form, params.query, params.valueField + ',' + params.labelField);
    const data = result.data.map(item => {
        return {
            "value":item[params.valueField],
            "label":item[params.labelField],
        }
    });
    resolve(data);
} catch (error) {
    reject(error);
}