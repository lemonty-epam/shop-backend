const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});
const BUCKET = 'nodejs-products-bucket';

export const importProductsFile = async (event, context, callback) => {
  console.log('Lambda products invocation with event: ', event);
  var fileName = event.queryStringParameters.name;
  console.log('fileName: ', fileName);
  var key = 'uploaded/'+ fileName;
  console.log('key: ', key);
  const params = {
    Bucket: BUCKET,
    Key: key,
    Expires: 60,
    ContentType: 'text/csv'
  };

  /*return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (error, url) => {
      if (error) {
        return reject(err);
      }
      resolve ({
        status: 200,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: url
      });
    })
  });*/
  var signedUrl = s3.getSignedUrl('putObject', params);
  callback(null, {
    "statusCode": 200,
    "headers": {"Access-Control-Allow-Origin": "*"},
    "body": signedUrl});

};