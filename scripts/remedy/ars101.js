try {
    let query = '';
    if (params.queryWithValue && params.currentValue) {
        query = eval("`" + params.queryWithValue + "`");
    } else {
        query = eval("`" + params.query + "`");
    }
    const arOptions = {
        limit: 25
    }
    let fields = params.labelField;
    if (fields && Array.isArray(fields)) {
        fields = fields.toString();
    }
    const result = await adapter.remedy.search(params.form, query, params.valueField + ',' + params.labelField, arOptions);
    const data = result.data.map(item => {
        if (params.labelField && Array.isArray(params.labelField) && params.labelField.length > 1) {
            let label = item[params.labelField[0]];
            for (let x = 1; x < params.labelField.length; x++) {
                label += ' - ' + item[params.labelField[x]];
            }

            return {
                "value": item[params.valueField],
                "label": label
            }
        } else {
            return {
                "value": item[params.valueField],
                "label": item[params.labelField],
            }
        }
    });
    if (params.sortOnLabel === true) {
        data.sort((a, b) => {
            const valueA = a.label.toUpperCase();
            const valueB = b.label.toUpperCase();
            if (valueA < valueB) {
                return -1;
            }
            if (valueA > valueB) {
                return 1;
            }
            return 0;
        });
    }
    resolve(data);
} catch (error) {
    reject(error);
}
