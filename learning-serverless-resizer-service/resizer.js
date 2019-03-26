'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const Jimp = require('jimp'); //https://github.com/oliver-moran/jimp

module.exports = (bucket, key) => {
  const newKey = replacePrefix(key);
  const height = 512;

  // return getS3Object(bucket, key).then(data => resizer(JSON.stringify(data.Body), height)).then(buffer => {
	// 	console.log(buffer);
	// 	putS3Object(bucket, newKey, buffer);
	// });
  return getS3Object(bucket, key).then(data => {
		console.log(data.Body);
		return resizer(new Buffer(data.Body), height);
	}).then(buffer => {
		console.log(buffer.bitmap.data);
		return putS3Object(bucket, newKey, new Buffer(buffer.bitmap.data));
	});
};

function getS3Object(bucket, key) {
	console.log("getS3Object");
  return S3.getObject({
    Bucket: bucket,
    Key: key
  }).promise();
}

function putS3Object(bucket, key, body) {
	console.log("putS3Object");
	console.log(body);
  return S3.putObject({
    Body: body,
    Bucket: bucket,
    ContentType: 'image/jpg',
    Key: key
  }).promise();
}

function replacePrefix(key) {
  const uploadPrefix = 'uploads/';
  const thumbnailsPrefix = 'thumbnails/';
  return key.replace(uploadPrefix, thumbnailsPrefix);
}

function resizer(data, height) {
	console.log("resizer");
  return Jimp.read(data)
    .then(image => {
      return image
        .resize(Jimp.AUTO, height)
        .quality(100) // set JPEG quality
        .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          return JSON.parse(JSON.stringify(buffer));
        });
    })
    .catch(err => err);
}
