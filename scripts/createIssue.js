try {
    const description = requestData.requestDefinition.instances.root.instances[0].description.value;
    const product = requestData.requestDefinition.instances.root.instances[0].product.value.value;

    const result = await adapter.github.createIssue(params.title, description, product, 'VKB');
  
    resolve(result.number);
} catch (error) {
    reject(error);
}
