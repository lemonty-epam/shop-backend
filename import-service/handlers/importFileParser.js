const csv = require('csv-parser')

const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});
const BUCKET = 'nodejs-products-bucket';

export const importFileParser = async (event) => {
    console.log('Lambda importFileParser invocation with event: ', event);
    event.Records.forEach(record => {
        console.log("in records parsing file with key=" + record.s3.object.key);
        const s3Stream = s3.getObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
        }).createReadStream();

        console.log("after stream creation");

        s3Stream
            .pipe(csv(['Name', 'Age']))
            .on('data', (data) => {
                console.log(data);
            })
            .on('end', async() => {
                console.log("end!!!!");
            });
    });
}