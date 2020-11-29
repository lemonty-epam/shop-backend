const {Client} = require('pg');

const dbOptions = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

export const productById = async (event, context, callback) => {
  console.log('Lambda productById invocation with event: ', event);
  var productId = event.pathParameters.productId;
  console.log('productId=', productId);
  const client = new Client(dbOptions);
  await client.connect();

  const query = 'select p.id, p.title , p.description, p.price, coalesce(s.count, 0) count from products p' +
      ' left join stocks s on p.id = s.product_id  where p.id = $1';

    try {
    const result = await client.query(query, [productId]);

    if (result.rows[0]) {
      callback(null, {"statusCode": 200, "body": JSON.stringify(result.rows[0])});
    } else {
      var message = {"message": `Product with id '${productId}' is not found`};
      callback(null, {"statusCode": 400, "body": JSON.stringify(message)});
    }
  } catch (err) {
    var message = {"message": err.stack};
    callback(null, {"statusCode": 500, "body": message});
  } finally {
    client.end();
  }

};

