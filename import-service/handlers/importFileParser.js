const csv = require('csv-parser')

const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});
const BUCKET = 'nodejs-products-bucket';
const sqs = new AWS.SQS();

export const importFileParser = (event) => {
    console.log('Lambda importFileParser invocation with event: ', event);
    event.Records.forEach(record => {
        console.log("in records parsing file with key=" + record.s3.object.key);
        var objKey = record.s3.object.key;
        const s3Stream = s3.getObject({
            Bucket: BUCKET,
            Key: objKey
        }).createReadStream();

        s3Stream
            .pipe(csv())
            .on('data', (data) => {
                sqs.sendMessage({
                    QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/414456242917/catalogItemsQueue',
                    MessageBody: JSON.stringify(data)
                }, () => {
                    console.log('sending to queue' + JSON.stringify(data));
                });
            })
            .on('end', async() => {
                console.log("Copy from " + BUCKET + "/" + objKey);
                await s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: BUCKET + "/" + objKey,
                    Key: objKey.replace('uploaded', 'parsed')
                }).promise();
                console.log("Coping finished");
            });
    });
}