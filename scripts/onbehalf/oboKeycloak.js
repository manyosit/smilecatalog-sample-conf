const tokenUrl = 'https://sso.manyos.it/auth/realms/customerPortal/protocol/openid-connect/token';
const userUrl = 'https://sso.manyos.it/auth/admin/realms/customerPortal/users'

const details = {
    'username': 'portal',
    'password': env.OBO_KEYCLOAK_PW,
    'grant_type': 'password',
    'client_id': 'admin-cli'
};

let formBody = [];
for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = details[property];
    formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const responseToken = await fetch(tokenUrl, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
});

const reponseTokenJson = await responseToken.json()
const token = reponseTokenJson.access_token

const responseUser = await fetch(userUrl, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
        'Authorization': 'Bearer ' + token,
    }
});

let userList = await responseUser.json()
userList = userList.filter(user=> {
    log.debug(user.attributes)
    if (user.attributes && user.attributes.company && Array.isArray(user.attributes.company) &&  user.attributes.company.includes('VKBit')) {
        return user
    }
})

if (params.checkOnBehalfOf === true) {
    resolve(userList.filter(userItem => userItem.username===customer.userName))
} else {
    const returnValue = userList.map(user => {
        return {
            "value": user.username,
            "label": user.firstName + ' ' + user.lastName,
        }
    })
    resolve(returnValue);
}
