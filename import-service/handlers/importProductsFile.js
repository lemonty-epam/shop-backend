
export const importProductsFile = async (event, context, callback) => {
  console.log('Lambda products invocation with event: ', event);
  var fileName = event.queryStringParameters.name;
  console.log('fileName: ', fileName);
  callback(null, {"statusCode": 200, "body": JSON.stringify("hello")});
  //   try {
  //     const {rows: allProducts} = await client.query(query);
  //     callback(null, {"statusCode": 200, "body": JSON.stringify(allProducts)});
  // } catch (err) {
  //     callback(null, {"statusCode": 500, "body": err.stack});
  // } finally {
  //     client.end();
  // }

};