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

export const products = async (event, context, callback) => {
  console.log('Lambda products invocation with event: ', event);
  const client = new Client(dbOptions);
  await client.connect();

  const query = 'select p.id, p.title , p.description, p.price, coalesce(s.count, 0) count from products p' +
      ' left join stocks s on p.id = s.product_id';
  try {
      const {rows: allProducts} = await client.query(query);
      callback(null, {"statusCode": 200, "body": JSON.stringify(allProducts)});
  } catch (err) {
      callback(null, {"statusCode": 500, "body": err.stack});
  } finally {
      client.end();
  }

};