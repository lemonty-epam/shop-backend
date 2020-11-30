export const basicAuthorizer = (event, context, callback) => {
    console.log('Lambda basicAuthorizer invocation with event: ', event);
    if (event['type' != 'TOKEN']) {
        callback('Unauthorized');
    }
    try {
        const token = event.authorizationToken;
        const encodedCreds = token.split(' ')[1];
        const buff = Buffer.from(encodedCreds, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const username = plainCreds[0];
        const password = plainCreds[1];

        console.log(`username is ${username} and password is ${password}`);
        const storedUserPassword = process.env[username];
        console.log(`storedUserPassword = ${storedUserPassword}`);
        const effect = !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow';
        const policy = generatePolicy(encodedCreds, event.methodArn, effect);
        
        callback(null, policy);

    } catch (e) {
        callback(`Unauthorized: ${e.message}`);
    }

};

const  generatePolicy = (principalId, resource, effect = 'Allow') => {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement:[
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    };
}