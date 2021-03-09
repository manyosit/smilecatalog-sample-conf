const profileFields = "Remedy Login ID, Person ID, Full Name, First Name, Last Name, Department, Organization";
try {
    const result = await adapter.remedy.search('CTM:People', `'Remedy Login ID' = "${params.userId}"`, profileFields);
    if (result.data && result.data[0]) {
        resolve(result.data[0]);
    } else {
        const error = new Error(`Person ${params.userId} not found`);
        error.statusCode = 400;
        reject(error);
    }
} catch (error) {
    reject(error);
}