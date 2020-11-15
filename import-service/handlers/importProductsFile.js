const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});
const BUCKET = 'uploaded1';


export const importProductsFile = async (event, context, callback) => {
  console.log('Lambda products invocation with event: ', event);
  var fileName = event.queryStringParameters.name;
  console.log('fileName: ', fileName);
  var key = BUCKET +'/'+ fileName;
  console.log('key: ', key);
  const params = {
    Bucket: BUCKET,
    Key: key,
    Expires: 60,
    ContentType: 'text/csv'
  };

  var signedUrl = s3.getSignedUrl('putObject', params);
  callback(null, {"statusCode": 200, "body": signedUrl});

  //   try {
  //     const {rows: allProducts} = await client.query(query);
  //     callback(null, {"statusCode": 200, "body": JSON.stringify(allProducts)});
  // } catch (err) {
  //     callback(null, {"statusCode": 500, "body": err.stack});
  // } finally {
  //     client.end();
  // }

};