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
    let fields = params.fields;
    if (fields && Array.isArray(fields)) {
        fields = fields.toString();
    }
    let data = []
    if (params.getAllRecords) {
        const chunkSize = 1000;
        const countResult = await adapter.remedy.search(params.form, query, fields, {countOnly:true});
        let counter = 0;
        while (counter < countResult.dataSize / chunkSize) {

            arOptions.offset = counter * chunkSize;
            arOptions.limit = chunkSize;
            const result = await adapter.remedy.search(params.form, query, fields, arOptions);
            data = [...data, ...result.data]
            counter++
        }
    } else {
        const result = await adapter.remedy.search(params.form, query, fields, arOptions);
        data.push(result.data);
    }

    log.error(data.length)

    if (params.sortOnLabel == true) {
        data.sort(function(a, b) {
            const labelA = a.label.toUpperCase(); // Groß-/Kleinschreibung ignorieren
            const labelB = b.label.toUpperCase(); // Groß-/Kleinschreibung ignorieren
            if (labelA < labelB) {
                return -1;
            }
            if (labelA > labelB) {
                return 1;
            }
            // Namen müssen gleich sein
            return 0;
        });

    }
    resolve(data);
} catch (error) {
    reject(error);
}