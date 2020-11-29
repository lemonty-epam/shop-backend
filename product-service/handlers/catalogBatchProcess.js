const AWS = require('aws-sdk');
const sns = new AWS.SNS({region: 'eu-central-1'});

export const catalogBatchProcess = async (event) => {
  console.log('!!!!Lambda catalogBatchProcess invocation with event: ', event);
  const products = event.Records.map(({ body })=> body);
  console.log(products);

  sns.publish({
      Subject: 'New products were added',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN
  }, () => {
      console.log('Email with products update was send');
  })


}