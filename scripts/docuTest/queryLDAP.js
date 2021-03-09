const base = "dc=example,dc=com";
const options = {
    attributes: ['dn', 'sn', 'cn']
}
const result = await adapter.ldap.search(base, options);
resolve(result);