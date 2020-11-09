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

export const productNew = async (event, context, callback) => {
  console.log('Lambda productNew invocation with event: ', event);
  const client = new Client(dbOptions);
  await client.connect();
  var data = JSON.parse(event.body)

  const sqlQuery = 'INSERT INTO products (title, description, price)  VALUES($1, $2, $3) RETURNING *';
  const values = [data.title, data.description, data.price];


  try {
    client.query(sqlQuery, values, (err, res) => {
      if (err) {
        var message = {"message": err.stack};
        callback(null, {"statusCode": 400, "body": message});
      } else {
        console.log(res.rows[0]);
        callback(null, {"statusCode": 200, "body": JSON.stringify(result.rows[0])});
      }
    });
  } catch (err) {
      var message = {"message": err.stack};
      callback(null, {"statusCode": 500, "body": message});
  } finally {
    client.end();
  }




};

