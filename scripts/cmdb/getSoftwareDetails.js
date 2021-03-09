const queryParams = {
    query: `'Instance Id'=\"${params.currentValue.value}\"`,
    form: "AST:Document",
    fields: "Name, DocumentType, Short Description"
};

const softwareResult = await script('remedy/ars212', {}, queryParams, "global");

const result = {
    name: softwareResult[0].Name,
    description: softwareResult[0]['Short Description']
}

if (softwareResult[0]['DocumentType'] === "Client") {
    result.accountComputerSelectiion=[ {
        value: "123",
        label: "Computer123"        
    },
    {
        value: "910",
        label: "Computer910"        
    }
    ]
} else if (softwareResult[0]['DocumentType'] === "Account") {
    result.accountComputerSelectiion=[ {
        value: "rhannemann",
        label: "rhannemann"        
    },
    {
        value: "rhannemann_dev",
        label: "rhannemann_dev"        
    }
    ]
}

resolve(result);