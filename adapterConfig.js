const adapterParams = {
    remedy: {
        type: "remedy",
        arServer: env.AR_SERVER,
        arUser: env.AR_USER,
        arPassword: env.AR_PASSWORD,
        arPort: env.AR_PORT,
        rapiUri: env.RAPI_URL,
        cacheTime: env.AR_CACHE_TTL,
        limitDefault: env.LIMIT_DEFAULT || 100,
        limitMax: env.LIMIT_MAX
    },
    ldap: {
        type: "ldap",
        ldapUrl: env.LDAP_URL,
        ldapBind: env.LDAP_BIND,
        ldapSecret: env.LDAP_SECRET
    },
    github:{
        type: "github",
        repositoryUrl: env.GITHUB_REPOSITORY_URL,
        tokenUrl: env.GITHUB_TOKEN_URL
    }
};

// noinspection JSAnnotator
return adapterParams;