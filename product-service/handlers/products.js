const {Client} = require('pg');

const dbOptions  = {
  host: 'lesson4.czoz6duffqoz.eu-central-1.rds.amazonaws.com',
  port: 5432,
  database: 'lesson4',
  user: 'postgres',
  password: '',
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

export const products = async (event, context, callback) => {
  console.log('Lambda products invocation with event: ', event);
  const client = new Client(dbOptions);
  await client.connect();

  try {
      const {rows: allProducts} = await client.query('' +
          'select p.id, p.title , p.description, p.price, s.count\n' +
          'from products p, stocks s\n' +
          'where p.id = s.product_id');
      callback(null, {"statusCode": 200, "body": JSON.stringify(allProducts)});
  } catch (err) {
      callback(null, {"statusCode": 500, "body": err.stack});
  } finally {
      client.end();
  }

};