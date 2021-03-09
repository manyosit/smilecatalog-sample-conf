const result = await adapter.ldap.search(params.base, params.options);

resolve(result);