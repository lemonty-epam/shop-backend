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

export const productNew = async (event, context, callback) => {
  console.log('Lambda productNew invocation with event: ', event);
  const client = new Client(dbOptions);
  await client.connect();
  var data = JSON.parse(event.body)

  const sqlQueryProduct = 'INSERT INTO products (title, description, price) VALUES($1, $2, $3) RETURNING *';
  const values = [data.title, data.description, data.price];
  //const sqlQueryStock = 'INSERT INTO stocks (product_id, count)  VALUES($1, $2) RETURNING *';

  try {
    const result = await client.query(sqlQueryProduct, values);
    callback(null, {"statusCode": 200, "body": JSON.stringify(result.rows[0])});
  } catch (err) {
      var message = {"message": err.stack};
      callback(null, {"statusCode": 500, "body": message});
  } finally {
    client.end();
  }

};

